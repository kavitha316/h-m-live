import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { formatCurrency } from "../types/formatCurrency";

export default function CartPage(){
    const navigate = useNavigate();

    const {
        state:{
            mode,
            cart:{cartItems},
        },
        dispatch
    } = useContext(Store);

    const upadteCartHandler =async (item:CartItem,quantity:number) => {
        if(item.countInStock < quantity){
            toast.warn("Sorry, product is out of Stock")
            return
        }
        dispatch({
            type:'CART_ADD_ITEM',
            payload: {...item,quantity},
        })
    }
    const checkOutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }
    const removeItemHandler = (item : CartItem) => {
        dispatch({type:'CART_REMOVE_ITEM',payload:item})
    }

    return(
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <Container>
                <div className="text-center mt-3 mb-4 cart_page">
                <h1>Shopping cart</h1>
                </div>
           
            <Row>
                <Col md={8} className="mb-1">
                {
                        cartItems.length === 0 ? (
                            <MessageBox>
                                Your Cart is empty.
                               <p>  <Link to="/">Go Shopping</Link></p>
                            </MessageBox>
                        ) : (
                            <ListGroup>
                                {/* <Card className=" mb-1">
                                <table>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>price</th>
                                    <th>Delete</th>
                                </table>
                                </Card> */}
                                {
                                    cartItems.map((item:CartItem) =>(
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col className=" d-flex">
                                                    <img 
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded thumbnail"
                                                    />
                                                    <Link to={`/product/${item.slug}`} className="product_cart_name">
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col className="minus_btn">
                                                    <Button 
                                                        onClick={() =>
                                                            upadteCartHandler(item,item.quantity - 1)
                                                        }
                                                        variant={mode}
                                                        disabled={item.quantity === 1}
                                                        className="quantity_value "
                                                        >
                                                        <i className="fa fa-minus-circle"></i>
                                                    </Button>
                                                    {" "}
                                                    <span>
                                                        {item.quantity}
                                                    </span>
                                                    <Button 
                                                        onClick={() =>
                                                            upadteCartHandler(item,item.quantity + 1)
                                                        }
                                                        variant={mode}
                                                        className="quantity_value"
                                                        disabled={item.quantity === item.countInStock}
                                                        >
                                                        <i className="fa fa-plus-circle"></i>
                                                    </Button>
                                                </Col>
                                                <Col  className="cart_item_price">
                                                    {/* ${item.price} */}
                                                    {formatCurrency(item.price)}
                                                </Col>
                                                <Col >
                                                    <Button 
                                                    variant={mode}
                                                    
                                                    onClick={() =>removeItemHandler(item)}
                                                    >
                                                        <i className="fas fa-trash text-danger"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    Subtotal ({cartItems.reduce((a,c) => a + c.quantity,0)}{' '}
                                    item) :  {formatCurrency
                                    (cartItems.reduce((a,c) => a + c.price * c.quantity, 0))}
                                </h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    type="button"
                                    variant="primary"
                                    onClick={checkOutHandler}
                                    disabled={cartItems.length === 0}
                                    >
                                        Proceed to checkout
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
            </Container>
        </div>
    )
}