import { Controller } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { da } from '@faker-js/faker/.';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @EventPattern("GET_FOOD")
  async getFood(){
    return await this.foodsService.getFoods();
  }

  @EventPattern("SEARCH_FOOD")
  async searchFood(@Payload() data){
    return await this.foodsService.searchFoods(data)
  }
}
