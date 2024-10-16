import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FoodsModule } from './foods/foods.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule, FoodsModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
