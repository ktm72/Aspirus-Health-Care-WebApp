import React, {useState,useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Orders() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [orders,setOrder]=useState([])

    

    useEffect(() => {        
        
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8070/order/${user}`).then((res) => {
                setOrder(res.data.result) 
                console.log(res.data.result)
            }).catch((error) => {
              alert("Failed to fetch Items")
              console.log(error)
            })
        }
        getData();        
    }, [])

    async function getProductDetails(id) {
        axios.get(`http://localhost:8070/product/item/${id}`).then((res) => {   
           setOrder( res.data.product.name)
            // return String(itemName)
        }).catch((error) => {
          alert("Failed to Fetch Products")
        })
      }
    
    return (
        <div className="container">            
            <div className="blue-table">
                <table className="table100 ver1 m-b-110">
                    <thead>                    
                        <tr>
                            <th></th>                            
                            <th> Items</th>
                            <th>Quantity</th>
                            <th> Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((Order, key) => (                         
                        <tr key={key}>
                            <td>
                                {Order.itemid.imgUrl}
                            </td>
                            <td>
                                {Order.itemList.map((Item,key)=>(
                                    <p key={key}>{Item.itemid}</p>
                                ))}
                            </td> 
                            <td>
                                {Order.itemList.map((Item,key)=>(
                                    <p key={key}>{Item.quantity}</p>
                                ))}
                            </td>  
                            <td>
                                <p color="black">{Order.paymentID.amount}</p>
                            </td>                                              
                        </tr>     
                     ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
