import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

function Report(props) {
    const [items, setItems] = useState([])
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  

    useEffect(() => {

        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("patientAuthToken")}`
            }
        };
        
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8070/cart/${props.match.params.id}&${props.match.params.type}`,config).then((res) => {
                setItems(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Items")
            })
        }
        getData();        
    },[props])

    return (
        <div className="container" align='center' >
            <div className="box-single-report" >
                <div ref={componentRef} >
                    <div className="row">
                        <div className="col-xl-2" align='center'>
                            <img src="/images/Logo.png" width="100px" alt="logo" />
                        </div>
                        <div className="col-xl-8" align='center'>
                            <h3>Aspirus Health Care</h3>
                            <h6>Digitally Generated Cart Item</h6>
                        </div>
                        <div className="col-xl-2"></div>
                    </div>
                    <hr/>
                    <h2>&nbsp;&nbsp;&nbsp;Cart Report</h2>        
                    <div className="prescription px-4">
                        <br/>
                        <div className="blue-table ">
                            <div className="blue-table, box-view-prescription">
                                <table>
                            <thead >
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Item Name</th>
                                    <th style={{ textAlign: 'center' }}>Quantity</th>
                                    <th style={{ textAlign: 'center' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {items.map((Item, key) => ( 
                                    <tr>
                                        <td>
                                        {Item.itemid.name}
                                        </td>
                                        <td>
                                        {Item.quantity}
                                        </td>
                                        <td>
                                        {Item.total}.00
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button  variant="contained" className="mb-4" disableElevation size="large" onClick={handlePrint} style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>} >  Download </Button>        
        </div>   
    )
}

export default Report
