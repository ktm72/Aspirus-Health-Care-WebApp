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

function UpdateAppointment(props) {

  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [doctorfee, setDoctorfee] = useState("");
  const [availableDay, setAvailableDay] = useState([]);
  const [availableTimeTo, setAvailableTimeTo] = useState("");
  const [availableTimeFrom, setAvailableTimeFrom] = useState("");
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const history = useHistory()
  
  const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

  useEffect(() => {
    
    async function getAppointmentDetails() {
      axios.get(`http://localhost:8070/appointment/view/${props.match.params.id}`, config).then((res) => {

       console.log(res.data.result) 
       setName(res.data.result.doctorID.name)
       setTitle(res.data.result.doctorID.title)
       setLanguages(res.data.result.doctorID.languages)
       setGender(res.data.result.doctorID.gender)
       setSpeciality(res.data.result.doctorID.speciality)
       setAvailableDay(res.data.result.doctorID.availableDay)
       setAvailableTimeFrom(res.data.result.doctorID.availableTimeFrom)
       setAvailableTimeTo(res.data.result.doctorID.availableTimeTo)
       setImgUrl(res.data.result.doctorID.imgUrl)
       setDoctorfee(res.data.result.doctorID.doctorfee)
       setTime('2021-09-10T' + res.data.result.time + ':00')
       setDate(res.data.result.date + 'T16:10:00')

      }).catch((error) => {
        console.log(error)
        alert("Failed to Fetch Appointment")
      })
    }
    getAppointmentDetails();

  }, [props]);

  async function update(event){
    event.preventDefault()
    const updateApp = {time , date}
    const config = {
      headers: {
        "content-Type": "application/json",
      }
    };

    try {
      await axios.put(`http://localhost:8070/appointment/update/${props.match.params.id}`, updateApp , config);
      alert("Appointment updated successfully")
      history.push(`/Appointment/${user._id}`)
    }catch(error){
      alert("Updating Failed")
    }
  
}  
  
  const handleSelectTimeChange = (time) => {
    setTime(time);
  };

  const handleSelectDateChange = (date) => {
    setDate(date);
  };

 
  return (
    <div className="container" align="center">
      <div className="row">
        <div className="col-1">
        </div>
        <div className="col-11">
          <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
            <h2>Update Appointment</h2>
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

          <form onSubmit={update} className="col-6 mt-5">
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
                  <input className="form-submit-btn mb-0" type="submit" value="Update Appointment" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export default UpdateAppointment
