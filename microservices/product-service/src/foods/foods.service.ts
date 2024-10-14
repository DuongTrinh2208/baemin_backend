import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FoodsService {
    constructor(){}

    prisma = new PrismaClient();

    async getFoods(){
        return this.prisma.food.findMany();
    }
}
