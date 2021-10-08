import React, {useEffect, useState} from 'react';

import axios from 'axios';


function ViewAppointment(props) {

    const [appointments, setAppointments] = useState([]);
    const [isDoctor,setIsDoctor]=useState(false)
 
    useEffect(() => {        
        if(localStorage.getItem("doctorAuthToken")){
            setIsDoctor(true)
          }else{
            setIsDoctor(false)
          }
        async function getAppointments(){
            await axios.get(`http://localhost:8070/Appointment/${props.match.params.id}`).then ((res) => {
                setAppointments(res.data.result)
            }).catch((error) => {
                alert("Failed to fetch the appointment")
            })
        }
        getAppointments();
    }, [props])

    function filterContent (data,searchTerm){
        const result = data.filter((Appointment) =>
            // Appointment.date.toLowerCae().includes(searchTerm) ||
            Appointment.patientID.firstname.toLowerCase().includes(searchTerm) ||
             Appointment.patientID.lastname.toLowerCase().includes(searchTerm) 
            // Appointment.time.toLowerCae().includes(searchTerm)
        )
    setAppointments(result)
    }

    function handleSearch(event){
        const searchTerm=event.currentTarget.value
        axios.get(`http://localhost:8070/Appointment/${props.match.params.id}`).then((res)=>{
            filterContent(res.data.result,searchTerm.toLowerCase())
        }).catch((error)=>{
            alert("Appointments fetching failed")
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Appointments</h2>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-5">
                    <div className="px-3 search" align="center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search appointments"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="blue-table ">
                <div className="blue-table, box-view-prescription">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>{isDoctor ? "Patient Name" : "Name of the Doctor" }</th>
                                
                                <th style={{ textAlign: 'center' }}>Date</th>
                                <th style={{ textAlign: 'center' }}>Time</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {appointments.map((Appointment,key) => (
                            <tr key={key}>
                            
                                <td>
                                    { isDoctor ?
                                        Appointment.patientID.firstname + " " + Appointment.patientID.lastname
                                        :
                                        Appointment.doctorID.title + " " + Appointment.doctorID.name
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
            </div>
        </div>
    )
}

export default ViewAppointment
