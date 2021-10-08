import React, { useState,useEffect } from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LanguageIcon from '@material-ui/icons/Language';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green,blue,red,yellow} from '@material-ui/core/colors';
import './DoctorProfile.css';
import ProfileAppointments from '../../AppointmentManagement/ProfileAppointments';

function DoctorProfile() {
    const [doctor,setDoctor] = useState(JSON.parse(localStorage.getItem('user')));
    const history =useHistory();
    const location =useLocation();
    
    useEffect(() => {

         async function fetchUser(){
              await axios.get(`http://localhost:8070/doctor/${doctor._id}`).then((res)=>{
                    localStorage.setItem("user",JSON.stringify(res.data))
                    setDoctor(JSON.parse(localStorage.getItem('user')))
                }).catch((error)=>{
                    alert("Failed to fetch item data")
                    
                })
            }
            fetchUser()
     
    },[doctor._id,location])

        async function deleteDoctor(id){

            const config={
                headers:{
                    "content-Type":"application/json"
                }
            }

            await axios.delete(`http://localhost:8070/doctor/delete/${id}`,config).then(() =>{
                alert("Your Profile has been Deleted")
                localStorage.clear()
                history.push('/doctor/signin')
            }).catch((error)=>{
                alert("Remove Failed!");
            })
        }
    
    const logout = () => {
        localStorage.clear();
        history.push(`/`)
    };
        
     const update =() =>{
         history.push(`/doctor/update/${doctor._id}`)
     }
 
    const report =() =>{
        history.push(`/doctor/report/${doctor._id}`)
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-9">
                    <div className="row doc-card align-items-center">
                        <div className="col-xl-3">
                            <div className="docProfile_img">
                                {doctor.imgUrl === "" ?
                                    <img src="/images/user-img.png" className="rounded-circle" alt="profile pic"/>
                                :
                                    <img src={`${doctor.imgUrl}`}
                                    className="rounded-circle" alt="profile pic"/>
                                }
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <h4>{doctor.title} {doctor.name}</h4>
                            <h5>{doctor.speciality}</h5>
                            <h5>{doctor.qualification}</h5>
                            <h5>{doctor.practicingLocations}</h5>
                        </div>
                        <div className="col-xl-5">
                            <h5><VerifiedUserIcon style={{ color: blue[700] }}/> {doctor.slmcreg}</h5>
                            <h5><LanguageIcon style={{ color: green[800] }}/> {doctor.languages}</h5>
                            <h5><MonetizationOnIcon style={{ color: yellow[700] }}/> LKR. {doctor.doctorfee}</h5>
                            <h5><EventAvailableIcon style={{ color:green[800] }} />{doctor.availableDay.map((Day) => (<span> {Day} </span>))} </h5>
                            <h5><AccessTimeIcon style={{ color:red[800] }}/> From {doctor.availableTimeFrom} to {doctor.availableTimeTo} </h5>
                            
                        </div>              
                    </div>    
                </div>
                <div className="col-xl-3 px-5" align="center">                   
                    <Button
                        className="mb-4 mt-4"
                        variant="contained"
                        color="primary"
                        endIcon={<UpdateIcon />}
                        onClick={update}
                        disableElevation
                        fullWidth
                    >
                        Update Profile
                    </Button>  
                    <br/>                                             
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: green[400], color: 'white'}}
                        disableElevation
                        onClick={report}
                        fullWidth
                    >
                         
                        View Appointments
                    </Button>
                    <br/>
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<DeleteIcon />}
                        fullWidth
                        disableElevation
                        onClick={() => deleteDoctor(doctor._id)}
                        
                    >
                        Delete Profile
                    </Button>  
                        <br/>   
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<ExitToAppIcon />}
                        style={{ backgroundColor: blue[500], color: 'white'}}
                        fullWidth  
                        disableElevation   
                        onClick={logout}
                    >
                        Logout 
                    </Button>                           
                </div>
            </div>    
            <div className="row mt-3">
                <div className="col-6">
                    <ProfileAppointments/>                     
                </div>
                <div className="col-6">                   
                </div>
            </div>            
        </div>
        )
}

export default DoctorProfile
