import React,{useRef, useState, useEffect} from 'react';
import { useReactToPrint } from "react-to-print";
import { orange, green, red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from 'axios';
import './PatientReport.css';

function PatientReport() {  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [appointments, setAppointments] = useState([])
    const componentRef = useRef();

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    useEffect(() => { 
        async function getAppointments() {
          await axios.get(`http://localhost:8070/appointment/${user._id}`).then((res) => {
            setAppointments(res.data.result)
          }).catch((error) => {
            alert("Failed to fetch the appointment history")
          })
        }
        getAppointments();
  
    }, [user])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div class="container">
            <div className="box-report">
                <div id="report" ref={componentRef}>
                    <table style={{ width: '90%' }} align="center">
                        <tr>
                            <td align='left'>
                                <img src="/images/Logo.png" width="100px" alt="logo" />
                            </td>
                            <td align='center'>
                                <h3>Aspirus Health Care</h3>
                                <h6>Patient Health Report</h6>
                            </td>
                            <td align='right'>
                                <p>{date}/{month}/{year}</p>
                            </td>
                        </tr>
                    </table>
                    <hr/>
                    <div className="prescription px-4">
                        <table style={{ width: '100%' }}>
                            <tbody>
                            <tr>
                                <td>
                                    <p> Patient Name : {user.firstname + " " + user.lastname}</p>
                                    <p> Gender : {user.gender} </p>
                                    <p> Age : {user.age} </p>
                                </td>
                                <td align="right">
                                    <p> {user.phone} </p>
                                    <p> {user.email} </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <hr></hr>
                        <table className="my-4 mx-5">
                            <tbody>
                                <tr>
                                    <td><h5>Blood Group</h5></td>
                                    <td>
                                        <h5>{user.bloodGroup}</h5>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>Blood Pressure</h5></td>
                                    <td>
                                        <div>
                                            <h5 style={{ display: 'inline' }}>{user.bloodPressure}</h5><p style={{ display: 'inline' }}> mmHg</p>
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>Sugar Level</h5></td>
                                    <td>
                                        <div className="mb-2">
                                            <h5 style={{ display: 'inline' }}>{user.sugarLevel}</h5><p style={{ display: 'inline' }}> mg/dL</p>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>&nbsp;</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>Height</h5></td>
                                    <td>
                                        <div className="mb-2">
                                            <h5 style={{ display: 'inline' }}>{user.height}</h5><p style={{ display: 'inline' }}> m</p>
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>Weight</h5></td>
                                    <td>
                                        <div className="mb-2">
                                            <h5 style={{ display: 'inline' }}>{user.weight}</h5><p style={{ display: 'inline' }}> kg</p>
                                        </div>
                                    </td>
                                    <td><h5>&nbsp;</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>Body Mass Index</h5></td>
                                    <td><h5>{user.bmi}</h5></td>
                                    <td>
                                        {
                                            user.bmi >= 24.9 ? 
                                                <h5 style={{ color: red[500] }}>Overweight</h5> 
                                            : user.bmi >= 18.5 ? 
                                                <h5 style={{ color: green[500] }}>Normal</h5> 
                                            : (user.bmi <= 18.5 && user.bmi > 0) && 
                                                <h5 style={{ color: orange[500] }}>Underweight</h5> 
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr></hr>

                        <h4>Recent Appointments </h4>
                        <br/>
                        <div className="blue-table">
                            <div className="blue-table, box-view-prescription">
                                <table>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Name of the Doctor</th>
                                        <th style={{ textAlign: 'center' }}>Date of Appointment</th>
                                        <th style={{ textAlign: 'center' }}>Time of Appointment</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                    {appointments.slice(0,4).map((Appointment, key) => (
                                    <tr key={key} >
                                        <td>{Appointment.doctorID.title + " " + Appointment.doctorID.name}</td>
                                        <td>{Appointment.date}</td>
                                        <td>{Appointment.time}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div align="center">
                <Button variant="contained" className="mb-4" disableElevation size="large" onClick={handlePrint}
                    style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                    Download Report
                </Button>
            </div>
        </div>
    )
}
export default PatientReport