import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FoodService {
  prisma = new PrismaClient();
  
  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  async findAll() {
    return this.prisma.food.findMany();
  }

  async getFoodPaging(perPage, page){
    let data = await this.prisma.food.findMany({
      take: perPage,
      skip: page * perPage
    });

    return data;
  }

  async getFoodCategory(){
    let data = await this.prisma.category.findMany();
    return data;
  }

  async findFood(name: string) {
    let data = await this.prisma.food.findMany({
      where: {
        description: {
          contains: name,
          mode: 'insensitive'
        }
      },
      include: {
        store: true,
        category: true
      }
    });
    return data;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
