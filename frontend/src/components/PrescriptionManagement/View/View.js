import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {Button} from '@material-ui/core';
import {green, blue} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import './View.css';

function View(props) {

  const [prescription, setPrescription] = useState(JSON.parse(localStorage.getItem('prescription')));
  const history = useHistory()
  const location = useLocation();
  const [isDoctor,setIsDoctor]=useState(false)

  useEffect(() => {
    
    if(localStorage.getItem("doctorAuthToken")){
      setIsDoctor(true)
    }else{
      setIsDoctor(false)
    }

    async function getPrescription() {
      await axios.get(`http://localhost:8070/prescription/view/${props.match.params.id}`).then((res) => {
        localStorage.setItem("prescription", JSON.stringify(res.data.prescription))
        setPrescription(JSON.parse(localStorage.getItem('prescription')))
      }).catch((error) => {
        alert("Failed to get data")
      })
    }
    getPrescription();
  }, [props, location])

  function update(id) {
    history.push(`/prescription/update/${id}`)
  }

  return (
    <div className="container" align='center'>
        <div className="box-single-prescription">
              <div className="row">
                <div className="col-xl-2" align='center'>
                  <img src="/images/Logo.png" width="100px" alt="logo"/>
                </div>
                <div className="col-xl-8" align='center'>
                  <h3>Aspirus Health Care</h3>
                  <h6 >Digitally Generated Prescription</h6>
                </div>
                <div className="col-xl-2">
                  <p>{prescription.date}</p>
                </div>
              </div> 

              <hr/>
            <div className="col-xl-2" align='center'>
              <img src="/images/rx.png" width="70px" alt="rx" />
            </div> <br/>
            <div className="prescription px-4">
              <h6 >Doctor Name :  {prescription.doctorID.title + ' ' + prescription.doctorID.name}</h6>
              <h6 >Patient Name :  {prescription.patientID.firstname + ' ' + prescription.patientID.lastname}</h6>
              <h6> Age : {prescription.patientID.age} </h6>
              <br/>  
              <table align='center'><br/>
                <tr>
                  <th>Name of the drug</th>
                  <th style={{ textAlign: 'center' }}>Dosage</th>
                  <th style={{ textAlign: 'center' }}>Instruction</th>
                  <th style={{ textAlign: 'center' }}>Dispense No.</th>
                </tr>
                <br/>
                {prescription.medicineList.map((medicine) => (
                <tr className="pb-3">
                  <td>{medicine.productTitle}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.dose}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.sig}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.disp}</td>
               
                </tr>
                 ))}
            </table>
            <br/><br/><br/><br/><br/>
            </div>
              <div className="mt-5" align='right'>
              {isDoctor &&
                <Button variant="contained" disableElevation size="large"
                  onClick={() => update(prescription._id)}
                  style={{ backgroundColor: blue[500], color: 'white' }} endIcon={<EditIcon/>}>
                  Update 
                </Button> 
              }&nbsp;
                <Button variant="contained" disableElevation size="large"
                  style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                  Download 
                </Button>
              </div>
        </div>
    </div>  
  )
}

export default View
