import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { count } from 'console';
import { Request } from 'express';
import { NotFoundError } from 'rxjs';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class OrderService {
  prisma = new PrismaClient()

  async createOrder(req : Request, listFoods: Array<any>, storeId: number){
    const tokenData = req.user as JwtPayload;

    const checkStore = await this.checkStore(storeId);

    if(!checkStore){
      throw new HttpException("Cant found Store", HttpStatus.NOT_FOUND);
    }

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
      const orderFood = await this.prisma.orderFoods.create({
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

  async payOrder(req: Request, orderId: number){
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId
      }
    });

    if(!order){
      throw new HttpException("Cant found Order", HttpStatus.NOT_FOUND);
    }

    if(order.status != "Ordering"){
      throw new HttpException("Invalid Order", HttpStatus.FORBIDDEN);
    }

    const tokenData = req.user as JwtPayload;
    let customerId = tokenData.id;

    if(order.customer_id != customerId){
      throw new HttpException("Invalid Customer", HttpStatus.FORBIDDEN);
    }

    const driver = await this.getDriver();

    return this.prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        status: "Delivering",
        driver_id: driver.id,
        deliverydate: new Date()
      }
    });
  }

  async getDriver(){
    const driverCount = await this.prisma.driver.count();

    const randomOffset = Math.floor(Math.random() * driverCount);

    const randomDriver = await this.prisma.driver.findMany({
      take: 1,
      skip: randomOffset
    });

    return randomDriver[0];
  }

  async checkStore(storeId: number){
    const store = await this.prisma.store.findFirst({
      where: {
        id: storeId
      }
    });
    console.log(store);
    return store != null;    
  }

  getFormattedTimestamp(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
