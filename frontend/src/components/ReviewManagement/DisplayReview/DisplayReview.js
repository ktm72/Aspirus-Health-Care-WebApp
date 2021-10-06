import React, {useState,useEffect} from 'react';
import axios from "axios";
import './DisplayReview.css';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';
import { red } from '@material-ui/core/colors';

export default function DisplayReview(props){

    const config = {
        headers: { 
            "content-Type": "application/json"
        }
    };    

    const [reviews,setReviews]=useState([])
    const history=useHistory()
    useEffect(()=> {
        function getReviews(){

            axios.get(`http://localhost:8070/Review/${props.match.params.patientID}`).then((res)=>{
                setReviews(res.data.result);
            }).catch((error)=>{
                alert("fetching failed");
            })    

            }
        getReviews();
    },[props])

    function filterContent(data,searchTerm){
        const result=data.filter((Review)=>
            Review.date.toLowerCase().includes(searchTerm)||
            Review.feedback.toLowerCase().includes(searchTerm)
        )
    setReviews(result)
    }

    function handleSearch(event){
        const searchTerm=event.currentTarget.value
        axios.get(`http://localhost:8070/Review/${props.match.params.patientID}`).then((res)=>{
            filterContent(res.data.result,searchTerm.toLowerCase())

        }).catch((error)=>{
            alert("Reviews fetching failing")
        })
    }

    async function deleteReview(id){
        await axios.delete(`http://localhost:8070/review/delete/${id}`,config).then(()=>{
            setReviews( reviews.filter(element => element._id !== id))
        }).catch((error)=>{
            alert("deleting review failed");
        })    
    }

    function update(id){
        history.push(`/patient/review/update/${id}`)
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Review History</h2>
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
                            placeholder="Search reviews"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            
            <div className="blue-table">
                <table className="table100 ver1 m-b-110">
                    <thead>                    
                        <tr>
                        <th> Patient Name</th>
                        <th>Feedback</th>
                        <th> Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((Review, key) => (
                    <tr key={key}>
                        <td>
                            {Review.patientID.firstname+ ' ' +Review.patientID.lastname}
                        </td> 
                        <td>
                            {Review.feedback}
                        </td>  
                        <td>
                            {Review.date}
                        </td>
                        <td>  
                            <div style={{verticalAlign:'middle'}}> 
                                <IconButton className="mx-4" onClick={()=>  update(Review._id)}>
                                    <EditIcon />
                                </IconButton>                                  
                                <IconButton  onClick={()=>  deleteReview(Review._id)}>
                                    <DeleteIcon fontSize="large" style={{color:red[500]}} />
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
