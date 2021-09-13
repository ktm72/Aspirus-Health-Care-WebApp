import React, {useState} from 'react';
import axios from 'axios';
import "./ForgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");


    async function sendEmail(event){
        event.preventDefault();

        try {
            await axios.post("http://localhost:8070/patient/forgotpassword", {email});

            alert("Check Your Mailbox");
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
        <div className="container" align="center">
            <div className="card-form">
                <form className="boxForgot" onSubmit={sendEmail}>
                    <h1 className="form-h1">Forgot Password</h1>
                    <p className="text-muted"> Enter your registered email</p> 
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="E-mail" 
                        onChange={(event)=> {setEmail(event.target.value)}} 
                        required 
                    />

                    <input className="form-submit-btn" type="submit" value="Send Email"/>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
