import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { use } from 'passport';

@Injectable()
export class CustomerService {
  constructor(private jwtService: JwtService){}
  prisma = new PrismaClient();

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, age, address, password} = createCustomerDto;
    let checkEmail = await this.prisma.customer.findFirst({
      where: {
        email
      }
    });

    if(checkEmail){
      throw new HttpException('User With email already exist!', HttpStatus.BAD_REQUEST);
    }

    let hashedPassword = await bcrypt.hash(password, 5);
    return await this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        age,
        address
      }
    });
  }

  async login(email: string, input_password: string){
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

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
