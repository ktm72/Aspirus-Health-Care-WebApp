import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { blue } from '@material-ui/core/colors';
import './Appointment.css';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';



function AddAppointment(props) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [doctorID, setDoctorID] = useState("");
  const [patientID, setPatientID] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [doctorfee, setDoctorfee] = useState("");
  const [availableDay, setAvailableDay] = useState([]);
  const [availableTimeTo, setAvailableTimeTo] = useState("");
  const [availableTimeFrom, setAvailableTimeFrom] = useState("");
  const [time, setTime] = useState(new Date('2021-09-10T14:20:00'));
  const [date, setDate] = useState(new Date());
  const [imgUrl, setImgUrl] = useState("");
  const history = useHistory()

  const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

  useEffect(() => {
    async function getDoctorDetails() {
      axios.get(`http://localhost:8070/doctor/${props.match.params.id}`, config).then((res) => {
        setDoctorID(res.data._id)
        setPatientID(user._id)
        setName(res.data.name)
        setSpeciality(res.data.speciality)
        setDoctorfee(res.data.doctorfee)
        setImgUrl(res.data.imgUrl)
        setTitle(res.data.title)
        setGender(res.data.gender)
        setLanguages(res.data.languages)
        setAvailableDay(res.data.availableDay)
        setAvailableTimeTo(res.data.availableTimeTo)
        setAvailableTimeFrom(res.data.availableTimeFrom)
      }).catch((error) => {
        console.log(error)
        alert("Failed to Fetch doctor")
      })
    }
    getDoctorDetails();

  }, [props])

  const handleSelectTimeChange = (time) => {
    setTime(time);
  };

  const handleSelectDateChange = (date) => {
    setDate(date);
  };

  function sendData(e) {
    e.preventDefault();
    const newAppointment = {
      doctorID,
      patientID,
      time,
      date,
      doctorfee
    }

    localStorage.setItem("appointment", JSON.stringify(newAppointment))
    history.push(`/patient/appointmentpayment`)

  }

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
              <img src={`${imgUrl}`} className="previewImg" alt="profile pic" />
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
              <h4>{title} {name}</h4>
              <h5 style={{ color: blue[500] }}>{speciality}</h5>
              <p className="mb-0">{gender}</p>
              <p className="mb-0">Languages :  {languages}</p>
              <p>Rs.{doctorfee}.00</p>
              <h6> Available Days and time</h6>
              <p className="mb-0"> {availableDay.map((Day) => (<span> {Day} </span>))}</p>
              <p className="mb-0"> {availableTimeTo} - {availableTimeFrom}</p>

            </div>
          </div>

          <form onSubmit={sendData} className="col-6 mt-5">
            <div className="row">
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group">
                  <OutlinedInput
                    type="text" id="patient" placeholder="Patient Name" readOnly fullWidth
                    value={user.firstname + ' ' + user.lastname}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group">
                  <OutlinedInput
                    type="text" id="doctor" placeholder="Doctor" required readOnly fullWidth
                    value={title + ' ' + name}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4 mx-3">
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label=""
                        inputFormat="dd/MM/yyyy"
                        value={date}
                        required
                        onChange={handleSelectDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker
                        value={time}
                        onChange={handleSelectTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input className="form-submit-btn mb-0" type="submit" value="Add Appointment" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export default AddAppointment
