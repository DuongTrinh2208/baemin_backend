import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class OrderService {
  prisma = new PrismaClient()

  async createOrder(req : Request, listFoods: Array<any>, storeId: number){
    const tokenData = req.user as JwtPayload;
    const order = await this.prisma.order.create({
      data: {
        store_id: storeId,
        customer_id: tokenData.id,
        total: 0,
        status: "Ordering"
      }
    });

    if (!order){
      throw new HttpException('Unable to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    let total = 0;
    for (const food of listFoods){
      const foodInfo = await this.getFoodInfo(food.id);

      if(!foodInfo || foodInfo.storeId != storeId)
        continue;

      const totalPrice = food.quantity * foodInfo.cost;
      total += totalPrice;
      const orderFood = this.prisma.orderFoods.create({
        data: {
          orderId: order.id,
          foodId: food.id,
          quantity: food.quantity
        }
      });

      if(!orderFood){
        throw new HttpException('Unable to create orderFood', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    return this.prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        total
      }
    });
  }

  async getFoodInfo(foodId: number){
    const food = await this.prisma.food.findFirst({
      where: {
        id: foodId
      }
    });

    if(!food){
      return null;
    }

    return food;
  }
}
