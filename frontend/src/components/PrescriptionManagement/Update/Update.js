import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Update.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useHistory } from 'react-router';

function Update(props) {

  const [patientID, setPatientID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [dose, setDose] = useState("");
  const [disp, setDisp] = useState("");
  const [sig, setSig] = useState("");
  const [refill, setRefill] = useState("");
  const [action, setAction] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function updatePrescription() {
      await axios.get(`http://localhost:8070/prescription/view/${props.match.params.id}`).then((res) => {

        setPatientID(res.data.prescription.patientID)
        setDoctorName(res.data.prescription.doctorName)
        setPatientName(res.data.prescription.patientName)
        setProductTitle(res.data.prescription.productTitle)
        setDose(res.data.prescription.dose)
        setDisp(res.data.prescription.disp)
        setSig(res.data.prescription.sig)
        setRefill(res.data.prescription.refill)
        setAction(res.data.prescription.action)
      }).catch((error) => {
        alert("Failed to fetch item data")
      })
    }
    updatePrescription()
  }, [props]);

  async function Update(event) {

    event.preventDefault()

    const updateprescription = {
      productTitle,
      dose,
      disp,
      sig,
      refill,
      action
    }

    const config = {
      headers: {
        "content-Type": "application/json",
      }
    };

    try {
      await axios.put(`http://localhost:8070/prescription/update/${props.match.params.id}`, updateprescription, config);
      alert("Prescription Updated Successfully")
      history.push(`/prescription/history/${patientID}`)
    } catch (error) {
      alert("Prescription Updating Failed")
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2>Update Prescription </h2>
          </div>
        </div>
      </div>

      <div >
        <form onSubmit={Update} className="box-add-prescription">
          <div className="row">
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Doctor Name"
                  onChange={(event) => { setDoctorName(event.target.value); }}
                  required fullWidth readOnly
                  value={doctorName}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Patient Name"
                  onChange={(event) => { setPatientName(event.target.value); }}
                  required fullWidth readOnly
                  value={patientName}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Drug name"
                  onChange={(event) => { setProductTitle(event.target.value); }}
                  required fullWidth
                  value={productTitle}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Dosage"
                  onChange={(event) => { setDose(event.target.value); }}
                  required fullWidth
                  value={dose}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Dispense number"
                  onChange={(event) => { setDisp(event.target.value); }}
                  required fullWidth
                  value={disp}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Instructions"
                  onChange={(event) => { setSig(event.target.value); }}
                  required fullWidth
                  value={sig}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="No. of refills"
                  onChange={(event) => { setRefill(event.target.value); }}
                  required fullWidth
                  value={refill}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Issue"
                  onChange={(event) => { setAction(event.target.value); }}
                  required fullWidth
                  value={action}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <br/><br />
            <div>
              <input type="submit" value="Update" className="form-submit-btn" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update
