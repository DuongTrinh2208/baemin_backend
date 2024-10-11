import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([{
      name: "FOODS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'foods_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),

    ClientsModule.register([{
      name: "USERS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
    
    JwtModule.register({
      global: true
    })
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
