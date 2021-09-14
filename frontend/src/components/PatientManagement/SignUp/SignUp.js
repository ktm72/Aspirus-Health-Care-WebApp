import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [dob,setDob] = useState();
    const [nic,setNIC] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState();
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false)
    const [previewSource, setPreviewSource] = useState();

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        previewImage(file);
    };

    //display a preview of uploaded image
    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreviewSource(reader.result)
        }
    }

    //add new item
    async function register(event){
        event.preventDefault();

        //header
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        if(password === confirmpassword){
            //this will be needed when handling images
            //object with data need to be added
            // const newPatient = new FormData();
            // newPatient.append("firstname", firstname)
            // newPatient.append("lastname", lastname)
            // newPatient.append("email", email)
            // newPatient.append("phone", phone)
            // newPatient.append("dob", dob)
            // newPatient.append("nic", nic)
            // newPatient.append("address", address)
            // newPatient.append("gender", gender)
            // newPatient.append("password", password)

            const newPatient = {firstname,lastname,email,phone,dob,nic,address,gender,password}

            try {
                await axios.post("http://localhost:8070/patient/signup", newPatient , config)
                    alert("Registration Successful")
                    history.push('/patient/signin')
            } catch (error) {
                if(error.response.status === 409){
                    alert("User with this email address already exists")
                }
                else{
                    alert("User Registration failed")
                } 
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    return (
            <div className="container" align="center">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>
                <div className="card-form">
                    <form onSubmit={register} className="boxSignUp">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput
                                                type="text" id="firstname" placeholder="First Name" 
                                                required fullWidth
                                                onChange={(event)=> {setFirstName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="lastname" placeholder="Last Name" 
                                                required fullWidth
                                                onChange={(event)=> {setLastName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="date" id="dob"
                                                required fullWidth
                                                onChange={(event)=> {setDob(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
                                                required fullWidth
                                                onChange={(event)=> {setEmail(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="phone" placeholder="phone" required fullWidth
                                                onChange={(event)=> {setPhone(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{9}"}}
                                                startAdornment={
                                                    <InputAdornment position="end">
                                                        +94
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="nic" placeholder="NIC" required fullWidth
                                                onChange={(event)=> {setNIC(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="text" id="address" placeholder="Address" required fullWidth
                                                onChange={(event)=> {setAddress(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
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
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="password" name="password" placeholder="Password" required fullWidth
                                                onChange={(event)=> {setPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required fullWidth
                                                onChange={(event)=> {setConfirmPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 mb-4">
                                        {showMessage &&
                                            <div className="PWmessage">
                                                <p>Password must contain lowercase letters, uppercase letters, numbers and should consist minimum of 8 characters</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input id="terms" type="checkbox" required/>
                                            <label for="terms">&nbsp;I agree to the <Link to="/terms">Terms and Conditions</Link>.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                <div>
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
                                            />

                                            <Button color="primary" variant="contained" component="span">
                                                <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                            </Button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="form-submit-btn" type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                        
                        <p>Already have an account? <Link to="/patient/signin">Sign In</Link></p>
                    </form>             
                </div>                   
            </div>
    )
}

export default SignUp
