import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class FoodsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){

    }

    prisma = new PrismaClient();

    async getFoods(){
        let cachedData = await this.cacheManager.get("list-foods");
        
        if(cachedData){
            return cachedData;
        }

        let data = await this.prisma.food.findMany();
        this.cacheManager.set("list-foods", data);
        return data;
    }
}
