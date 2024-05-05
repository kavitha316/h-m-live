export type Product = {
    _id: string
    name : string
    slug : string
    image : string
    category : string
    brand : string
    price : number
    countInStock : number
    description : string
    rating : number
    numReviews : number
}

export type Category = {
    _id: string
    name : string
    slug : string
    image : string
}

export type Banner = {
    url : string
}

