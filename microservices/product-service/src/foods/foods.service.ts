import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class FoodsService implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private elasticService: ElasticsearchService
    ) { }

    async onModuleInit() {
        await this.createFoodsIndex();
        await this.syncFoodsToElasticsearch();
    }

    prisma = new PrismaClient();

    async getFoods() {
        let cachedData = await this.cacheManager.get("list-foods");

        if (cachedData) {
            return cachedData;
        }

        let data = await this.prisma.food.findMany();
        this.cacheManager.set("list-foods", data);
        return data;
    }

    async searchFoods(payloadData) {
        const { description } = payloadData;
        let data = await this.elasticService.search({
            index: 'foods',
            query: {
                match: {
                    "description": description
                }
            }
        });

        return data;
    }

    async syncFoodsToElasticsearch() {
        const foods = await this.prisma.food.findMany(); // Fetch from PostgreSQL
        for (const food of foods) {
            await this.elasticService.index({
                index: 'foods',
                id: food.id.toString(),
                body: {
                    description: food.description,
                    cost: food.cost,
                    storeId: food.storeId,
                    category_id: food.category_id
                }
            });
        }
    }


    async createFoodsIndex() {
        const indexExists = await this.elasticService.indices.exists({
            index: 'foods',
        });

        // Check if index already exists to avoid recreation
        if (indexExists) {
            console.log('Index already exists');
            return;
        }
        await this.elasticService.indices.create({
            index: 'foods',
            body: {
                mappings: {
                    properties: {
                        description: { type: 'text' },
                        cost: { type: 'float' },
                        storeId: { type: 'integer' },
                    },
                },
            },
        });
    }

}
