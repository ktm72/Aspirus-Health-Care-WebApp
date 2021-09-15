import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './Items.css'
import axios from 'axios'
import { orange,red,blue } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

function ProductItem() {

  const [isAdmin,setIsAdmin]= useState(false)
  const [products, setProducts] = useState([])
  const history = useHistory()
  const location = useLocation()

  useEffect(() => { 
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
  function addProduct(){
    history.push(`/pharmacy/addProduct`)
  }
    return (
        <div className="container productGrid" > 
          {isAdmin && 
            <Button  className="mx-2 productBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addProduct()}>
            Add Product <AddIcon/>
            </Button> 
          }
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
                                  <button className="productBtn" style={{backgroundColor:orange[600]}}> 
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
