import React, { useState } from "react";
import axios from "axios";
import { OutlinedInput } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom';
import './Add.css';

export default function Add() {

  const [doctorID, setDoctorID] = useState("");
  const [patientID, setPatientID] = useState("");
  const [refill, setRefill] = useState("");
  const [action, setAction] = useState("");
  const history = useHistory()

  const [medicineList, setMedicineList] = useState([{ productTitle: "", dose: "", sig: "", disp: "" }]);

  // handle input change
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...medicineList];
    list[index][name] = value;
    setMedicineList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...medicineList];
    list.splice(index, 1);
    setMedicineList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setMedicineList([...medicineList, { productTitle: "", dose: "", sig: "", disp: "" }]);
  };

  function sendData(e) {

    e.preventDefault();

    const newPrescription = {
      doctorID,
      patientID,
      refill,
      action,
      medicineList
    }

    axios.post("http://localhost:8070/prescription/add", newPrescription)
      .then(() => {
        alert("prescription added")
        history.push(`/prescription/history/${doctorID}`)
      }).catch((error) => {
        alert("Failed to add a new prescription")
      })
  }

  return (
    <div className="container" align='center'>
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2> Add Prescription </h2>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={sendData} className="box-add-prescription">
          <div className="row">
            <h4> Information </h4>
            <div className="col-xl-6 mb-4"><br />
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Doctor ID"
                  onChange={(e) => { setDoctorID(e.target.value); }}
                  required fullWidth
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4"><br />
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Patient ID"
                  onChange={(e) => { setPatientID(e.target.value); }}
                  required fullWidth
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <h4 className="mb-4"> Medicine </h4>
            {medicineList.map((x, i) => {
              return (
                <div className="row">
                  <div className="col-xl-5 mb-4">
                    <div className="form-group">
                      <OutlinedInput
                        name="productTitle"
                        placeholder="Drug Name"
                        value={x.productTitle}
                        onChange={event => handleInputChange(event, i)}
                        required fullWidth
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 mb-4">
                    <div className="form-group">
                      <OutlinedInput
                        className="ml10"
                        name="dose"
                        placeholder="Dosage"
                        value={x.dose}
                        onChange={event => handleInputChange(event, i)}
                        required
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 mb-4">
                    <div className="form-group">
                      <OutlinedInput
                        className="ml10"
                        name="disp"
                        placeholder="Dispense number"
                        value={x.disp}
                        onChange={event => handleInputChange(event, i)}
                        required
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-1">
                    {medicineList.length !== 1 && <IconButton onClick={() => handleRemoveClick(i)} className="add-btn" > <RemoveIcon> Remove </RemoveIcon></IconButton>}
                  </div>
                  <div className="col-xl-11 mb-4">
                    <div className="form-group">
                      <OutlinedInput
                        className="ml10"
                        name="sig"
                        placeholder="Instruction"
                        value={x.sig}
                        onChange={event => handleInputChange(event, i)}
                        required fullWidth
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-1">
                    {medicineList.length - 1 === i && <IconButton onClick={handleAddClick} className="add-btn"> <AddIcon> Add </AddIcon></IconButton>}
                  </div>
                  <br /><br />
                  <hr />
                  <br />
                </div>
              );
            })}
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="No. of refills"
                  onChange={(e) => { setRefill(e.target.value); }}
                  required fullWidth
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4">
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Issue"
                  onChange={(e) => { setAction(e.target.value); }}
                  required fullWidth
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div>
              <input type="submit" value="Add Prescription" className="form-submit-btn" />
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}
