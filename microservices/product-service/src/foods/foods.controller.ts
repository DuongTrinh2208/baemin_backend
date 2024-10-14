import { Controller } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @EventPattern("GET_FOOD")
  async getFood(){
    return await this.foodsService.getFoods();
  }
}
