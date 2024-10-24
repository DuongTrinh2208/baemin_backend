import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private jwtService: JwtService) { }
    prisma = new PrismaClient();

    async createOrder(customerId: number, listFoods: Array<any>, storeId: number) {
        const checkStore = await this.checkStore(storeId);

        if (!checkStore) {
            throw new HttpException("Cant found Store", HttpStatus.NOT_FOUND);
        }

        const order = await this.prisma.order.create({
            data: {
                store_id: storeId,
                customer_id: customerId,
                total: 0,
                status: "Ordering"
            }
        });

        if (!order) {
            throw new HttpException('Unable to create order', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        let total = 0;
        for (const food of listFoods) {
            const foodInfo = await this.getFoodInfo(food.id);

            if (!foodInfo || foodInfo.storeId != storeId)
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

            if (!orderFood) {
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

    async decodeToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async checkStore(storeId: number) {
        const store = await this.prisma.store.findFirst({
            where: {
                id: storeId
            }
        });

        return store != null;
    }

    async getFoodInfo(foodId: number) {
        const food = await this.prisma.food.findFirst({
            where: {
                id: foodId
            }
        });

        if (!food) {
            return null;
        }

        return food;
    }
}
