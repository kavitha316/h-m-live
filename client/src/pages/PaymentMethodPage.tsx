import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from "react-bootstrap";


export default function PaymentMethodPage(){
    const navigate = useNavigate();
    const {state,dispatch} = useContext(Store)


    const {
        cart:{shippingAddress,paymentMethod}
    } = state

    const [paymentMethodName,setPaymentMethodName] = useState(paymentMethod || 'Razorpay')

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[navigate,shippingAddress])

    const submitHandler = (e:React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({
            type:'SAVE_PAYMENT_METHOD',
            payload: paymentMethodName
        })
        localStorage.setItem('paymentMethod',paymentMethodName)
        navigate('/placeorder')
    }
    return (
        <div>
            <Container className="mt-4">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>
                <h1 className="my-3">
                    Payment Method
                </h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check 
                            type="radio"
                            id='Razorpay'
                            label="Razorpay"
                            value="Razorpay"
                            checked = {true}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                            
                        />
                    </div>
                    {/* <div className="mb-3">
                        <Form.Check 
                            type="radio"
                            id='Stripe'
                            label="Stripe"
                            value="stripe"
                            checked = {paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div> */}
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </Form>
            </div>
            </Container>
        </div>
    )
}