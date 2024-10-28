import { Body, Controller, Get, Post, Query, UseGuards, Headers } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { last, lastValueFrom } from "rxjs";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller('api')
export class GatewayController {
    constructor(
        private jwtService: JwtService,
        @Inject("PRODUCTS") private readonly productService: ClientProxy,
        @Inject("USERS") private readonly userService: ClientProxy,
        @Inject("ORDERS") private readonly orderService: ClientProxy,
        @Inject("PAYMENTS") private readonly paymentService: ClientProxy,
    ) { }

    async onModuleInit() {
        await this.productService.connect();
        await this.userService.connect();
        await this.orderService.connect();
    }

    @Get('list-foods')
    async getFoods() {
        return await lastValueFrom(this.productService.send("GET_FOOD", {}));
    }

    @Get('get-food-paging')
    async getFoodsPaging(
        @Query("page") page: number,
        @Query("perPage") perPage: number
    ) {
        return await lastValueFrom(this.productService.send("GET_FOOD_PAGING", {
            perPage,
            page
        }))
    }

    @Get('search-foods')
    async searchFoods(@Query('description') description: string) {
        let payload = {
            description
        };

        const response = await lastValueFrom(this.productService.send("SEARCH_FOOD", payload));
        const hits = response.hits.hits;
        if (hits.length <= 0) {
            return [];
        }

        let results = [];
        for (let hit of hits) {
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
    ) {
        let payload = {
            email,
            age,
            address,
            password
        };

        let data = await lastValueFrom(this.userService.send("CREATE_USER", payload));
        return data;
    }

    @Get('food-categories')
    async getFoodCategories(){
        let data = await lastValueFrom(this.productService.send("FOOD_CATEGORY", {}));
        return data;
    }

    @Post('user-login')
    async userLogin(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
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
    ) {
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

    @Post('order-payment')
    @UseGuards(JwtAuthGuard)
    async orderPayment(
        @Headers() headers: any,
        @Body('orderId') orderId: number
    ) {
        const token = headers.authorization;
        let data = await lastValueFrom(this.paymentService.send("ORDER_PAYMENT", {
            authorization: token,
            data: {
                orderId
            }
        }));
        return data;
    }

    @Post('find-driver')
    @UseGuards(JwtAuthGuard)
    async findDriver(
        @Headers() headers: any,
        @Body('orderId') orderId: number
    ) {
        const token = headers.authorization;
        let data = await lastValueFrom(this.orderService.send("FIND_DRIVER", {
            authorization: token,
            data: {
                orderId
            }
        }));

        return data;
    }
}