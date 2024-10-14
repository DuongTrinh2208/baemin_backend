import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FoodsModule } from './foods/foods.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule, FoodsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
