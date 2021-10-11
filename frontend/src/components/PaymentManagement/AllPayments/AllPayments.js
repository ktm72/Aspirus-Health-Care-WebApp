import React, {useState,useEffect} from 'react';
import axios from "axios";
import { useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { green} from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
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
    const history=useHistory();
    
    useEffect(()=> {
        async function getPayments(){

            await axios.get(`http://localhost:8070/payment/${props.match.params.id}`).then((res)=>{
                setPayments(res.data.result);
            }).catch((error)=>{
                alert("fetching failed");
            })    

        }
        getPayments();
    },[props]) 

    function filterContent(data,searchTerm){
        const result=data.filter((Payment)=>
            Payment.date.toLowerCase().includes(searchTerm) 
            
        )
    setPayments(result)
    }

    function handleSearch(event){
        const searchTerm=event.currentTarget.value
        axios.get(`http://localhost:8070/payment/${props.match.params.id}`).then((res)=>{
            filterContent(res.data.result,searchTerm.toLowerCase())

        }).catch((error)=>{
            alert("payment fetching failing")
        })
    }
        
    

    async function deletePayment(id){
        await axios.delete(`http://localhost:8070/payment/delete/${id}`,config).then(()=>{
            setPayments( payments.filter(element => element._id !== id))
        }).catch((error)=>{
            alert("deleting failed");
        })    
    }
    
    const report=()=>{
        history.push(`/patient/payments/report`)
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Payment History</h2>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-5">
                    <div className="px-3 search" align="center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Payments"
                            onChange={handleSearch}
                            required
                        />
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
                </table><br></br>
               <center> 
                    <Button style={{ backgroundColor: green[400], color: 'white'}}
                        endIcon={<GetAppIcon />}
                        onClick={report}>
                        Generate Report
                    </Button>
                </center>
            </div>
        </div>
    )
    
}


    