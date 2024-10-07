import { Controller, Get } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Controller('api')
export class GatewayController {
    constructor(
        private jwtService: JwtService,
        @Inject("FOODS") private readonly foodService: ClientProxy
    ) {}

    async onModuleInit(){
        await this.foodService.connect();
    }

    @Get('foods')
    async getFoods() {
        return this.foodService.send("list", {});
    }
}