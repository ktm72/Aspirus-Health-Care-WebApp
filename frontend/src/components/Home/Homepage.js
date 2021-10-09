import React from 'react'
import Covid from './Covid/Covid'
import Intro from './Intro/Intro'
import ReviewsHome from './Review/ReviewsHome'

function Homepage() {
    return (
        <div className="container">
            <Covid/>
            <Intro/>               
            <div className="row">
                <div className="col-8">
                    <img src="../images/appStore.png" alt="download from store" width="200px" style={{position:'absolute', marginTop:'175px', marginLeft:'50px'}}/>
                    <img src="../images/downloadApp.png" width="800px" alt="appImage" style={{ borderRadius: 400/25, paddingLeft:"10px"}}/>
                </div>
                <div className="col-4">
                    <ReviewsHome/>
                </div>                    
            </div>
        </div>
    )
}

export default Homepage
