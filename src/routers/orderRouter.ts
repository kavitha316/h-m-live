import express, {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { isAuth } from '../utils';
import { OrderModel } from '../models/orderModel';
import { Product } from '../models/productModel';
import Razorpay from 'razorpay'

export const orderRouter = express.Router();

//api/orders/mine
orderRouter.get(
    '/mine',
    isAuth,
    asyncHandler(async (req: Request,res:Response) => {
        const orders = await OrderModel.find({user:req.user._id})
        res.send(orders)
    })
)

orderRouter.post('/create-order', async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID||'',
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send('Some error occured');
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//api/orders/:id
orderRouter.get(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request,res:Response) => {
        const order = await OrderModel.findById(req.params.id)
        if(order){
            res.send(order)
        } else {
            res.status(404).send({message:"Order not found"})
        }
    })
)

orderRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req:Request,res:Response) => {
       if (req.body.orderItems.length === 0){
        res.status(400).send({ message : "Cart is Empty"})
       } else {
            const createdOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x: Product) => ({
                    ...x,
                    product:x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice:req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice:req.body.totalPrice,
                user:req.user._id
            })
            res.status(201).send({ message : "Order not found", order: createdOrder})
       }
    })
)

orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req:Request,res:Response) => {
        const order = await OrderModel.findById(req.params.id).populate('user')

       if (order){
        order.isPaid = true
        order.paidAt = new Date(Date.now())
        order.paymentResult = {
            paymentId:req.body.orderId,
            status:req.body.status,
            update_time:new Date(Date.now()).toDateString(),
            email_address:req.body.email_address
        }

        const updateOrder = await order.save()
        res.send({message:"Order paid succesfully", order:updateOrder});

       } else {
        res.status(404).send({ message : "Order not found"})
        }
    })
)