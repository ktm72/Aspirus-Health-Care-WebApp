import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './Items.css'
import axios from 'axios'
import { orange,red,blue,green } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import {AddToCart} from './../../../Utils/CartUtils'
import GetAppIcon from '@material-ui/icons/GetApp';

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
  
  function filterContent(data, searchTerm){
    const result = data.filter((product) => 
        product.name.toLowerCase().includes(searchTerm) 
    )
    setProducts(result)
  }

  function handleSearch(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/product/OTC`).then((res) => {
      filterContent(res.data.result, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch products")
    })
  }

  function handleSearchAll(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/product`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Admin Failed to fetch products")
    })
  }
  function view(id){
    history.push(`/pharmacy/item/${id}`)
  }
  
  function addProduct(){
    history.push(`/pharmacy/addProduct`)
  }
  function ProductHistory(){
    history.push(`/pharmacy/product/history`)
}
    return (
        <div className="container">
          <div className="row">
              <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Aspirus Pharmacy</h2>
                </div>
              </div>
              <div className="col-3">
              </div>
              <div className="col-5">
              {isAdmin === true ?
                <div className="px-3 search" align="right">
                  <input 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                  />
                </div>
                :
                <div className="px-3 search" align="right">
                    <input 
                      type="text" 
                      name="search" 
                      id="search"
                      placeholder="Search" 
                      onChange={handleSearch} 
                      required 
                    />
                </div> 
              }  
          </div>
        </div>
        <div className="productGrid"  > 
          {isAdmin && 
            <Button  className="mx-2 productBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addProduct()}>
            Add Product <AddIcon/>
            </Button>  
          }
          {isAdmin && 
            <Button  className="mx-2 productBtn" style={{backgroundColor:green[400],color:'white'}} onClick={ProductHistory} >
            Pharmacy Report<GetAppIcon />
            </Button>  
          }
          {products.map((Product,key)=>( 
                <div key={key}> 
                    <div className="productCard" >
                        <div className="imgBx">
                            <img  src={`${Product.imgUrl}`} alt="product" className="itemProduct"/>
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
      </div>
    )      
}

export default ProductItem
