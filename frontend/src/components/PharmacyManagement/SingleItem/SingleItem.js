import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import '../Items/Items.css'
import './SingleItem.css'
import axios from 'axios'
import {orange,blue,red } from '@material-ui/core/colors';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

function ProductDetails(props) {
    const [isAdmin,setIsAdmin]=useState(false)
    const[id,setId]=useState("");
    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const [products, setProducts] = useState([])
    const history=useHistory()
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
          }
      async function getProductDetails() {
        axios.get(`http://localhost:8070/product/item/${props.match.params.id}`).then((res) => {
          setId(res.data.product._id)  
          setName(res.data.product.name)
          setDescription(res.data.product.description)
          setPrice(res.data.product.price)   
        }).catch((err) => {
          alert("Failed to Fetch Products")
        })
      }
      getProductDetails();

    }, [props])

    useEffect(() => {
        async function getProducts() {
          axios.get(`http://localhost:8070/product`).then((res) => {
            setProducts(res.data)   
          }).catch((err) => {
            alert("Failed to Fetch Products")
          })
        }
        getProducts();
      }, [])

 
    async function deleteProduct(id){        
        await axios.delete(`http://localhost:8070/product/delete/${id}`,config).then(() => {
            alert("Item deleted successfully")
            history.push('/pharmacy/items')
        }).catch((error) => {
            alert(`Failed to delete the product\n${error.message}`)
        }) 
    }    
    
    function view(id){
        history.push(`/pharmacy/item/${id}`)
    }
    function update(uid){
        history.push(`/pharmacy/item/update/${uid}`)
    }

   
    return (
        <div className = "container" align="center">
            <div className="detailProductCard">     
                <div className="detailProduct">
                                <img src="/images/dw.jpg " alt="productDeatils" />
                    <div className="box-detailProduct">
                            <div className="row">
                                <h2>{name}</h2>
                            </div>
                            <h5>Rs.{price}.00</h5>
                            <p className="text-muted">{description}</p>
                    </div>           
                </div> 
                <table className="singleItemBtn" >  
                            <div> 
                                {isAdmin === true ?
                                    <div>
                                        <button className="mx-2 productBtn" style={{backgroundColor:blue[400]}} onClick={()=>update(id)}>
                                        Update <EditIcon/>
                                        </button>
                                        <button className="mx-2 productBtn" style={{backgroundColor:red[500]}} onClick={()=>deleteProduct(id)} >
                                        Delete <DeleteForeverIcon/>
                                        </button>
                                    </div>
                                    : 
                                    <div>
                                        <button className="mx-2 productBtn" style={{backgroundColor:orange[500]}} >
                                           Add To Cart <ShoppingCartIcon/>
                                        </button> 
                                        <button className="mx-2 productBtn" style={{backgroundColor:red[500]}} >
                                            Buy Now
                                        </button> 
                                    </div>  
                                }
                            </div>
                        </table>               
            </div>
            <br></br>

            <div>
                <div> 
                    <h2 align="left"> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Related products
                    <br></br>
                    </h2>
                </div>
                <table className="relatedProduct" >
                    <div className="products">
                        <div className="container productGridR"  > 
                            {products.slice(0, 5).map((Product,key)=>( 
                                <div key={key} > 
                                    <div className="productCard">
                                            <div className="imgBx">
                                                <img  src="/images/s.jpg" alt="product"  className="itemProduct"/>
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
                                                    <button className="productBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Product._id)}>
                                                         View Item 
                                                    </button>
                                                </span> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </table>
            </div>
        </div>          
    )
}

export default ProductDetails
