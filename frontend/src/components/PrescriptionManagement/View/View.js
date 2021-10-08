import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useReactToPrint } from "react-to-print";
import './View.css';

function View(props) {

  const history = useHistory()
  const location = useLocation();
  const [date, setDate] = useState()
  const [title, setTitle] = useState()
  const [name, setName] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [age, setAge] = useState()
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    async function getPrescription() {
      await axios.get(`http://localhost:8070/prescription/view/${props.match.params.id}`, config).then((res) => {

        setDate(res.data.prescription.date)
        setTitle(res.data.prescription.doctorID.title)
        setName(res.data.prescription.doctorID.name)
        setFirstname(res.data.prescription.patientID.firstname)
        setLastname(res.data.prescription.patientID.lastname)
        setAge(res.data.prescription.patientID.age)
        setMedicineList(res.data.prescription.medicineList)
      }).catch((error) => {
        alert("Failed to get data")
      })
    }
    getPrescription();
  }, [props, location])

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container" align='center'>
      <div className="box-single-prescription" >
        <div className="printprescription" ref={componentRef}>
          <div className="row">
            <div className="col-xl-2" align='center'>
              <img src="/images/Logo.png" width="100px" alt="logo" />
            </div>
            <div className="col-xl-8" align='center'>
              <h3>Aspirus Health Care</h3>
              <h6 >Digitally Generated Prescription</h6>
            </div>
            <div className="col-xl-2" align='right'>
              <p>{date}</p>
            </div>
          </div>
          <hr />
          <div className="col-xl-2" align='left'>
            <img src="/images/rx.png" width="70px" alt="rx" />
          </div> <br />
          <div className="prescription px-4" >
            <h6 >Doctor Name :  {title + ' ' + name}</h6>
            <h6 >Patient Name :  {firstname + ' ' + lastname}</h6>
            <h6> Age : {age} </h6>
            <br />
            <table align='center'><br />
              <tr>
                <th>Name of the drug</th>
                <th style={{ textAlign: 'center' }}>Dosage</th>
                <th style={{ textAlign: 'center' }}>Instruction</th>
                <th style={{ textAlign: 'center' }}>Dispense No.</th>
              </tr>
              <br />
              {medicineList.map((medicine) => (
                <tr className="pb-3">
                  <td>{medicine.productTitle}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.dose}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.sig}</td>
                  <td style={{ textAlign: 'center' }}>{medicine.disp}</td>

                </tr>
              ))}
            </table>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/>
            <p align='center'>*This is electronically generated document and do not require any signature</p>
          </div>
        </div>
      </div>
      <div className="btn_prescription" align='right'>
        <Button variant="contained" disableElevation size="large"
          style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon />} onClick={handlePrint}>
          Download
        </Button>
      </div>
    </div>
  )
}

export default View
