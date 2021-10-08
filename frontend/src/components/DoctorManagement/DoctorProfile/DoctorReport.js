import React,{useRef} from 'react';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';
import  {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { green} from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
import './DoctorProfile.css'
import { useLocation } from 'react-router-dom';


function DoctorReport(props){

    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    
 
    useEffect(() => {        
       
        async function getAppointments(){
            await axios.get(`http://localhost:8070/Appointment/${props.match.params.id}`).then ((res) => {
                setAppointments(res.data.result)
                
            }).catch((error) => {
                alert("Failed to fetch the appointment")
            })
        }
        getAppointments();
    }, [props])

    

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    console.log(appointments)
    return(
        
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container" align='center'>
                            <div ref={componentRef} >
                                <div className="box-doc-report">
                                    <div className="row">
                                        <div className="col-xl-2" align='center'>
                                            <img src="/images/Logo.png" width="100px" alt="logo" />
                                        </div>
                                        <div className="col-xl-8" align='center'>
                                            <h3>Aspirus Health Care</h3>
                                            <h6 >Digitally Generated Report</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="prescription px-4">
                                        <h5 >Doctor Name : {user.title} {user.name}  </h5>
                                        <h6> Specialization : {user.speciality} </h6>
                                        <h6 >SLMC No. : {user.slmcreg}  </h6>
                                        
                                        <br />
                                        <div className="col-4">
                                            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                                                <h2>Appointments</h2>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                        </div>
                                    </div>
                                    <div className="blue-table ">
                                        <div className="blue-table, box-view-prescription">
                                            <table>
                                                <thead >
                                                    <tr>
                                                        <th style={{ textAlign: 'center' }}>Name of the Patient </th>
                                                        <th style={{ textAlign: 'center' }}>Date</th>
                                                        <th style={{ textAlign: 'center' }}>Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                        {appointments.map((Appointment,key) => (
                                                    <tr key={key}>
                                                        <td onClick={() => DoctorReport(Appointment.patientID._id)}>
                                                           {
                                                                Appointment.patientID.firstname + " " + Appointment.patientID.lastname
                                                                
                                                           }  
                        
                                                        </td>
                                                        <td>
                                                            {Appointment.date}
                                                        </td>
                                                        <td>
                                                            {Appointment.time}
                                                        </td>
                                                    </tr> 
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <br /><br /><br /><br /><br />
                                    </div>
                                    <div className="mt-5" align='right'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="w-25 p-3" align='right'> 
                            <div >                                
                                <Button
                                className="float-right"
                                variant="contained"
                                color="secondary"
                                endIcon={<GetAppIcon />}
                                style={{ backgroundColor: green[400], color: 'white'}}
                                disableElevation
                                onClick={handlePrint}
                                fullWidth
                                >
                                Download Details 
                            </Button>
                        </div>
                    </div>
                </div>
            </div>  
    )
}

export default DoctorReport;
