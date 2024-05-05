import { Col, Container, Row } from 'react-bootstrap'
//import { Product } from '../types/Product'
//import { useReducer ,useEffect} from 'react'
//import axios from 'axios'
import { ApiError } from '../types/ApiError'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
//import { Helmet } from 'react-helmet-async'
import { useGetCategoryFilterQuery } from '../hooks/productHooks'
import { getError } from '../utils'
//import HeroSlider from './HeroSlider'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductNewItem from '../components/ProductNewItem'
import { useParams } from 'react-router-dom'
import { restApiUrl } from '../apiClient'
import { Helmet } from 'react-helmet-async'


export default function ProductListingPage() {
const [productsList, setproductsList] = useState([]);
const {slug}= useParams();


const fetchproducts = async () => {
  console.log(slug,"slug")
  const response = await axios({
    method: 'post',
    url: `${restApiUrl}api/products/product-listby-category`,
    headers: {},
    data: {
      category: slug,
    
    }
  });
 console.log(response.data, 'response value');
 
  if (response.status == 200) {
    setproductsList(response.data)
    // toast.success('Products added successfully');
  } else {
    //toast.error('Products not Added');
  }
}

useEffect(() => {
  fetchproducts()
}, []);

const {isLoading,error} = useGetCategoryFilterQuery();

  return isLoading ? (
    
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
      <>
      <Helmet>
            <title>Product Listing</title>
        </Helmet>
       <Container>
          <Row>
            <div className="text-center mb-5 mt-4">
              <h2 className="section__title text-uppercase">Products Listing</h2>
            </div>
              {
                productsList!.map((product,index) =>( 
                  <Col key={index} sm={6} md={4} lg={3} className='text-center'>
                      <ProductNewItem product={product} />
                  </Col>)
                )
              }
          </Row>
        </Container>
  </>
  )
}
