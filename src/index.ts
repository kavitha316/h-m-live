import cors from 'cors';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import { productRouter } from './routers/productRouter';
import { seedRouter} from './routers/seedRouter'
import morgan from 'morgan';
import { userRouter } from './routers/userRouer';
import { orderRouter } from './routers/orderRouter';
import {keyRouter} from './routers/keyRouter'
import { categoryRouter } from './routers/categoryRouter';
import { bannerRouter } from './routers/bannerRouter';



const app = express()


app.use(morgan('dev'))

dotenv.config();

//mongo db connection
const MONGODB_URI = 
process.env.MONGODB_URI || 'mongodb://localhost/tsamazonauser'
mongoose.set('strictQuery',true)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(() => {
        console.log('error db')
    })

app.use(
    cors({
        credentials:true,
        origin:['http://localhost:5173','http://localhost:3000'],
    })
)

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/products',productRouter);
app.use('/api/seed',seedRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/keys',keyRouter)
app.use('/api/category',categoryRouter)
app.use('/api/banner',bannerRouter)


const PORT = 4000

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})