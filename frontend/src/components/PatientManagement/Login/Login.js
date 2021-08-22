import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './Login.css';

function Login() {

    const [showPassword, setShowPassword] = useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    //if already a authentication token is available do not need to login again
    useEffect(() => {
        if(localStorage.getItem("patientAuthToken")){
            history.push('/')
        }
    },[history])

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    async function signIn(event){
        event.preventDefault();

        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        try {
            //getting data from backend
            const {data} = await axios.post("http://localhost:8080/patient/signin", {email, password}, config);

            //setting the patient authorization token
            localStorage.setItem("patientAuthToken", `Patient ${data.token}`)
            
            history.push('/')
        } catch (error) {
            if(error.response.status === 404){
                alert("Invalid Email")
            }
            else if(error.response.status === 400){
                alert("Password Incorrect")
            }
            else{
                alert("Authentication Failed")
            }
        }
    }

    const googleSuccess = (res) => {
        console.log(res);
    }

    const googleFailure = () => {
        console.log("do something here");
    }
 

    return (
        <div class="container">
            <div class="cardlogin">
                <form class="box" onSubmit={signIn}>
                    <h1>Patient Login</h1>
                    <p class="text-muted"> All your health needs at one place!</p> 
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="E-mail" 
                        onChange={(event)=> {setEmail(event.target.value)}} 
                        required 
                    />

                    <input
                        type={showPassword ? "password" : "text"} 
                        name="password"
                        id="password" 
                        placeholder="Password" 
                        onChange={(event)=> {setPassword(event.target.value)}} 
                        handleShowPassword={handleShowPassword}  
                        required 
                    />
                    
                    <Link class="forgot" to="/patientforgotpw">Forgot password?</Link> 
                    <input type="submit" value="Sign In" />

                    <p className="text-muted">or</p>

                    <GoogleLogin
                        clientId="googleid"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                        theme="dark"
                    />
                    <br></br><br></br><br></br>
                    <div className="text-muted">
                        <p>Don't have an account? <Link to="/patientsignup">Sign Up</Link></p>
                        <p>Are you a doctor? <Link to="/doctorsignin"> Click here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
