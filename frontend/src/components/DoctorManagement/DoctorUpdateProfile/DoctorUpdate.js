import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { OutlinedInput } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InputAdornment from "@material-ui/core/InputAdornment";

import './DoctorUpdate.css';

function DoctorUpdate(props){

    const [name,setName]=useState("");
    const [speciality,setSpeciality] = useState("");
    const [practicingLocations, setLocations] = useState("");
    const [languages, setLanguages] = useState([]);
    const [qualification,setQualification] = useState("");
    const [doctorfee, setFee] = useState("");
    const [availableDay, setDay] = useState([]);
    const [availableTimeFrom, setTimeFrom] = useState(new Date('2021-09-10T14:20:00'));
    const [availableTimeTo, setTimeTo] = useState(new Date('2021-09-10T14:20:00'));
    const [userImg, setUserImg] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const  setSelectedFile = useState();
    const [previewSource, setPreviewSource] = useState();
    const history = useHistory(); 

    const dates =[
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ];

    const language =[
        'Sinhala', 'Tamil', 'English'
    ];


    useEffect(() => {
        async function fetchUser(){
            await axios.get(`http://localhost:8070/doctor/${props.match.params.id}`).then((res)=>{
                setName(res.data.name)
                setSpeciality(res.data.speciality)
                setLocations(res.data.practicingLocations)
                setQualification(res.data.qualification)
                setLanguages(res.data.languages)
                setFee(res.data.doctorfee)
                setDay(res.data.availableDay)
                setTimeFrom('2021-09-10T' + res.data.availableTimeFrom + ':00')
                setTimeTo('2021-09-10T' + res.data.availableTimeTo + ':00')
                setUserImg(res.data.imgUrl)
            }).catch((error) =>{
                alert("Failed to fetch user data")
            })
        } 
        fetchUser()
    },[props]);

    async function update(event){

        event.preventDefault();

        const updatedDoctor = {name, speciality,practicingLocations,qualification, languages, doctorfee, availableDay, availableTimeFrom, availableTimeTo }

        const config ={
            headers:{
                "content-Type":"application/json",
                Authorization : `${localStorage.getItem ("doctorAuthToken")}`,
            }
        };

        try{
            await axios.put(`http://localhost:8070/doctor/update/${props.match.params.id}`,updatedDoctor,config);
            alert("Updated Successfully")
            history.push('/doctor/profile')
        } catch (error){
            if(error.response.status === 401){
                alert("Authentication failed. please sign in again")
                history.push('/doctor/signin')
            } else{
                alert("Updating failed")
            }
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };


    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleChange = (event) => {
        setDay(event.target.value);
      };

    const handleTimeToChange = (timeTo) => {
        setTimeTo(timeTo);
    };
    
    const handleTimeFromChange = (timeFrom) => {
        setTimeFrom(timeFrom);
    };

    const handleLanguageChange = (event) => {
        setLanguages(event.target.value);
    };
    
    return(
        <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Update Profile</h2>
                    </div>
                </div>
            </div>
            <form onSubmit={update} encType="multipart/form-data" className="docUpdate" align="center">
               <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <OutlinedInput 
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                placeholder="Full Name" fullWidth
                                onChange={(e) => setName (e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group"> 
                            <OutlinedInput
                                type="text"
                                name="specialization"
                                id="specialization"
                                value={speciality}
                                placeholder="Specialization" fullWidth
                                onChange={(e) => setSpeciality (e.target.value)}
                                />
                        </div>
                        <br/>
                        <div className="form-group"> 
                            <OutlinedInput
                                type="text"
                                name="location"
                                id="location"
                                placeholder="location" fullWidth
                                value={practicingLocations}
                                onChange={(e) => setLocations(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group"> 
                            <OutlinedInput
                                type="text"
                                name="qualification"
                                id="qualification"
                                placeholder="Qualification" fullWidth
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group" > 
                            <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple fullWidth
                                    value={languages}
                                    onChange={handleLanguageChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                    <div >
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}  />
                                        ))}
                                    </div>
                                    )}
                                    >
                                    {language.map((lan) => (
                                        <MenuItem key={lan} value={lan} >
                                        {lan}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </div>
                        <br/>
                        <div className="form-group"> 
                            <OutlinedInput 
                                type="text"
                                name="fee"
                                id="fee"
                                placeholder="Charge Per Consultation" fullWidth
                                value={doctorfee}
                                onChange={(e) => setFee (e.target.value)}
                                startAdornment={

                                    <InputAdornment position="start">

                                        LKR

                                    </InputAdornment>

                                }
                            />
                        </div>
                        <br/>
                        <div className="form-group" > 
                            <InputLabel id="demo-mutiple-chip-label">Available Day</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple fullWidth
                                    value={availableDay}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                    <div >
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}  />
                                        ))}
                                    </div>
                                    )}
                                    >
                                    {dates.map((date) => (
                                        <MenuItem key={date} value={date} >
                                        {date}
                                        </MenuItem>
                                    ))}
                                </Select>
                        </div>
                        <div className="form-group">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Time From:" fullWidth
                                        value={availableTimeFrom}
                                        onChange={handleTimeFromChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                
                                <div className="form-group">
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker" 
                                        label="Time To:"fullWidth
                                        value={availableTimeTo}
                                        onChange={handleTimeToChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                        }}
                                    />
                                </div>  
                            </MuiPickersUtilsProvider>  
                        </div>
                    </div>   
                    <div className="col-6">
                    <div align="center">
                        { previewSource  ?
                            <img src={previewSource} alt="preview" className="previewImg"/>
                            : userImg === ""? 
                                <img src="/images/avatar.jpg" alt="preview" className="previewImg"/>
                            :
                                <img src={`${userImg}`} className="previewImg" alt="profile pic"/>
                            }
                            <div className="form-group">
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                    </Button>
                                </label>
                                
                            </div>
                        </div>
                    </div>
                </div>
              
                <input type="submit" className="form-submit-btn" value="Update"/> 
        </form>
    </div>
   )
}

export default DoctorUpdate