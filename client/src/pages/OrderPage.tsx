import { useCallback, useContext } from "react";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useGetOrderDetailsQuery,  useRazorpayCreateOrder, useOrderPaidMutation} from "../hooks/orderHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import apiClient from "../apiClient";
import { Order } from "../types/Order";
import { formatCurrency } from "../types/formatCurrency";

export default function OrderPage() {
    const navigate = useNavigate();
    const [Razorpay] =  useRazorpay();

    const {state} = useContext(Store);
    const {userInfo} = state;
    console.log(userInfo);

    const params = useParams()
    const {id:orderId} = params

    const {data:order, isLoading, error} = useGetOrderDetailsQuery(orderId!);

    const {mutateAsync:createOrder} = useRazorpayCreateOrder();


   
    const {mutateAsync:payOrder}  = useOrderPaidMutation()

  
    const handlePayment = useCallback(async () => {
        const orderResponse = await apiClient.get<Order>(`api/orders/${orderId}` );
        console.log(orderResponse.data, "orderResponse");

        const amount:number = Math.round(((orderResponse.data.totalPrice|| 0)*100 )) || 0;
        const data = await createOrder({amount}) ;        
        const options: RazorpayOptions = {
          key: "rzp_test_WMoLuuebS2gTZc",
          amount: data.amount,
          currency: "INR",
          name: userInfo?.name,
          description: "Transaction",
          image: "https://example.com/your_logo",
          order_id: data.id,
          handler: async (res) => {
            console.log(res);
            const orderPay =  await payOrder({orderId:orderId||'',email_address:'kavimadhu@gmail.com',status:''});
            console.log(orderPay, "order pay ....");
            if(orderPay.order.isPaid===true){
                toast.success('Order is paid')
                navigate('/orderhistory')
            }else{
                console.log("payment faield")
            }
          },
          prefill: {
            name: userInfo?.name,
            email: userInfo?.email,
            contact: userInfo?.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzpay = new Razorpay(options);
        rzpay.open();
      }, [Razorpay]);
    

    return isLoading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : !order ? (
        <MessageBox variant="danger">Order Not Found</MessageBox> 
    ) : (
        <div>
            <Container>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            
            <h3 className="my-3">Order <span className="order_id_item">{orderId}</span></h3>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                Shipping
                            </Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                                <strong>Address:</strong> {order!.shippingAddress.address},
                                {order!.shippingAddress.city},{order!.shippingAddress.postalCode},
                                {order!.shippingAddress.country}
                            </Card.Text>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="warning">
                                    Not Delivered
                                </MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment Method</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="warning">
                                Not Paid
                            </MessageBox> 
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {
                                    order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded thumbnail"
                                                    />{' '}
                                                    <Link to={`product/${item.slug}`} className="item_place_name">
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={3}>
                                                    <span>
                                                        {item.quantity}
                                                    </span>
                                                </Col>
                                                <Col md={3}>
                                                    <span>
                                                    {formatCurrency(item.price)}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>
                                            {formatCurrency(order.itemsPrice.toFixed(2))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping Price</Col>
                                        <Col>
                                            {formatCurrency(order.shippingPrice.toFixed(2))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                            {formatCurrency(order.taxPrice.toFixed(2))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Total</Col>
                                        <Col>
                                           <strong> {formatCurrency(order.totalPrice.toFixed(2))}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {order.isPaid ? (
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <div className="d-grid">
                                                    <Button
                                                    type="button"
                                                    className=" btn-success"
                                                    disabled
                                                    >
                                                       Amount is Paid
                                                    </Button>
                                                </div>
                                            </Col>
                                            {/* <button onClick={handlePayment}>Click</button> */}
                                        </Row>
                                    </ListGroup.Item>
                                    ):(
                                        <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <div className="d-grid">
                                                    <Button
                                                    type="button"
                                                    variant="primary"
                                                    onClick={handlePayment}
                                                    // onClick={testPayHandler}
                                                    >
                                                        Pay Now
                                                    </Button>
                                                </div>
                                            </Col>
                                            {/* <button onClick={handlePayment}>Click</button> */}
                                        </Row>
                                    </ListGroup.Item>
                                    )
                                 }
                                
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
    )
}