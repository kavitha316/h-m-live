//import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useGetCategoryQuery } from "../hooks/productHooks";
import { Link } from "react-router-dom";

const Footer = () => {
  const {data:category} = useGetCategoryQuery();
  return (
    <footer id='footer'>
     
      <div className="footer footer__container pt-3">
        <article className="social_icons">
          <h4>Follow Us</h4>
          <div >
            <a
              href="https://wa.me/c/919480564551"
              target="blank"
              rel="noreferrer opener"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/envirofriend.in/"
              target="blank"
              rel="noreferrer opener"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/envirofriend.in/"
              target="blank"
              rel="noreferrer opener"
            >
              <AiFillInstagram />
            </a>
           
          </div>
          {/* <h4>Get in Touch</h4>
          <Link to="/contact">Contact us</Link> */}
        </article>
        <article className="category_section">
          <h4>Categories</h4>
          
          {
          category?.map((category) =>( 
            <div key={category._id}>
          <Link to={'/product-category/' + category.slug} >
            <p>
              {category.name}
            </p>
          </Link>
          </div>
          )
          )
        }
         
        
        </article>
        <article>
          <h4>Learn More</h4>
          <p>Privacy</p>
          <p>Terms & conditions</p>
          <p>Cancellation & Refund Policy</p>
        
        </article>
        <article>
          <h4>Get in touch</h4>
          <p>Idappadi</p>
          <p>salem</p>
        
        </article>
        </div>
        <div className="footer_copyright mt-2">
        <span> 2024  All Rights herbsMarket</span>
       
        
      </div>
    </footer>
  );
};

export default Footer;
