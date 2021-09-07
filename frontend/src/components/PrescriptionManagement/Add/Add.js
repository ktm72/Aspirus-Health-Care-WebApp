import React,{useState} from "react";
import axios from "axios";
import './css/Add.css';

export default function Add(){

  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [dose, setDose] = useState("");
  const [disp, setDisp] = useState("");
  const [sig, setSig] = useState("");
  const [refill, setRefill] = useState("");
  const [action, setAction] = useState("");

  function sendData(e){
      e.preventDefault();  

      const newPrescription ={
        doctorName,
        doctorID,
        patientName,
        patientID,
        date,
        productTitle,
        dose,
        disp,
        sig,
        refill,
        action
      }
      
      axios.post("http://localhost:8070/prescription/add",newPrescription)
          .then(()=>{
              alert("prescription added")
          }).catch((err)=>{
              alert(err)
          })
  }

  return (
    <div  class ="container">
      <div>
        <h3>Add Prescription</h3>
        <form onSubmit = {sendData}>
        
          <div>
            <label>Doctor ID</label>
            <input type="text" class=" " placeholder="Doctor ID" onChange={(e)=>{
                setDoctorID(e.target.value);
            }}/>
          </div>

          <div>
            <label>Doctor Name</label>
            <input type="text" class=" " placeholder="Doctor Name"  onChange={(e)=>{
                setDoctorName(e.target.value);
            }}/>
          </div>

          <div>
            <label>Patient ID</label>
            <input type="text" class=" " placeholder="Patient ID" onChange={(e)=>{
                setPatientID(e.target.value);
            }} />
          </div>
          
          <div>
            <label>Patient Name</label>
            <input type="text" class=" " placeholder="Patient Name" onChange={(e)=>{
                setPatientName(e.target.value);
            }}/>
          </div>

          <div>
            <label>Date</label>
            <input type="Date" placeholder="Date" onChange={(e)=>{
                setDate(e.target.value);
            }}/>
          </div>

          <div>
            <label>Drug</label>
            <input type="text" placeholder="Drug name" onChange={(e)=>{
                setProductTitle(e.target.value);
            }}/>
          </div>

          <div>
            <label>Dose</label>
            <input type="text" placeholder="Dosage" onChange={(e)=>{
                setDose(e.target.value);
            }}/>
          </div>

          <div>
            <label>Disp</label>
            <input type="text" placeholder="Dispense number" onChange={(e)=>{
                setDisp(e.target.value);
            }}/>
          </div>
          
          <div>
            <label>Sig</label>
            <input type="text" placeholder="Instructions"  onChange={(e)=>{
                setSig(e.target.value);
            }}/>
          </div>

          <div>
            <label>Refill</label>
            <input type="text" placeholder="Number of refills allowed"  onChange={(e)=>{
                setRefill(e.target.value);
            }}/>
          </div>

          <div>
            <label>Action</label>
            <input type="text" placeholder="Issue"  onChange={(e)=>{
                setAction(e.target.value);
            }}/>
          </div>
                   
          <br/><br/>
          <div>
            <button type="submit"  >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

