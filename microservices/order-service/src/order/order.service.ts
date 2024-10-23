import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private jwtService: JwtService){}
    prisma = new PrismaClient();
}
