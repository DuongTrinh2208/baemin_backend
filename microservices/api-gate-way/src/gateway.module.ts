import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { GatewayController } from './gateway.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([{
      name: "PRODUCTS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'product_queue',
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

    ClientsModule.register([{
      name: "ORDERS",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'order_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
    
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key',
      signOptions: { expiresIn: '1h' },
      global: true
    }),

    PassportModule
  ],
  controllers: [GatewayController],
  providers: [JwtStrategy],
})
export class GatewayModule {}
