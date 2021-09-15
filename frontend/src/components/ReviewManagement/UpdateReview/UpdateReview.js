import React, {useState,useEffect} from 'react';
import axios from "axios";
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import RateReviewIcon from '@material-ui/icons/RateReview';
import {  blue } from '@material-ui/core/colors';
import './UpdateReview.css'
function UpdateReview(props){
    const user=JSON.parse(localStorage.getItem('user'));
    const [feedback,setFeedback]= useState("");
    const history=useHistory()
    
    useEffect(()=>{
      async function fetchReview(){
        await axios.post(`http://localhost:8070/review/${props.match.params.id}`).then((res)=>{
           setFeedback(res.data.feedback)
        }).catch((error)=>{
          alert("Failed to fetch data")
        })
      }
      fetchReview()
    },[props]);
      
    async function Update(event){
        event.preventDefault()  
        const updatedReview = {feedback}
        const config = {
          headers: {
            "content-Type": "application/json",
          }
        };
        
        try {
          await axios.put(`http://localhost:8070/review/update/${props.match.params.id}`,updatedReview, config);
          alert(" Review Updated Successfully")
          history.push(`/patient/review/${user._id}`)
        } catch (error) {
          alert("Updating Failed")
        }
    } 
    
    return (
      <div className="container" align="center">
        <div className="row">
          <div className="col-12">
            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
              <h2> Update Review Details</h2>
            </div>
          </div>
        </div> 
        <form className="boxUpdateReview" onSubmit={Update}>
          <div className="row">
            <h3>Review <RateReviewIcon fontSize="large" style={{ color: blue[500]}}/> </h3>
            <div className="col-12">
              <div className="form-group">
                <br></br>
                <TextField
                  multiline minRows={3}
                  required fullWidth
                  variant="outlined"
                  placeholder="Enter Feedback"
                  value={feedback}
                  onChange={(event)=> {setFeedback(event.target.value)}}
                  inputProps={{style: {padding: 12}}}
                />
              </div> 
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input className="form-submit-btn mb-0" type="submit" value="Update" />
              </div> 
            </div>
          </div>
        </form>
      </div>  
 
    );
}
export default UpdateReview;
