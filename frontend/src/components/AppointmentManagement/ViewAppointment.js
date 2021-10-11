import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

function ViewAppointment(props) {

    const [appointments, setAppointments] = useState([]);
    const [isDoctor,setIsDoctor]=useState(false)
    const history = useHistory()
 
    useEffect(() => {        
        if(localStorage.getItem("doctorAuthToken")){
            setIsDoctor(true)
          }else{
            setIsDoctor(false)
          }
        async function getAppointments(){
            await axios.get(`http://localhost:8070/appointment/${props.match.params.id}`).then ((res) => {
                setAppointments(res.data.result)
            }).catch((error) => {
                alert("Failed to fetch the appointment")
            })
        }
        getAppointments();
    }, [props])

    async function onDelete(id) {
        const config = {
          headers: {
            "content-Type": "application/json"
          }
        };

        await axios.delete(`http://localhost:8070/appointment/delete/${id}`, config).then(() => {
        alert("Appointment deleted successfully")
        setAppointments(appointments.filter(element => element._id !== id))
        }).catch((error) => {
        alert(`Failed to delete the appointment`)
        })
    }

    function filterContent (data,searchTerm){
        const result = data.filter((Appointment) =>
            Appointment.date.toLowerCase().includes(searchTerm) ||
            Appointment.patientID.firstname.toLowerCase().includes(searchTerm) ||
            Appointment.patientID.lastname.toLowerCase().includes(searchTerm) ||
            Appointment.time.toLowerCase().includes(searchTerm)
        )
    setAppointments(result)
    }

    function handleSearch(event){
        const searchTerm=event.currentTarget.value
        axios.get(`http://localhost:8070/appointment/${props.match.params.id}`).then((res)=>{
            filterContent(res.data.result,searchTerm.toLowerCase())
        }).catch((error)=>{
            alert("Appointments fetching failed")
        })
    }

    function update(id) {
        history.push(`/appointment/update/${id}`)
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
                                <th style={{ textAlign: 'center' }}>Status</th>
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
                                <td>
                                    <div>
                                    <IconButton onClick={() => onDelete(Appointment._id)}>
                                        <DeleteIcon style={{ color: red[500] }} ></DeleteIcon>
                                    </IconButton>
                                    { isDoctor ? "" : 
                                        <IconButton onClick={() => update(Appointment._id)}>
                                        <EditIcon style={{ color: grey[500] }} ></EditIcon>
                                        </IconButton>
                                    }
                                    </div>
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
