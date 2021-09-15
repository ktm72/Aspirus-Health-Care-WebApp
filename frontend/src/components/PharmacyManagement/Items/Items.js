import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './Items.css'
import axios from 'axios'
import { orange,red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {AddToCart} from './../../../Utils/CartUtils'

function ProductItem() {

  const [isAdmin,setIsAdmin]= useState(false)
  const [products, setProducts] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }
    async function getAllProducts() {
      axios.get(`http://localhost:8070/product`).then((res) => {
        setProducts(res.data)  
      }).catch((error) => {
        alert("Failed to fetch products")
      })
    }

    async function getOtcProducts() {
      axios.get(`http://localhost:8070/product/OTC`).then((res) => {
        setProducts(res.data.result) 
      }).catch((error) => {
        alert("Failed to fetch products")
      })
    }

    if(isAdmin === true){
      getAllProducts();
    }else{
      getOtcProducts();
    }
  }, [location,isAdmin])
  
  function view(id){
    history.push(`/pharmacy/item/${id}`)
  }
    return (
        <div className="container productGrid" > 
          {products.map((Product,key)=>( 
                <div key={key}> 
                    <div className="productCard">
                        <div className="imgBx">
                            <img  src="/images/s.jpg" alt="product" className="itemProduct"/>
                        </div>
                        <div className="p-3">
                            <h7>{Product.name}</h7>
                            <h6>Rs.{Product.price}.00</h6>
                            <div align="right">
                              <span> 
                                  <button className="productBtn" style={{backgroundColor:orange[600]}}
                                    onClick={()=>AddToCart(Product._id, user._id, Product.price)}> 
                                    <ShoppingCartIcon/> 
                                  </button>
                                  &nbsp;&nbsp;&nbsp;
                                  <button className="productBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Product._id)}> View Item </button>
                              </span> 
                            </div>
                        </div>
                    </div>
                </div>
          ))}
        </div>
    )
}

export default ProductItem
