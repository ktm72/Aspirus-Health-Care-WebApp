import React,{useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddPayment.css';
import { OutlinedInput } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function CartPayment(){
    const user=JSON.parse(localStorage.getItem('user'));
    const patientID=user._id;
    const [creditCardNumber,setCreditCardNumber]= useState("");
    const history=useHistory();
    const amount=JSON.parse(localStorage.getItem('total'));
    const cartItem=JSON.parse(localStorage.getItem('selectedItem'));
   
    function sendData(e){
        e.preventDefault();
        const newPayment={
            patientID,
            amount,
            creditCardNumber    
        }
        
    
        //getting data from backend
        axios.post("http://localhost:8070/Payment/add",newPayment).then((res)=>{
            alert("payment successful")
            const paymentID=res.data.payment._id
          
            const itemList=[{}]
            cartItem.map((Cart)=>
                axios.get(`http://localhost:8070/cart/${Cart}`).then((res) => {
                    let itemid=res.data.result.itemid
                    let quantity=res.data.result.quantity
                    itemList.push({itemid,quantity})
                }).catch((error) => {
                    alert("Failed to fetch Items")
                })
            )  
              
            const newOrder={
                paymentID,
                itemList,
                patientID
            }
             
            axios.post("http://localhost:8070/order/add",newOrder).then((res)=>{
                alert ("Order placed") 
            }).catch((error)=>{
                alert("Failed to place order")
            }) 
            
            history.push(`/patient/payment/${user._id}`)
        }).catch((error)=>{
            alert("Payment unsuccessful")
        }) 
    }
    
    return(
        <div className="container" align="center">
            <div className="card-form">
                <form onSubmit={sendData} className="boxAddPayment">
                    <div className="row">
                        <div className="col-12">
                            <div div className="row">
                                <h3>Payment method</h3>
                                <div className="col-12">
                                <img src="/images/payment.png" height="50px" width="180px" alt="payment" />
                                </div>
                                <br></br>
                                <div className="col-md-12 mb-4 mt-4">
                                    <div className="form-group">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Name on card" 
                                            required fullWidth
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="creditCardNumber" placeholder="Credit Card Number"
                                            required fullWidth
                                            onChange={(event)=> {setCreditCardNumber(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="CVV" placeholder="CVV" 
                                            required fullWidth  
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div> 
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="Expire Date" placeholder="Expiry Date" 
                                            required fullWidth  
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div> 
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="amount" placeholder="Total Amount" 
                                            required fullWidth
                                            value={amount}
                                            readOnly 
                                         
                                            inputProps={{style: {padding: 12}}}
                                            startAdornment={

                                                <InputAdornment position="start">

                                                    LKR

                                                </InputAdornment>

                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>                       
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Add payment " />
                            </div>
                        </div>
                    </div>       
                </form>                  
            </div>
        </div>               
    )
}
 
    
    
