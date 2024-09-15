import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get("/list")
  findAll() {
    return this.foodService.findAll();
  }

  @Get('/find')
  findOne(@Query('name') name: string) {
    return this.foodService.findFood(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }

  @Get("/list-paging")
  getFoodPagination(
    @Query("page") page:number,
    @Query("perPage") perPage : number
  ){
    return this.foodService.getFoodPaging(+perPage, +page);
  }

  @Get("/category")
  getFoodCategory(){
    return this.foodService.getFoodCategory();
  }
}
