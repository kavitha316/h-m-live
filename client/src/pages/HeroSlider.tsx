import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SimpleImageSlider from "react-simple-image-slider";
import { useGetBannerQuery } from "../hooks/productHooks";

const images = [
  { url: "https://ik.imagekit.io/og9wa9z3b/herbs%20market/ratul-ghosh-NPrWYa69Mz0-unsplash.jpg?updatedAt=1706526911608" },
  { url: "https://ik.imagekit.io/og9wa9z3b/herbs%20market/dryfruit.jpg?updatedAt=1706527078094" },
  { url: "https://ik.imagekit.io/og9wa9z3b/herbs%20market/cerals.jpg?updatedAt=1706527617630" },
  
];



export default function HeroSlider(){
   const {data:banner} = useGetBannerQuery();
   console.log(banner, "bannervvv")

//     const [bannerList, setBannerList] = useState(banner);

// const fetchnavbar = async () => {
//   // Axios GET Default
//   axios.get('http://localhost:4000/api/banner').then((response) => {
//     console.log(response);
//     setBannerList(response.data);
//   });
// };

// useEffect(() => {
//   fetchnavbar();
// }, []);
    return(
        <div>
        <Helmet>
            <title>Herbs market slider</title>
        </Helmet>
          
            <div className="mb-4">
                 <SimpleImageSlider
                    autoPlay={true}
                    width="100%"
                    height={504}
                    images={banner || []}
                    showBullets={false}
                    showNavs={false}
                />
            </div>
        </div>
    )
    
}