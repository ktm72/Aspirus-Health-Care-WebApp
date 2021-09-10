import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';
import "./ResetPassword.css";


function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState()
    const history = useHistory();

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    async function reset(event) {
        event.preventDefault();

        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        if(password === confirmPassword){
            try {
                await axios.post("http://localhost:8070/patient/resetpassword",password, config);
                alert("Password Reset Successful")
                setPassword("");
                setConfirmPassword("");
                localStorage.clear()
                history.push('/');
            } catch (error) {
                if(error.response.status === 400){
                    alert("Invalid Token")
                }
                else{
                    alert("Password reset failed")
                }
            }
        }else{
            alert("Passwords don't match");
        }        
        
    }

    return (
        <div className="container" align="center">
            <div class="card-form">
                <form class="boxReset" onSubmit={reset}>
                    <h1 className="form-h1">Reset Password</h1>
                    <p class="text-muted"> Enter the new password </p> 

                    <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        id="password" 
                        placeholder="Password" 
                        onChange={(event)=> {setPassword(event.target.value)}} 

                        required 
                    />
                    <span class="showhide">
                        <IconButton onClick={handleShowPassword} >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </span>

                    <input
                        type={showPassword ? "text" : "password"} 
                        name="confirmpassword"
                        id="confirmpassword" 
                        placeholder="Confirm Password" 
                        onChange={(event)=> {setConfirmPassword(event.target.value)}} 
                        required 
                    />
                    <span class="showhide">
                        <IconButton onClick={handleShowPassword} >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </span>

                    <input className="form-submit-btn" type="submit" value="Reset Password"/>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
