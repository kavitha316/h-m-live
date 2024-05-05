import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Badge, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { formatCurrency } from "../types/formatCurrency";
import axios from "axios";
import { restApiUrl } from "../apiClient";

export default function ProductPage() {
   // const [productList, setproductsList] = useState([]);
    const params = useParams();
    const {slug} = params;
   
    console.log(slug, "slug")
    const {
        data:product,
        isLoading,
        error,
    } = useGetProductDetailsBySlugQuery(slug!);

    const { state,dispatch} = useContext(Store)

    const {cart } = state
    const navigate = useNavigate()

    const addToCartHandler =  () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 :1
        if(product!.countInStock < quantity) {
          toast.warn("product is out of stock")
          return
        }
        dispatch({
          type: "CART_ADD_ITEM",
          payload:{...convertProductToCartItem(product!),quantity}
        })
        toast.success('Product is added to cart')
        navigate('/cart')
      }

  return (
    isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">
            { getError(error as ApiError)}
        </MessageBox>
    ) : !product ? (
        <MessageBox variant="danger">Product not found.</MessageBox>
    ) :(
    <div>
        <Helmet>
            <title>Product Page</title>
        </Helmet>
        <Container>
        <Row>
        <div className="text-center mb-3 mt-3">
              <h2 className="section__title text-uppercase">Product Details</h2>
            </div>
            <Col md={6} className="img_hover_zoom">
                <img className="large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
               <ListGroup variant="flush">
                <ListGroup.Item>
                    <Helmet>
                        <title>{product.name}</title>
                    </Helmet>
                    <h2 className=" text-capitalize">{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating 
                    rating={product.rating}
                    numReviews={product.numReviews}
                    ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                   <h6>Price:</h6> {formatCurrency(product.price)}
                </ListGroup.Item>
               
               </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>{formatCurrency(product.price)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {
                                            product.countInStock > 0 ? (
                                                <Badge bg="success">In stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Unavailable</Badge>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button onClick={addToCartHandler} variant="primary">
                                            Add to cart
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <ListGroup.Item>
                    <h3 className="mt-3">Description:</h3>
                   <p>{product.description}</p>
                </ListGroup.Item>
            </Col>
        </Row> 
        </Container>
    </div>
    )
  )
}
