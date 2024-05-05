// import { useContext } from "react";
// import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react'
//import Rating from "./Rating";
// import { useContext } from "react";
// import { Store } from "../Store";
// import { CartItem } from "../types/Cart";
//import { convertProductToCartItem } from "../utils";
//import { toast } from "react-toastify";
//import { formatCurrency } from "../types/formatCurrency";

function ProductItem({product}:{product:Product}) {
  const [galleryList, setGalleryList] = useState([]);

const fetchcategory = async () => {
  // Axios GET Default
  axios.get("http://localhost:4000/api/category").then((response) => {
     console.log(response);
    setGalleryList(response.data);
  });
};

useEffect(() => {
  fetchcategory();
}, []);
  
  // const { state,dispatch} = useContext(Store)

  // const {
  //   cart : {cartItems},
  // } = state

  // const addToCartHandler = async (item:CartItem) => {
  //   const existItem = cartItems.find((x) => x._id === product._id)
  //   const quantity = existItem ? existItem.quantity + 1 :1
  //   if(product.countInStock < quantity) {
  //     alert("Sorry, Product is out of stock")
  //     return
  //   }
  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload:{...item,quantity}
  //   })
  //   toast.success("Product added to cart")
  // }
    return <Card>
          <Link to={'/product-category/' + product.slug}>
            <img 
                className='product-image'
                src={galleryList.image}
                height="300px"
                alt={galleryList.name} 
            />
          </Link>
          <Card.Body>
          <Link to={'/product-category/' + galleryList.slug}>
            <Card.Title>
                {galleryList.name}123
            </Card.Title>
          </Link>
          {/* <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>{formatCurrency(product.price)}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
                Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(convertProductToCartItem(product))}>
              Add to cart</Button>
          )} */}
          </Card.Body>
       
    </Card>
    
}

export default ProductItem
