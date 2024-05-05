import { Col, Container, Row } from 'react-bootstrap'
//import { Product } from '../types/Product'
//import { useReducer ,useEffect} from 'react'
//import axios from 'axios'
import { ApiError } from '../types/ApiError'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Helmet } from 'react-helmet-async'
import { useGetCategoryQuery } from '../hooks/productHooks'
import { getError } from '../utils'
import HeroSlider from './HeroSlider'
import CategoryItem from '../components/ComponentItem'


export default function HomePage() {

const {data:category,isLoading,error} = useGetCategoryQuery();

  return isLoading ? (
    
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
      <>
     <HeroSlider />  
     <Container>
    <Row>
   
        <Helmet>
            <title>Ts Amazona</title>
        </Helmet>
            <div className="text-center mb-2">
              <h2 className="section__title text-uppercase">Products</h2>
            </div>
        {
          category!.map((category) =>( 
          <Col key={category.slug} sm={6} md={4} lg={3} className='mb-3'>
            <CategoryItem category={category} />
          </Col>)
          )
        }
  </Row>
  </Container>

  </>
  )
}
