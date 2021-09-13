import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './DoctorLogin.css';

function DoctorLogin() {
    
    const [slmcreg,setSlmc] = useState("");
    const [password, setPassword] = useState("");
    const history  = useHistory();
      
    //if the authentication is already available do not need to login again

    async function signIn(event){
        event.preventDefault();

        const config = {
            headers: {
                "const-Type": "application/json"
            }
        };
        try {
            
            //getting data from backend
            const {data} = await axios.post("http://localhost:8070/doctor/signin", {slmcreg, password}, config);

            //setting the patient authorization token
            localStorage.setItem("doctorAuthToken", `Doctor ${data.token}`)
            localStorage.setItem("user",JSON.stringify(data.result))
        
            history.push('/')
        } catch (error) {
            if(error.response.status === 404){
                alert("Invalid SLMC Number")
            }
            else if(error.response.status === 400){
                alert("Password Incorrect")
            }
            else{
                alert("Authentication Failed")
            }
        }
    }

    return (
       
     <div className="container" align="center">
        <form className="docLogin" onSubmit={signIn}>
            <h2>Doctor login</h2>
            <br></br>
            <input
                type="text"
                name="slmc"
                id="slmc"
                placeholder="SLMC registration number"
                onChange={(event) => {setSlmc(event.target.value)}}
                required
            />

            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(event) => {setPassword(event.target.value)}} 
                required 
             />
              
             <input type="submit" value="Sign In" className="form-submit-btn"/>
                
            <div className="text-muted">
             <p >or</p>
             <p> Don't have an Account? <Link to="/doctor/signup"> Click Here</Link></p>
             <p> Are you a patient?<Link to="/patient/signin"> Click Here</Link></p>
            </div>
        </form>
    </div>
      
    )
}

export default DoctorLogin;