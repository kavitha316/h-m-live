import express ,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { CategoryModel } from '../models/categoryModel';

export const categoryRouter = express.Router();

//      /api/category
categoryRouter.get(
    '/',
    asyncHandler(async (req,res) => {
        const categories = await CategoryModel.find()
        res.json(categories)
    })
)



//      /api/slug/frog
categoryRouter.get(
    '/:id',
    asyncHandler(async (req,res) => {
        const category = await CategoryModel.findById(req.params.id)
        if(category){
            res.json(category)
        } else {
            res.status(404).json({message : 'category not found..'})
        }
    })
)

//    api/category

categoryRouter.post(
    '/',
    asyncHandler(async (req:Request,res:Response) => {
        const categoryData = await CategoryModel.create({
            name:req.body.name,
            slug:req.body.slug,
            image:req.body.image
        })
        res.json({
            name:categoryData.name,
            slug:categoryData.slug,
            image:categoryData.image
        })
    })
)
//   update

categoryRouter.put(
    '/:id',
    asyncHandler(async (req:Request,res:Response) => {
        const categoryData = await CategoryModel.findById(req.params.id)
        if(categoryData){
            categoryData.name=req.body.name
            categoryData.slug=req.body.slug
            categoryData.image=req.body.image
            
            const updatecategoryData = await categoryData.save()
            res.send({message:"Category updated succesfully", categoryData:updatecategoryData});
        } else {
            res.status(404).send({ message : "category not found"})
            }
        
    })
)

//      delete
categoryRouter.delete(
    '/:id',
    asyncHandler(async (req,res) => {
        const category = await CategoryModel.deleteOne({_id:req.params.id})
        if(category){
            res.json(category)
        } else {
            res.status(404).json({message : 'category not found..'})
        }
    })
)