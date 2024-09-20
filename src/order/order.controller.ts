import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
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
}