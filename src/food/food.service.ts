import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return this.prisma.food.findMany({
      include: {
        store: true,
        category: true
      }
    });
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

  async getFoodStore(storeId: number){
    const store = await this.prisma.store.findFirst({
      where: {
        id: storeId
      }
    });

    if(!store){
      throw new HttpException("Cant found Store", HttpStatus.NOT_FOUND);
    }

    return store;
  }

  async getFoodsInStore(storeId: number){
    const foods = await this.prisma.food.findMany({
      where: {
        storeId: storeId
      }
    });

    return foods;
  }
}
