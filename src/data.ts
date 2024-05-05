import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import bcrypt from 'bcryptjs'

export const sampleProducts:Product[] = [
   {
    name : 'saree',
    slug : 'saree',
    image : '../images/p1.jpg',
    category : 'Saree',
    brand : 'adidas',
    price : 100,
    countInStock : 0,
    description : 'high quality',
    rating : 2.0,
    numReviews : 10
   },
   {
    name : 'Shirt',
    slug : 'Shirt',
    image : '../images/p2.jpg',
    category : 'Shirt',
    brand : 'Shirt',
    price : 100,
    countInStock : 20,
    description : 'high quality',
    rating : 4.0,
    numReviews : 10
   },
   {
    name : 'Frog',
    slug : 'Frog',
    image : '../images/p3.jpg',
    category : 'Frog',
    brand : 'Frog',
    price : 100,
    countInStock : 20,
    description : 'high quality',
    rating : 5.0,
    numReviews : 10
   },
   {
    name : 'Pant',
    slug : 'Pant',
    image : '../images/p2.jpg',
    category : 'Pant',
    brand : 'v',
    price : 10,
    countInStock : 20,
    description : 'high quality',
    rating : 4.0,
    numReviews : 10
   }
]

export const sampleUsers: User[] = [
   {
     name: 'Joe',
     phone:7708575109,
     email: 'admin@example.com',
     password: bcrypt.hashSync('123456'),
     isAdmin: true,
   },
   
 ]