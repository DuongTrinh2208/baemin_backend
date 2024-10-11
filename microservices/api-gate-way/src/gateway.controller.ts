import { Body, Controller, Get, Post } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { lastValueFrom } from "rxjs";

@Controller('api')
export class GatewayController {
    constructor(
        private jwtService: JwtService,
        @Inject("FOODS") private readonly foodService: ClientProxy,
        @Inject("USERS") private readonly userService: ClientProxy,
    ) {}

    async onModuleInit(){
        await this.foodService.connect();
        await this.userService.connect();
    }

    @Get('foods')
    async getFoods() {
        return this.foodService.send("list", {});
    }

    @Post('create-user')
    async createUser(
        @Body('email') email: string,
        @Body('age') age: number,
        @Body('address') address: string,
        @Body('password') password: string,
    ){
        let payload = {
            email,
            age,
            address,
            password
        };

        let data = await lastValueFrom(this.userService.send("CREATE_USER", payload));
        return data;
    }

    @Post('user-login')
    async userLogin(
        @Body('email') email: string,
        @Body('password') password: string,
    ){
        let payload = {
            email,
            password
        };

        let data = await lastValueFrom(this.userService.send("LOGIN_USER", payload));
        return data;
    }
}