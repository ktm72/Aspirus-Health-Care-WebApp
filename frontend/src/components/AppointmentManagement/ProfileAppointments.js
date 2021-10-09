import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { green } from '@material-ui/core/colors';

function ProfileAppointments() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [appointments, setAppointments] = useState([])
  const [isDoctor, setIsDoctor] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem("doctorAuthToken")) {
      setIsDoctor(true)
    } else {
      setIsDoctor(false)
    }

    async function getAppointments() {
      await axios.get(`http://localhost:8070/appointment/${user._id}`).then((res) => {
        setAppointments(res.data.result)
      }).catch((error) => {
        alert("Failed to fetch the appointment history")
      })
    }
    getAppointments();

  }, [user])

  function appointmentHistory(id) {
    history.push(`/appointment/${id}`)
  }


  function videoConference(id) {
    history.push(`/video/${id}`)
  }


  return (
    <div className="blue-table ">
      <div className="blue-table, box-view-prescription">
        {appointments.length > 0 &&
          <table>
            <thead >
              <tr>
                <th style={{ textAlign: 'center' }}>{isDoctor ? "Name of the Patient" : "Name of the Doctor"}</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Time</th>
                <th style={{ textAlign: 'center' }}>Conference</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {appointments.slice(0, 4).map((Appointment, key) => (
                <tr key={key} >
                  <td onClick={() => appointmentHistory(Appointment.patientID._id)}>
                    {
                      isDoctor ?
                        Appointment.patientID.firstname + " " + Appointment.patientID.lastname
                        :
                        Appointment.doctorID.title + " " + Appointment.doctorID.name
                    }
                  </td>
                  <td onClick={() => appointmentHistory(Appointment.patientID._id)}>
                    {Appointment.date}
                  </td>
                  <td onClick={() => appointmentHistory(Appointment.patientID._id)}>
                    {Appointment.time}
                  </td>
                  <td>
                    <IconButton onClick={() => videoConference(Appointment._id)}>
                      <VideoCameraFrontIcon style={{ color: green[500] }} ></VideoCameraFrontIcon>
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default ProfileAppointments
