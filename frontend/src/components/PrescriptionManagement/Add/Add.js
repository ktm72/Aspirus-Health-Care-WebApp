import React, { useState } from "react";
import axios from "axios";
import './Add.css';
import { OutlinedInput } from '@material-ui/core';

export default function Add() {

  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [dose, setDose] = useState("");
  const [disp, setDisp] = useState("");
  const [sig, setSig] = useState("");
  const [refill, setRefill] = useState("");
  const [action, setAction] = useState("");

  function sendData(e) {

    e.preventDefault();

    const newPrescription = {
      doctorName,
      doctorID,
      patientName,
      patientID,
      productTitle,
      dose,
      disp,
      sig,
      refill,
      action
    }

    axios.post("http://localhost:8070/prescription/add", newPrescription)
      .then(() => {
        alert("prescription added")
      }).catch((err) => {
        alert(err)
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2>Add Prescription </h2>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={sendData} className="box-add-prescription">
          <div className="row">
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Doctor ID"
                  onChange={(e) => { setDoctorID(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Doctor Name"
                  onChange={(e) => { setDoctorName(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>

            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Patient ID"
                  onChange={(e) => { setPatientID(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Patient Name"
                  onChange={(e) => { setPatientName(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Drug name"
                  onChange={(e) => { setProductTitle(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>

            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Dosage"
                  onChange={(e) => {
                    setDose(e.target.value);
                  }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>

            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Dispense number"
                  onChange={(e) => { setDisp(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>

            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Instructions"
                  onChange={(e) => { setSig(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="No. of refills"
                  onChange={(e) => { setRefill(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Issue"
                  onChange={(e) => { setAction(e.target.value); }}
                  required fullWidth
                  inputProps={{style: {padding: 12}}}
                />
              </div>
            </div>
            <div>
              <input type="submit" value="Add" className="form-submit-btn" />
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

