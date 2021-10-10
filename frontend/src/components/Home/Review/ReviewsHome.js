import React, {useState,useEffect} from 'react';
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css"

function ReviewsHome() {
    Aos.init({duration:1000})

    const [reviews,setReviews]=useState([])

    useEffect(()=> {
        function getReviews(){

            axios.post(`http://localhost:8070/review/`).then((res)=>{
                setReviews(res.data.result);
            }).catch((error)=>{
                alert("fetching failed");
            })    

            }
        getReviews();
    },[])
    
    return (
        <div style={{maxHeight:"390px",overflow:"scroll"}} >
        {reviews.map((Review, key) => (  
            <div className="mt-3" data-aos="slide-up" key={key}>                              
                    <div className="row" >
                        <div className="col-1">
                            <img src={Review.patientID.imgUrl} width="35px" height="35px" alt="profileImg" style={{ borderRadius: 100}}/>
                        </div>            
                        <div className="col-10 mx-3">
                            <div className="row">
                                <div className="col-9 pt-1">
                                    <h5 className="text-muted align-item-center">{Review.patientID.firstname + " " + Review.patientID.lastname}</h5>
                                </div>
                                <div className="col-3 text-muted pt-1">
                                    <p>{Review.date}</p>    
                                </div>            
                                <div className="col-12 text-muted">
                                    <p>{Review.feedback}</p>
                                </div>   
                            </div>   
                        </div>
                    </div>            
            </div>
        ))}
        </div>
        
    )
}

export default ReviewsHome
