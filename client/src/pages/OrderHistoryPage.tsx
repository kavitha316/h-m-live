import { useNavigate } from 'react-router-dom'
import {useGetOrderHistoryQuery} from '../hooks/orderHook'
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Button, Container } from 'react-bootstrap';

export default function OrderHistoryPage(){
    const navigate = useNavigate();
    const {data:orders, isLoading,error} = useGetOrderHistoryQuery();

    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <Container>
            <h1 className="my-3">
                Order History
            </h1>
            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ?(
                <MessageBox variant='danger'>
                    {getError(error as ApiError)}
                </MessageBox>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders!.map((order) => (
                                <tr key={order._id}>
                                    {/* <td>{order._id}</td> */}
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                    <td>
                                    {order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}
                                    </td>
                                    <td>
                                        <Button
                                            type="button"
                                           
                                            variant="light"
                                            onClick={() => {
                                                navigate(`/order/${order._id}`)
                                            }}
                                        >
                                            Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
            </Container>
        </div>
    )
}