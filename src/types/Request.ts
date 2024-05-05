/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express{
    export interface Request {
        user:{
            _id:string
            name:string
            phone:number
            email:string
            isAdmin:boolean
            token:string
        }
    }
}