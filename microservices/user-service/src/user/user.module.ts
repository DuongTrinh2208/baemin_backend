import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECERT || 'secret-key',
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
