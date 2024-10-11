import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern("CREATE_USER")
  async createUser(
    @Payload() data
  ){
    return await this.userService.create(data)
  }

  @EventPattern("LOGIN_USER")
  async loginUser(
    @Payload() data
  ){
    return await this.userService.login(data);
  }
}
