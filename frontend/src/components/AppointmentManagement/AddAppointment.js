import React, {useState} from 'react'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
import './Appointment.css';

function AddAppointment() {
    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>Create Appointment</h2>
                    </div>
                </div>
            </div>
            
            <div className="boxUpdate px-5">
                <div className="row">
                    <div className="col-5 green-card mt-4 p-5">
                        <div>                                
                            {/* <img src="{previewSource}" alt="preview" className="previewImg"/> */}
                            <img src="/images/userimg.jpg" className="previewImg" alt="profile pic"/>                    
                            <div className="form-group">
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="row">                            
                                <h4>Dr.Minindu Senadheera</h4>                                                  
                                <h5 style={{color: blue[500]}}>Dermatologists</h5>                       
                                <p>Rs.5000.00</p>
                        </div>                        
                    </div>

                    <div className="col-6 mt-5">
                        <div className="row">
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text" id="patient" placeholder="Patient Name" readOnly fullWidth                                           
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <OutlinedInput  
                                        type="text" id="doctor" placeholder="Doctor" required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>                           
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <TextField 
                                        id="date"
                                        select
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value="{bloodGroup}"
                                        inputProps={{style: {padding: 12}}}
                                    >
                                        <option>
                                        a
                                        </option>                                        
                                    </TextField>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-submit-btn mb-0" type="submit" value="Update" />
                                </div> 
                            </div>
                        </div>                     
                    </div>                    
                </div>
            </div>                             
        </div>
    )
                            
}

export default AddAppointment
