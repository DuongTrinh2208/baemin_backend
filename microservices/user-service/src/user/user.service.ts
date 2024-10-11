import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private jwtService: JwtService){}
    prisma = new PrismaClient();

    async create(payloadData) {
        console.log(payloadData);
        const {email, age, address, password} = payloadData;
        let checkEmail = await this.prisma.customer.findFirst({
          where: {
            email
          }
        });
    
        if(checkEmail){
          throw new HttpException('User With email already exist!', HttpStatus.BAD_REQUEST);
        }
    
        let hashedPassword = await bcrypt.hash(password, 5);
        let data = await this.prisma.customer.create({
          data: {
            email,
            password: hashedPassword,
            age,
            address
          }
        })
        return data != null;
      }
    
      async login(payloadData){
        const email = payloadData.email;
        const input_password = payloadData.password;
        const customer = await this.prisma.customer.findFirst({
          where: {
            email
          }
        });
    
        const checkPass = await bcrypt.compare(input_password, customer.password);
        if(!checkPass){
          throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }
    
        const {password, ...data} = customer;
        return {
          access_token: this.jwtService.sign(data)
        };
      }
}
