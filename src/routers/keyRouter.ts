import express from 'express';

export const keyRouter  = express.Router();

//    /api/keys/razorpay
keyRouter.get('/razorpay',(req,res)=> {
    res.json({clientId: process.env.RAZORPAY_KEY_ID || 'sb'})
})