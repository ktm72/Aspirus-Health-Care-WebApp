import React, { useState,useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import {green } from '@material-ui/core/colors';
import './ProductHistory.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button } from '@material-ui/core';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

function ProductHistory(props) {

  const [products, setProducts] = useState([])

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

   
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    async function getAllProducts() {
      axios.get(`http://localhost:8070/product`).then((res) => {
        setProducts(res.data)  
      }).catch((error) => {
        alert("Failed to fetch products")
      })
    }
    getAllProducts();
    
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                  <div ref={componentRef}>
                    <div className="container" align='center'>
                      <div className="box-single-product">
                        <div className="row">
                          <div className="col-xl-2" align='center'>
                              <img src="/images/Logo.png" width="100px" alt="logo" />
                          </div>
                          <div className="col-xl-8" align='center'>
                              <h3>Aspirus Health Care</h3>
                              <h6 >Digitally Generated Product Details Report</h6>
                          </div>
                          <div className="col-xl-2" align='right'>
                              <p>{date}/{month}/{year}</p>
                          </div>
                        </div>
                        <hr />
                        <br />
                        <div className="product px-6">
                            <div className="col-4">
                                <div className="pb-2 px-8 d-flex flex-wrap align-items-center justify-content-between">
                                    <h3>Products Details </h3>
                                </div>
                            </div>
                            <div className="col-3">
                            </div>
                        </div>
                    <div className="blue-table ">
                        <div className="blue-table, box-view-product">
                            <table>
                                <thead >
                                    <tr>
                                        
                                        <th style={{ textAlign: 'center' }}>Product Name</th>
                                        <th style={{ textAlign: 'center' }}>Details</th>
                                        <th style={{ textAlign: 'center' }}>Price</th>
                                        <th style={{ textAlign: 'center' }}>Type</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                        {products.map((Product,key) => (
                                    <tr key={key}>
                                        
                                        <td width="10px">
                                        {Product.name}            
                                        </td>                        
                                        <td width="800px">
                                        {Product.description}
                                        </td>
                                        <td  width="30px">
                                        Rs.{Product.price}.00
                                        </td>                        
                                        <td width="280px">
                                        {Product.type}
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
          <center>
            <div className="w-25 p-3" align='center'>
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
            </div>
           </center>
      </div>
    </div>
  </div> 
        
  )
 }

export default ProductHistory
