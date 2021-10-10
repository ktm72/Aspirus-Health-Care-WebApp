import React, {useEffect, useState} from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import HeartIcon from '@material-ui/icons/FavoriteOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { orange, green, red, blue } from '@material-ui/core/colors';
import axios from 'axios';
import './Profile.css';
import ProfileAppointments from '../../AppointmentManagement/ProfileAppointments';
import ProfilePrescription from '../../PrescriptionManagement/History/ProfilePrescription';

function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const history = useHistory();
    const location = useLocation();

    //getting user data
    useEffect(() => {
        async function fetchUser(){
            await axios.get(`http://localhost:8070/patient/${user._id}`).then((res)=>{
                //setting user
                localStorage.setItem("user", JSON.stringify(res.data.result))

                setUser(JSON.parse(localStorage.getItem('user')))

            }).catch((error)=>{
                alert("Failed to fetch item data")
            })
        }
        fetchUser()
        
    },[user._id,location])

    //redirecting to update page
    function editCardData() {
        history.push(`/patient/updateprofile/${user._id}`)
    }

    //redirecting to generate report page
    function GenerateReport() {
        history.push(`/patient/report`)
    }
    
    //reset password
    async function ResetPassword(){
        let email = user.email
        try {
            await axios.post("http://localhost:8070/patient/forgotpassword", {email});

            alert(`We have sent a password reset link to ${email}`);
        } catch (error) {
            if(error.response.status === 404){
                alert("Please enter the email you use for registering")
            }
            else{
                alert("Something went wrong")
            }
        }
    }

    //delete account
    async function deleteAccount(){
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("patientAuthToken")}`,
            },
        };

        if(window.confirm('Are you sure?\nThis action cannot be undone')){
            await axios.delete(`http://localhost:8070/patient/deleteprofile/${user._id}`, config).then(() => {
                alert("Account deleted successfully")
                localStorage.clear()
                history.push('/patient/signin')
            }).catch((error) => {
                alert(`Failed to delete the Account`)
            })
        }
    }

    //logout
    async function logout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3">
                    <div className="white-card ">
                        <div className="profile_img">
                            {user.imgUrl === ""? 
                                <img src="/images/avatar.jpg" className="rounded-circle" alt="profile pic"/>
                            :
                                <img src={`${user.imgUrl}`} className="rounded-circle" alt="profile pic"/>
                            }
                        </div>
                        <h4>{user.firstname +` `+ user.lastname}</h4>
                        <p>{user.email}</p>
                        <Link className="btn btn-sm btn-primary" to={`/patient/updateprofile/${user._id}`}>Edit Profile</Link>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="white-card-sm ">
                                <div className="d-flex align-items-center justify-content-between">
                                    <p></p>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small"/></IconButton>
                                </div>
                                <div className="card-body">
                                    <h4>{user.bloodGroup}</h4>
                                    <p>Blood Group</p>
                                </div>
                                <HeartIcon className="heart" style={{ color: red[500], fontSize: 60 }}/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="orange-card-sm">
                                <div className="d-flex align-items-center justify-content-between">
                                    <BarChartIcon fontSize="large"/>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                                </div>
                                <div className="card-body">
                                    <h4>{user.bloodPressure + ` mm/Hg`}</h4>
                                    <p>Blood Pressure</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="white-card-sm mb-0">
                                <div className="card-head d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0 text-white">Body Mass Index</h4>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                                </div>
                                <div className="card-body d-flex justify-content-between">
                                    <div>
                                        <center>
                                        <p>Height</p>
                                        <h4>{user.height + ` m`}</h4>
                                        </center>
                                    </div>
                                    <div>
                                        <center>
                                        <p>Weight</p>
                                        <h4>{user.weight + ` kg`}</h4>
                                        </center>
                                    </div>                                       
                                    <div>
                                        <center>
                                        <p>BMI</p>
                                        {
                                            user.bmi >= 24.9 ?
                                                <h4 style={{ color: red[500] }}>{user.bmi}</h4>
                                            : user.bmi >= 18.5 ?
                                                <h4 style={{ color: green[500] }}>{user.bmi}</h4>
                                            : (user.bmi <= 18.5 && user.bmi > 0) &&
                                                <h4 style={{ color: orange[500] }}>{user.bmi}</h4>
                                        }   
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <p></p>
                                <p className="text-muted"><CircleIcon fontSize="small" style={{ color: orange[500] }}/>Underweight</p>
                                <p className="text-muted"><CircleIcon fontSize="small" style={{ color: green[500] }}/>Normal</p>
                                <p className="text-muted"><CircleIcon fontSize="small" style={{ color: red[500] }}/>Overweight</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2">
                    <div className="green-card-sm">
                        <div className="d-flex align-items-center justify-content-between">
                            <BarChartIcon fontSize="large"/>
                            <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                        </div>
                        <div className="card-body">
                            <h4>{user.sugarLevel + ` mg/dL`}</h4>
                            <p>Sugar Level</p>
                        </div>
                    </div>
                    <div className="white-card-sm">
                        <div className="d-flex align-items-center justify-content-between">
                            <BarChartIcon fontSize="large"/>
                        </div>
                        <div className="card-body mt-1">
                            <h5>Age - {user.age}</h5><br/>
                            <h5>Gender- {user.gender}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 px-4">
                    <center>
                        <Button color="primary" variant="contained" className="mb-4 mt-4" fullWidth disableElevation size="large"
                            style={{ backgroundColor: blue[500], color: 'white'}} onClick={logout} endIcon={<ExitToAppIcon/>}>
                            Log Out  
                        </Button>
                        <Button variant="contained" className="mb-4" fullWidth disableElevation size="large" 
                            style={{ backgroundColor: green[400], color: 'white' }} onClick={GenerateReport} endIcon={<CloudDownloadIcon/>}>
                            Generate Report
                        </Button>
                        <Button color="primary" variant="contained" className="mb-4" fullWidth disableElevation size="large"
                            style={{ backgroundColor: blue[500], color: 'white'}} onClick={ResetPassword} endIcon={<LockIcon/>}>
                            Reset Password
                        </Button>
                        <Button color="secondary" variant="contained" fullWidth disableElevation size="large" 
                            onClick={deleteAccount} endIcon={<DeleteIcon/>}>
                            Delete Account
                        </Button>
                    </center>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <ProfileAppointments/>                     
                </div>
                <div className="col-6"> 
                    <ProfilePrescription/>
                </div>
            </div>                                
        </div>
    )
}

export default Profile
