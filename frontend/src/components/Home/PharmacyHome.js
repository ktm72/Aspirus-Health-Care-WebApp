import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import '../PharmacyManagement/Items/Items.css'
import '../PharmacyManagement/SingleItem/SingleItem.css'
import axios from 'axios'
import {orange,red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {AddToCart} from './../../Utils/CartUtils'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ProductDetails(props) {
    const [products, setProducts] = useState([])
    const history=useHistory()
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        async function getOtcProducts() {
            axios.get(`http://localhost:8070/product/OTC`).then((res) => {
              setProducts(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch products")
            })
          }
          getOtcProducts();
      }, [])
  
    
    function view(id){
        history.push(`/pharmacy/item/${id}`)
    }
    
    return (
        <div>         
            <Carousel removeArrowOnDeviceType={["desktop"]} responsive={responsive} autoPlay={true} autoPlaySpeed={2000} infinite={true} className="px-5 py-5 mb-2">
                {products.map((Product,key)=>( 
                    <div key={key} > 
                        <div className="productCard">
                                <div className="imgBx">
                                    <img  src={`${Product.imgUrl}`} alt="product"  className="itemProduct"/>
                                </div>
                                <div className="p-3">
                                    <h7>{Product.name}</h7>
                                    <h6>Rs.{Product.price}.00</h6>
                                <div align="right">
                                    <span> 
                                        <button className="productBtn" style={{backgroundColor:orange[600]}} onClick={()=>AddToCart(Product._id,Product.price)}> 
                                            <ShoppingCartIcon/> 
                                        </button>
                                            &nbsp;&nbsp;&nbsp;
                                        <button className="productBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Product._id)}>
                                                View Item 
                                        </button>
                                    </span> 
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>       
    )
}

export default ProductDetails
