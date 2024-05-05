import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Category } from "../types/Product";

function CategoryItem({category}:{category:Category}) {
   
    return (
        <>
        <Card className="text-center img_hover_zoom">
               <Link to={'/product-category/' + category.slug}>
                <img 
                    className='product-image large'
                    src={category.image}
                    height="300px"
                    alt={category.name} 
                />
            </Link>
            <Card.Body>
            <Link to={'/product-category/' + category.slug}>
                <Card.Title>
                    {category.name}
                </Card.Title>
            </Link>
            
            </Card.Body>
        
        </Card>
        </>
    )
    
}

export default CategoryItem
