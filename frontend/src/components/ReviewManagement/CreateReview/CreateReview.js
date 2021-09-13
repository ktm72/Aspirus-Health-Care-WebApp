import React,{useState} from "react"
import axios from "axios";
import './CreateReview.css';
import { useHistory } from "react-router-dom";
import { OutlinedInput, TextField } from "@material-ui/core";
export default function CreateReview(){
    const user=JSON.parse(localStorage.getItem('user'));
    const [feedback,setFeedback]= useState("");
    const history=useHistory();
    const patientID=user._id;
    function sendData(e){
        e.preventDefault();
        const newReview={
                feedback,
                patientID
            
        }

        //getting data from backend
        axios.post("http://localhost:8070/Review/create",newReview).then(()=>{
            alert("Review is created")
            history.push(`/patient/review/${user._id}`)
        }).catch((error)=>{
            alert("creating failed")
        }) 
    }
    
    return(
      <div className="container" align="center">
            <div className="card-form">
                <form onSubmit={sendData} className="boxAddReview">
                    <div className="row">
                        <div className="col-12">
                            < div className="row" >
                                <h3 className="mb-4" align="center">Give your reviews</h3>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group" >
                                        <label className="mb-2">Providing feedback as:</label>
                                        <OutlinedInput 
                                            type="email" 
                                            required fullWidth readOnly
                                            value={user.email}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>  
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <TextField 
                                            multiline minRows={3} id="feedback" placeholder="Enter Review"
                                            required fullWidth variant="outlined"
                                            onChange={(event)=> {setFeedback(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Add Review "  />
                            </div>
                        </div>
                    </div>       
                </form>                  
            </div>
        </div>               
    )
}
 
    
    


      
                                   