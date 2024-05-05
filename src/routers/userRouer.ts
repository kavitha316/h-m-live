import express , {Request,Response}from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User, UserModel } from '../models/userModel';
import { generateToken, isAuth } from '../utils';

export const userRouter = express.Router()
//POST/api/signin
userRouter.post('/signin',
    asyncHandler(async (req:Request,res:Response) => {
        const user = await UserModel.findOne({email:req.body.email})
        if(user) {
            if(bcrypt.compareSync(req.body.password,user.password)){
                res.json({
                    _id:user._id,
                    name:user.name,
                    phone:user.phone,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                })
                return
            }
        }
        res.status(401).json({message:'Invalid email or password'})
    })
)

//POST/api/register
userRouter.post(
    '/signup',
    asyncHandler(async (req: Request, res: Response) => {
      const user = await UserModel.create({
        name: req.body.name,
        phone:req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      } as User)

      res.json({
        _id: user._id,
        name: user.name,
        phone:user.phone,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      })
    })
  )

  userRouter.put(
    '/profile',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
      const user = await UserModel.findById(req.user._id)
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone:updatedUser.phone,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        })
        return
      }
  
      res.status(404).json({ message: 'User not found' })
    })
  )