import express ,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { BannerModel } from '../models/bannerModel';

export const bannerRouter = express.Router();

//      /api/category
bannerRouter.get(
    '/',
    asyncHandler(async (req,res) => {
        const banners = await BannerModel.find().select('url')
        res.json(banners)
    })
)



//      /api/slug/frog
bannerRouter.get(
    '/:id',
    asyncHandler(async (req,res) => {
        const banner = await BannerModel.findById(req.params.id)
        if(banner){
            res.json(banner)
        } else {
            res.status(404).json({message : 'banner not found..'})
        }
    })
)

//    api/category

bannerRouter.post(
    '/',
    asyncHandler(async (req:Request,res:Response) => {
        const bannerData = await BannerModel.create({
            url:req.body.url,
           
        })
        res.json({
            url:bannerData.url,
           
        })
    })
)
//   update

bannerRouter.put(
    '/:id',
    asyncHandler(async (req:Request,res:Response) => {
        const bannerData = await BannerModel.findById(req.params.id)
        if(bannerData){
            bannerData.url=req.body.url
          
            
            const updatebannerData = await bannerData.save()
            res.send({message:"Banner updated succesfully", bannerData:updatebannerData});
        } else {
            res.status(404).send({ message : "Banner not found"})
            }
        
    })
)

//      delete
bannerRouter.delete(
    '/:id',
    asyncHandler(async (req,res) => {
        const banner = await BannerModel.deleteOne({_id:req.params.id})
        if(banner){
            res.json(banner)
        } else {
            res.status(404).json({message : 'banner not found..'})
        }
    })
)