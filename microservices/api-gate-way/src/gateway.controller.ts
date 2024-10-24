import { Body, Controller, Get, Post, Query, UseGuards, Headers} from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { lastValueFrom } from "rxjs";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller('api')
export class GatewayController {
    constructor(
        private jwtService: JwtService,
        @Inject("PRODUCTS") private readonly productService: ClientProxy,
        @Inject("USERS") private readonly userService: ClientProxy,
        @Inject("ORDERS") private readonly orderService: ClientProxy,
    ) {}

    async onModuleInit(){
        await this.productService.connect();
        await this.userService.connect();
        await this.orderService.connect();
    }

    @Get('list-foods')
    async getFoods() {
        return await lastValueFrom(this.productService.send("GET_FOOD", {}));
    }

    @Get('search-foods')
    async searchFoods(@Query('description') description: string){
        let payload = {
            description
        };

        const response = await lastValueFrom(this.productService.send("SEARCH_FOOD", payload));
        const hits = response.hits.hits;
        if(hits.length <= 0){
            return [];
        }

        let results = [];
        for(let hit of hits){
            results.push(hit._source);
        }
        return results;
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

    @UseGuards(JwtAuthGuard)
    @Post('create-order')
    async createOrder(
        @Headers() headers: any,
        @Body('listFoods') listFoods: Array<any>,
        @Body('storeId') storeId: number
    ){
        const token = headers.authorization;
        let data = await lastValueFrom(this.orderService.send("CREATE_ORDER", {
            authorization: token,
            data: {
                listFoods,
                storeId
            }
        }));
        return data;
    }
}