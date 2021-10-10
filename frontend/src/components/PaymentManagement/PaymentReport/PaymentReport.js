import { useReactToPrint } from "react-to-print";
import React,{useRef} from 'react'
import axios from 'axios';
import  {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { green} from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
import './PaymentReport.css';

export default function PaymentReport(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [payments,setPayments]=useState([])

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
   
    useEffect(()=> {
        async function getPayments(){

            await axios.get(`http://localhost:8070/payment/${user._id}`).then((res)=>{
                setPayments(res.data.result);
            }).catch((error)=>{
                alert("fetching failed");
            })    

        }
        getPayments();
    },[user]) 

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

   
    return(
      
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div ref={componentRef}>
                            <div className="container" align='center'>
                                <div className="box-payment-report">
                                    <div className="row">
                                        <div className="col-xl-2" align='center'>
                                            <img src="/images/Logo.png" width="100px" alt="logo" />
                                        </div>
                                        <div className="col-xl-8" align='center'>
                                            <h3>Aspirus Health Care</h3>
                                            <h6 >Digitally Generated Payment Report</h6>
                                        </div>
                                        <div className="col-xl-2" align='right'>
                                            <p>{date}/{month}/{year}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="prescription px-4">
                                        <div className="col-4">
                                            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                                                <h2>Payments</h2>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                        </div>
                                    </div>
                                    <div className="blue-table ">
                                        <div className="blue-table, box-view-prescription">
                                            <table>
                                                <thead >
                                                    <tr>
                                                        
                                                        <th style={{ textAlign: 'center' }}>Patient Name</th>
                                                        <th style={{ textAlign: 'center' }}>Amount</th>
                                                        <th style={{ textAlign: 'center' }}>Card number</th>
                                                        <th style={{ textAlign: 'center' }}>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                        {payments.map((Payment,key) => (
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
                                                    </tr> 
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                      
                                    </div>
                                    <div className="mt-5" align='right'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center><div className="w-25 p-3" align='center'>
                        <Button
                        className="print__button"
                        variant="contained"
                        color="secondary"
                        endIcon={<GetAppIcon />}
                        style={{ backgroundColor: green[700], color: 'white'}}
                        disableElevation
                        onClick={handlePrint}
                        fullWidth
                    >
                        Download Details 
                    </Button>
                    </div></center>
                </div>
            </div>
        </div> 
        
     
    )
} 