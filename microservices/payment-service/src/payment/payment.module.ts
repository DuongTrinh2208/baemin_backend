import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECERT || 'secret-key',
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService, JwtStrategy],
})
export class PaymentModule {}
