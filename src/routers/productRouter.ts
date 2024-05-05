import express ,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel';

export const productRouter = express.Router();

//      /api/products
productRouter.get(
    '/',
    asyncHandler(async (req,res) => {
        const products = await ProductModel.find()
        res.json(products)
    })
)

productRouter.post(
    '/',
    asyncHandler(async (req:Request,res:Response) => {
        const productData = await ProductModel.create({
            name:req.body.name,
            slug:req.body.slug,
            image:req.body.image,
            //brand:req.body.brand,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews
        })
        res.json({
            name:productData.name,
            slug:productData.slug,
            image:productData.image,
            //brand:productData.brand,
            category:productData.category,
            price:productData.price,
            description:productData.description,
            countInStock:productData.countInStock,
            rating:productData.rating,
            numReviews:productData.numReviews
        })
    })
)

//   update

productRouter.put(
    '/:id',
    asyncHandler(async (req:Request,res:Response) => {
        const productData = await ProductModel.findById(req.params.id)
        if(productData){
            productData.name=req.body.name
            productData.slug=req.body.slug
            productData.image=req.body.image
            productData.price=req.body.price
            productData.description=req.body.description
            productData.countInStock=req.body.countInStock
            productData.rating=req.body.rating
            productData.numReviews=req.body.numReviews
            productData.category=req.body.category
            
            const updateProductData = await productData.save()
            res.send({message:"Product updated succesfully", productData:updateProductData});
        } else {
            res.status(404).send({ message : "Product not found"})
            }
        
    })
)

//  /api/categories
// productRouter.get(
//     '/categories',
//     asyncHandler(async (req: Request, res: Response) => {
//       const categories = await ProductModel.find().distinct('category')
//       res.json(categories)
//     })
//   )

//      /api/slug/frog
productRouter.get(
    '/slug/:id',
    asyncHandler(async (req,res) => {
        console.log('====================================');
        console.log(req.params.id,"coming inside");
        console.log('====================================');
        const category =  await ProductModel.find({ slug:req.params.id})
        if(category){
            res.json(category[0])
        } else {
            res.status(404).json({message : 'category not found..'})
        }
    })
)


//delete

productRouter.delete(
    '/:id',
    asyncHandler(async (req,res) => {
        const product = await ProductModel.deleteOne({_id:req.params.id})
        if(product){
            res.json(product)
        } else {
            res.status(404).json({message : 'product not found..'})
        }
    })
)

//category filter value
productRouter.post(
    '/product-listby-category',
    asyncHandler(async (req,res) => {
        const {category} = req.body;
        const categoryList = await ProductModel.find({ category:category})
        if(categoryList){
            res.status(200).json(categoryList)
        } else {
            res.status(404).json({message : 'category not found..'})
        }
    })
)
//category filter value
productRouter.post(
    '/slug',
    asyncHandler(async (req,res) => {
        const {slug} = req.body;
        const productList = await ProductModel.find({ slug:slug}).select('name slug price image description countInStock rating numReviews _id');
        if(productList){
            res.status(200).json(productList)
        } else {
            res.status(404).json({message : 'Product not found..'})
        }
    })
)
