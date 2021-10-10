import React,{useState} from "react";
import { useHistory} from 'react-router-dom';
import { OutlinedInput } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DateFnsUtils from '@date-io/date-fns';
import './DoctorSignUp.css';
import axios from "axios";


function DoctorSignUp(){

    
    const [password, setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [title,setTitle]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [speciality,setSpeciality]=useState("");
    const [gender,setGender]=useState("");
    const [languages,setLanguages]=useState([]);
    const [phoneno,setPhone]=useState("");
    const [qualification,setQualification]=useState("");
    const [doctorfee,setFee] =useState("");
    const [availableDay,setDay] = useState([]);
    const [availableTimeFrom,setTimeFrom] = useState(new Date('2021-09-10T14:20:00'));
    const [availableTimeTo,setTimeTo] = useState(new Date('2021-09-10T14:20:00'));
    const [slmcreg,setSlmc] = useState("");
    const [practicingLocations,setLocation] = useState("");
    const [nameOfAccountHolder,setHolder] = useState("");
    const [accountNo,setAccount] = useState("");
    const [bankName,setBank] = useState("");
    const [bankBranch,setbranch] = useState("");
    const [previewSource, setPreviewSource] = useState();
    const history =useHistory();

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

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

    
    async function add(event){
        event.preventDefault();
        const config={
             headers:{
                "content-Type":"application/json"
            }
        };

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "doctor_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/aspirushealthcare/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

      

        if(password===confirmPassword){
            const newDoctor= {title, name, email, speciality, gender, languages, phoneno, qualification, doctorfee, availableDay, availableTimeTo, availableTimeFrom, slmcreg, practicingLocations, password, nameOfAccountHolder, accountNo, bankName, bankBranch,imgUrl }
            
            try{
            
                await axios.post("http://localhost:8070/doctor/signup",newDoctor,config);
                alert("doctor added successfully")
                history.push(`/doctor/signin`)
            } catch(error){
                alert("Register failed!");
                
            }
        }else{
            alert("Password mismatch!");
        }
       
    }

   
    const dates =[
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ]

    const language = [
        'Sinhala', 'English', 'Tamil'
    ]

    

    //handling the image uploading
    

    const handleLanguageChange = (event) => {
        setLanguages(event.target.value);
    };

    const handleChange = (event) => {
        setDay(event.target.value);
      };

    const handleTimeToChange = (timeTo) => {
        setTimeTo(timeTo);
      };
    
    const handleTimeFromChange = (timeFrom) => {
        setTimeFrom(timeFrom);
      };

 
 
    return(   
        <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Sign Up</h2>
                    </div>
                </div>
            </div>
            <form  onSubmit={add} className="docSignUp" >
                <div className="row"> 
                    
                    <div className="col-8">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <label>Title</label> &nbsp;
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="dr" value="Dr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="dr">Dr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="mr" value="Mr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Mr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="ms" value="Ms." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="prof">Ms.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="prof" value="Prof." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Prof.</label>
                                </div>
                            </div>

                            <br/>
                    
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="fullname"
                            id="fullname"
                            placeholder="Full Name"
                            onChange={(e) => setName (e.target.value)}
                            required fullWidth
                            inputProps={{style: {padding: 12}}}
                         />
                    </div>
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail" 
                            onChange={(e) => setEmail(e.target.value)}
                            required fullWidth
                            inputProps={{style: {padding: 12} } }
                        />
                    </div>
                
                            <br/>
                                      
                            <div className="col-xl-12 form-group mb-3">
                        <label>Gender</label> &nbsp;
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" type="radio" name="gender" id="male" value="Male" required
                                onChange={(event)=> {setGender(event.target.value)}}
                            />
                            <label className="form-check-label" for="male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" type="radio" name="gender" id="female" value="Female" required
                                onChange={(event)=> {setGender(event.target.value)}}
                            />
                            <label className="form-check-label" for="female">Female</label>
                        </div>
                    </div>
                        
                            <br/>
                   
                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="text"
                                    name="speciality"
                                    id="speciality"
                                    placeholder="Speciality"
                                    onChange={(e) => setSpeciality(e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12}}}
                                />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
                                    <Select
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                        value={languages}
                                        onChange={handleLanguageChange}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}  />
                                                ))}
                                            </div>
                                        )}
                                    >
                                    {language.map((language) => (
                                        <MenuItem key={language} value={language} >
                                            {language}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </div>

                            <br/>
                
                            <div className="col-xl-6 mb-3">
                    <OutlinedInput
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        required fullWidth
                        maxLength="10"
                        inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                    />
                </div>
                            <div className="col-xl-6 mb-3">
                    <OutlinedInput
                        type="text"
                        name="qualification"
                        id="qualification"
                        placeholder="Qualification"
                        onChange={(e) => setQualification(e.target.value)}
                        required fullWidth
                        inputProps={{style: {padding: 12}}}
                    />
                </div>
           
                            <br/>
                
                            <div className="col-xl-6 mb-3">  
                                <OutlinedInput
                                    type="text"
                                    name="fee"
                                    id="fee"
                                    placeholder="Consultation Fee"
                                    onChange={(e) => setFee(e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12}}}
                                    startAdornment={

                                        <InputAdornment position="start">

                                            LKR

                                        </InputAdornment>

                                    }
                                />
                            </div>
            
                            <br/>
                
                            <div className="col-xl-12 mb-3">
                        <InputLabel id="demo-mutiple-chip-label">Available Day</InputLabel>
                            <Select
                                id="demo-mutiple-chip"
                                multiple fullWidth
                                value={availableDay}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip"/>}
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
                  
                            <br/>
   
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <div className="col-xl-6 mb-3">
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Time From"
                                        value={availableTimeFrom}
                                        onChange={handleTimeFromChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </div>                       
                                <div className="col-xl-6 mb-3">
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Time To"
                                        value={availableTimeTo}
                                        onChange={handleTimeToChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                        }}
                                    />
                                </div>    
                            </MuiPickersUtilsProvider>  
                            <br/>
                
                            <div className="col-xl-6 mb-3">  
                                <OutlinedInput
                                    type="text"
                                    name="slmcreg"
                                    id="slmcreg"
                                    placeholder="SLMC registration Number"
                                    onChange={(e) => setSlmc(e.target.value)}
                                    required fullWidth
                                    maxLength="5"
                                    inputProps={{style: {padding: 12},  pattern: "[0-9]{4,5}"}}
                                />
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group"> 
                                    <OutlinedInput
                                        type="text"
                                        name="location"
                                        id="location"
                                        placeholder="Practicing Locations"
                                        onChange={(e) => setLocation(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                    
                            <br/>
                
                            <div className="col-xl-6 mb-3">  
                                <div  className="form-group">
                                    <OutlinedInput
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        value={password}
                                        id="password"
                                        placeholder="Password"
                                        inputProps={{style: {padding: 12}}}
                                        required fullWidth
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        value={confirmPassword}
                                        type="password"
                                        name="con-password"
                                        id="con-password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="confirm Password"
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                    
                            <br/>
                
                            <div className="col-xl-12 mb-3">
                                <h4> Bank Account Details </h4>
                            </div>
                
                            <br/>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text"
                                        name="acc-holder"
                                        id="acc-holder"
                                        placeholder="Name Of the Account Holder"
                                        onChange={(e) => setHolder(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text"
                                        name="acc-no"
                                        id="acc-no"
                                        placeholder="Account Number"
                                        onChange={(e) => setAccount(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}, pattern: "[0-9]{6,18}"}}
                                    />
                                </div>
                            </div>
               
                            <br/>
                
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text"
                                        name="bank-name"
                                        id="bank-name"
                                        placeholder="Name of the Bank"
                                        onChange={(e) => setBank(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 mb-3">
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text"
                                        name="branch"
                                        id="branch"
                                        placeholder="Bank Branch"
                                        onChange={(e) => setbranch(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">

                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImg"/>
                            :
                                <img src="/images/avatar.jpg" className="previewImg" alt="profile pic"/>
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
                    <div className="col-xl-12">
                        <input type="submit" className="form-submit-btn" value="Register"  /> 
                    </div>
               </div> 
            </form>
        </div>

    );
}; 
export default DoctorSignUp;