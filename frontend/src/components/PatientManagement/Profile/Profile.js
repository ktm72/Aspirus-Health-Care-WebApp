import React, {useEffect, useState} from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import HeartIcon from '@material-ui/icons/FavoriteOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import { orange, green, red } from '@material-ui/core/colors';
import axios from 'axios';
import './Profile.css';

function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        function fetchUser(){
            axios.get(`http://localhost:8070/patient/${user._id}`).then((res)=>{
                //setting user
                localStorage.setItem("user", JSON.stringify(res.data.result))

                setUser(JSON.parse(localStorage.getItem('user')))

            }).catch((error)=>{
                alert("Failed to fetch item data")
                console.log(error)
            })
        }
        fetchUser()
        
    },[user._id,location])

    function editCardData() {
        history.push(`/patient/updateprofile/${user._id}`)
    }

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

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3">
                    <div className="white-card ">
                        <div class="profile_img">
                            <img src="/images/userimg.jpg" class="rounded-circle" alt="profile pic"/>
                        </div>
                        <h4>{user.firstname +` `+ user.lastname}</h4>
                        <p>{user.email}</p>
                        <Link class="btn btn-sm btn-primary" to={`/patient/updateprofile/${user._id}`}>Edit Profile</Link>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="white-card-sm ">
                                <div class="d-flex align-items-center justify-content-between">
                                    <p></p>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small"/></IconButton>
                                </div>
                                <div class="card-body">
                                    <h4>{user.bloodGroup}</h4>
                                    <p>Blood Group</p>
                                </div>
                                <HeartIcon className="heart" style={{ color: red[500], fontSize: 60 }}/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="orange-card-sm">
                                <div class="d-flex align-items-center justify-content-between">
                                    <BarChartIcon fontSize="large"/>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                                </div>
                                <div class="card-body">
                                    <h4>{user.bloodPressure + ` mm/Hg`}</h4>
                                    <p>Blood Pressure</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="white-card-sm mb-0">
                                <div class="card-head d-flex align-items-center justify-content-between">
                                    <h4 class="mb-0 text-white">Body Mass Index</h4>
                                    <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                                </div>
                                <div class="card-body d-flex justify-content-between">
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
                                        <h4>
                                            {
                                                user.bmi >= 24.9 ?
                                                    <CircleIcon fontSize="small" style={{ color: red[500] }} />
                                                : user.bmi >= 18.5 ?
                                                    <CircleIcon fontSize="small" style={{ color: green[500] }} />
                                                : (user.bmi <= 18.5 && user.bmi > 0) &&
                                                    <CircleIcon fontSize="small" style={{ color: orange[500] }} />
                                            }
                                            {user.bmi}
                                        </h4>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
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
                    <div class="green-card-sm">
                        <div class="d-flex align-items-center justify-content-between">
                            <BarChartIcon fontSize="large"/>
                            <IconButton onClick={editCardData}><EditIcon fontSize="small" style={{ color: 'white'}}/></IconButton>
                        </div>
                        <div class="card-body">
                            <h4>{user.sugarLevel + ` mg/dL`}</h4>
                            <p>Sugar Level</p>
                        </div>
                    </div>
                    <div class="white-card-sm">
                        <div class="d-flex align-items-center justify-content-between">
                            <BarChartIcon fontSize="large"/>
                        </div>
                        <div class="card-body mt-1">
                            <h4>Age - {user.age}</h4><br></br>
                            <h5>Gender - {user.gender}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2">
                    <center>
                        <button class="btn btn-primary mb-3">Upload Report <CloudUploadIcon/> </button>
                        <button class="btn btn-primary mb-3" onClick={ResetPassword}>Reset Password <LockIcon/> </button>
                        <button class="btn btn-danger mb-3">Delete Account <DeleteIcon/> </button>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default Profile
