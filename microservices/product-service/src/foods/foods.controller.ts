import { Controller } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { EventPattern, Payload } from '@nestjs/microservices';

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

  @EventPattern("GET_FOOD_PAGING")
  async getFoodsPaging(@Payload() data){
    const {perPage, page} = data;

    return await this.foodsService.getFoodPaging(+perPage, +page);
  }

  @EventPattern("FOOD_CATEGORY")
  async getFoodCategory(){
    return await this.foodsService.getFoodCategories();
  }
}
