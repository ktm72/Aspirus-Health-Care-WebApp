import React, {useState,useEffect} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Orders() {
    const user=JSON.parse(localStorage.getItem('user'));
    const [orders,setOrder]=useState([])

    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("patientAuthToken")}`
        }
    };

    useEffect(() => {        
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8070/order/${user._id}`,config).then((res) => {
                setOrder(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Items")
            })
        }
        getData();        
    }, [])
    
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
                                {Order.itemid.name}
                            </td> 
                            <td>
                                {Order.quantity}
                            </td>  
                            <td>
                                {/* {Review.date} */}
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
