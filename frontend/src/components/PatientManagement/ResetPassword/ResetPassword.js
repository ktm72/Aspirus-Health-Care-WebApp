import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';
import "./ResetPassword.css";

function ResetPassword(props) {

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
                "Content-Type": "application/json"
            }
        };
        
        if(password === confirmPassword){
            try {
                await axios.put(`http://localhost:8070/patient/resetpassword/${props.match.params.token}`, {password}, config);
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
            <div className="card-form">
                <form className="boxReset" onSubmit={reset}>
                    <h1 className="form-h1">Reset Password</h1>
                    <p className="text-muted"> Enter the new password </p> 

                    <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        id="password" 
                        placeholder="Password" 
                        onChange={(event)=> {setPassword(event.target.value)}} 

                        required 
                    />
                    <span className="showhide">
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
                    <span className="showhide">
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
