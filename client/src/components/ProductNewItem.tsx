// import { Card, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function ProductNewItem(props:any){
//     const { icon, navigateTo, title } = props.item;
//     return(
//       <Card>
//         <Col className=" mb-5">
//             <Link to={`/product/${navigateTo}`}>
//             <div className="car__item">
//           <div className="car__img">
//             <img
//               src={icon}
//               height="250px"
//               // width="150px"
//               alt=""
//               className="w-100"
//             />
//           </div>
//           <div className="car__item-content mt-4">
//             <h4 className="section__title text-center">{title}</h4>
//           </div>
//         </div>
//             </Link>
//         </Col>
//         </Card>
//     )
// }

// import { useContext } from "react";
// import { toast } from "react-toastify";
import { Button, Card } from "react-bootstrap";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";
import { formatCurrency } from "../types/formatCurrency";

function ProductNewItem({product}:{product:Product}) {
  const { state,dispatch} = useContext(Store)

  const {
    cart : {cartItems},
  } = state

  const addToCartHandler = async (item:CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 :1
    if(product.countInStock < quantity) {
      alert("Sorry, Product is out of stock")
      return
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload:{...item,quantity}
    })
    toast.success("Product added to cart")
  }
    return <Card className="img_hover_zoom">
          <Link to={'/product/' + product.slug}>
            <img 
                className='product-image'
                src={product.image}
                height="300px"
                alt={product.name} 
            />
          </Link>
          <Card.Body>
          <Link to={'/product/' + product.slug}>
            <Card.Title>
                {product.name}
            </Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>{formatCurrency(product.price)}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
                Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(convertProductToCartItem(product))}>
              Add to cart</Button>
          )}
          </Card.Body>
       
    </Card>
    
}

export default ProductNewItem
