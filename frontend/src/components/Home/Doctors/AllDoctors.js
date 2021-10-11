import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './AllDoctors.css'
import axios from 'axios'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {blue} from '@material-ui/core/colors';

function AllDoctors() {

  const [doctors, setDoctors] = useState([])
  const history = useHistory()
  const location = useLocation()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
    history.push(`/patient/appointment/${id}`)
  }

    return (
      <div>
        <div className="row">
          <div className="col-4" >
            <div align="center">
                <h1>Meet Our Specialists</h1>
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
        <Carousel wipeable={true}  responsive={responsive} autoPlay={true} autoPlaySpeed={2000} infinite={true} className="px-5 py-5 mb-2"> 
          {doctors.map((Doctor,key)=>( 
              <div key={key}> 
                  <div className="doctorsCard">
                      <div className="doctorsImg">
                        {Doctor.imgUrl === ""? 
                          <img src="/images/avatar.jpg" className="doctorsImgHeight" alt="doctor"/>
                        :
                          <img src={`${Doctor.imgUrl}`} className="doctorsImgHeight" alt="doctor"/>
                        }
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
        </Carousel>
      </div>
    )
}

export default AllDoctors
