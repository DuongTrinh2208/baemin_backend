import { Controller, Headers, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @EventPattern("CREATE_ORDER")
  async createOrder(
    @Payload() Payload: any
  ){
    const {listFoods, storeId} = Payload.data;
    const tokenData = await this.orderService.decodeToken(Payload.authorization);
    return await this.orderService.createOrder(tokenData.id, listFoods, storeId);
  }
}
