import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './AllDoctors.css'
import axios from 'axios'
import {blue} from '@material-ui/core/colors';

function AllDoctors() {

  const [doctors, setDoctors] = useState([])
  const history = useHistory()
  const location = useLocation()

  useEffect(() => { 

    async function getAllDoctors() {
      axios.post(`http://localhost:8070/doctor`).then((res) => {
        setDoctors(res.data)  
      }).catch((error) => {
        alert("Failed to fetch doctors")
      })
    }

    getAllDoctors()
  }, [location])

  function filterContent(data, searchTerm){
    const result = data.filter((doctor) => 
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.speciality.toLowerCase().includes(searchTerm)
    )
    setDoctors(result)
  }

  function handleSearch(event){
    const searchTerm = event.currentTarget.value
    axios.post(`http://localhost:8070/doctor`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch doctors")
    })
  }
  
  function Channel(id){
    history.push(`/pharmacy/item/${id}`)
  }

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                <h2>Channel Your Doctor</h2>
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
                placeholder="Search" 
                onChange={handleSearch} 
                required 
              />
            </div>
          </div>
        </div>
        <div className="doctorGrid" > 
          {doctors.map((Doctor,key)=>( 
              <div key={key}> 
                  <div className="doctorsCard">
                      <div className="doctorsImg">
                          <img  src="/images/avatar.jpg" alt="doctor" className="doctorsImgHeight"/>
                      </div>
                      <div className="p-3">
                          <h6>{Doctor.name}</h6>
                          <h6 style={{color:blue[500]}}>{Doctor.speciality}</h6>
                          <div align="center">
                              <button className="docChannelBtn" style={{backgroundColor:'#2f89fc'}} onClick={()=>Channel(Doctor._id)}> Channel </button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
        </div>
      </div>
    )
}

export default AllDoctors
