import { modelOptions, prop, getModelForClass,  } from '@typegoose/typegoose'

class RazorpayValue {
    @prop()
    public orderId?: string
    @prop()
    public paymentId?: string
    @prop()
    public signature?: string
  }
  @modelOptions({ schemaOptions: { timestamps: true } })
  export class OrderPay {
    public _id!: string
   
    @prop()
    public razorpay?: RazorpayValue
    @prop()
    public isPaid!: boolean
    @prop()
    public amount?: number
   
  }

  export const OrderPayModel = getModelForClass(OrderPay)