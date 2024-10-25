import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @EventPattern("ORDER_PAYMENT")
  async orderPayment(@Payload() Payload: any){
    const tokenData = await this.paymentService.decodeToken(Payload.authorization);
    const {orderId} = Payload.data;
    return await this.paymentService.paymentOrder(tokenData.id, +orderId);
  }
}
