import {modelOptions,prop,getModelForClass} from '@typegoose/typegoose'

@modelOptions({
    schemaOptions:{timestamps:true}
})

export class Banner{
    public _id?:string;

    @prop({required:true})
    public url!:string;


}

export const BannerModel = getModelForClass(Banner);