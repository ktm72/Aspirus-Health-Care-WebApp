import React, {useState,useEffect} from 'react';
import axios from "axios";
import './AllPayments.css';
import {IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { red } from '@material-ui/core/colors';
export default function AllPayments(props){
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    }; 
    const [payments,setPayments]=useState([])
   
    useEffect(()=> {
        async function getPayments(){

            await axios.get(`http://localhost:8070/payment/${props.match.params.patientID}`).then((res)=>{
                setPayments(res.data.result);
            }).catch((error)=>{
                alert("fetching failed");
            })    

            }
        getPayments();
    },[props]) 

    async function deletePayment(id){
        await axios.delete(`http://localhost:8070/payment/delete/${id}`,config).then(()=>{
            setPayments( payments.filter(element => element._id !== id))
        }).catch((error)=>{
            alert("deleting failed");
        })    
    }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Payment History</h2>
                    </div>
                </div>
            </div>
            <div className="blue-table">
                <table className="table100 ver1 mb-110">
                    <thead>                    
                        <tr className="text-center">
                            <th>Patient Name</th>                        
                            <th>Amount</th>                        
                            <th>Card Number</th>                        
                            <th >Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((Payment, key) => (
                            <tr key={key}>
                                <td>
                                    {Payment.patientID.firstname + ' ' +Payment.patientID.lastname }             
                                </td>                        
                                <td>
                                    {Payment.amount}
                                </td>
                                <td>
                                    {Payment.creditCardNumber}
                                </td>                        
                                <td >
                                    {Payment.date}
                                </td>
                                <td>  
                                    <div style={{verticalAlign:'middle'}}>                                 
                                    <IconButton onClick={()=>  deletePayment(Payment._id)}>
                                        <DeleteIcon fontSize="large" style={{color:red[500]}} ></DeleteIcon>
                                    </IconButton>  
                                    </div>                         
                                </td>                          
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

    