import React from 'react'
import AllDoctors from './Doctors/AllDoctors'
import Covid from './Covid/Covid'
import PharmacyHome from './PharmacyHome'
import Intro from './Intro/Intro'
import ReviewsHome from './Review/ReviewsHome'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function Homepage() {

    const history = useHistory()

    function Pharmacy() {
        history.push(`/pharmacy/items`)
    }
    return (
        <div className="container">
            <Covid/>
            <Intro/>      
            <AllDoctors/>

            <div className="row my-4">
                <div className="col-5">
                    <PharmacyHome/>
                </div>
                <div className="col-7">
                    <Button
                        onClick={Pharmacy}                        
                        style={{position:'absolute', marginTop:'203px', marginLeft:'66px',color:"white",fontSize:"13px"}}>
                            Shop more
                    </Button>                    
                    <img src="../images/PharmacyHome.png" width="750px" alt="appImage" style={{ borderRadius: 400/25, paddingLeft:"10px"}}/>                    
                </div>                    
            </div>

            <div className="row">
                <div className="col-8 my-5">                    
                    <img src="../images/appStore.png" alt="download from store" width="200px" style={{position:'absolute', marginTop:'175px', marginLeft:'50px'}}/>
                    <img src="../images/downloadApp.png" width="800px" alt="appImage" style={{ borderRadius: 400/25, paddingLeft:"10px"}}/>
                </div>
                <div className="col-4 my-5">
                    <ReviewsHome/>
                </div>                    
            </div>
        </div>
    )
}

export default Homepage