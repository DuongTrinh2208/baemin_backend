import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create-order')
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Req() req: Request,
    @Body("listFoods") listFoods: Array<any>,
    @Body("storeId") storeId: number
  ){
    return this.orderService.createOrder(req, listFoods, +storeId);
  }

  @Post('/pay-order')
  @UseGuards(JwtAuthGuard)
  payOrder(
    @Req() req: Request,
    @Body("orderId") orderId: number
  ){
    return this.orderService.payOrder(req, +orderId);
  }

  @Get('/get-order')
  @UseGuards(JwtAuthGuard)
  getOrder(
    @Req() req: Request,
    @Query('orderId') orderId: number
  ){
    return this.orderService.getOrder(+orderId);
  }
}
