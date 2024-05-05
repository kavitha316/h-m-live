import express  from 'express';
// import {  OrderPayModel } from '../models/orderPayModel';
import Razorpay from 'razorpay'



export const orderPayRouter = express.Router();

// orderPayRouter.get('/get-razorpay-key', (req, res) => {
//     res.send({ key: process.env.RAZORPAY_KEY_ID });
//   });
  
  orderPayRouter.post('/create-order', async (req, res) => {
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
  
  // orderPayRouter.post('/pay-order', async (req, res) => {
  //   try {
  //     const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
  //       req.body;
  //     const newOrder =await OrderPayModel.create({
  //       isPaid: true,
  //       amount: amount,
  //       razorpay: {
  //         orderId: razorpayOrderId,
  //         paymentId: razorpayPaymentId,
  //         signature: razorpaySignature,
  //       },
  //     });
  //     await newOrder.save();
  //     res.send({
  //       msg: 'Payment was successfull',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error);
  //   }
  // });
  
  // orderPayRouter.get('/list-orders', async (req, res) => {
  //   const orders = await OrderPayModel.find();
  //   res.send(orders);
  // });
  