import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PaymentService {
    constructor(private jwtService: JwtService) { }
    prisma = new PrismaClient();

    async decodeToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async paymentOrder(customerId: number, orderId: number) {
        const order = await this.prisma.order.findFirst({
            where: {
                id: orderId
            }
        });

        if (!order) {
            throw new HttpException("Cant found Order", HttpStatus.NOT_FOUND);
        }

        if (order.status != "Ordering") {
            throw new HttpException("Invalid Order", HttpStatus.FORBIDDEN);
        }

        if (order.customer_id != customerId) {
            throw new HttpException("Invalid Customer", HttpStatus.FORBIDDEN);
        }

        return this.prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: "Paid"
            }
        });
    }
}
