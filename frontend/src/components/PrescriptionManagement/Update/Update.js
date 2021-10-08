import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Update.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router';

function Update(props) {

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [refill, setRefill] = useState("");
  const [action, setAction] = useState("");
  const [medicineList, setMedicineList] = useState([{ productTitle: "", dose: "", sig: "", disp: "" }]);
  const history = useHistory();

  useEffect(() => {
    async function updatePrescription() {
      await axios.get(`http://localhost:8070/prescription/view/${props.match.params.id}`).then((res) => {
        setPatientName(res.data.prescription.patientID.firstname + ' ' + res.data.prescription.patientID.lastname)
        setDoctorName(res.data.prescription.doctorID.title + ' ' + res.data.prescription.doctorID.name)
        setRefill(res.data.prescription.refill)
        setAction(res.data.prescription.action)
        setMedicineList(res.data.prescription.medicineList)
      }).catch((error) => {
        alert("Failed to fetch prescription data")
      })
    }
    updatePrescription()
  }, [props]);

  // handle update change
  const updateInputsArray = (event, index) => {
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

  async function Update(event) {

    event.preventDefault()

    const updateprescription = {
      medicineList,
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
      history.push(`/prescription/view/${props.match.params.id}`)
    } catch (error) {
      alert("Prescription Updating Failed")
    }
  }

  return (
    <div className="container" align='center'>
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2>Update Prescription </h2>
          </div>
        </div>
      </div>
      <div >
        <form onSubmit={Update} className="box-add-prescription">
          <div className="row mb-4">
            <h4> Information </h4>
            <div className="col-xl-6 mb-4"><br />
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Doctor Name"
                  required fullWidth readOnly
                  value={doctorName}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <div className="col-xl-6 mb-4"><br />
              <div className="form-group">
                <OutlinedInput type="text" placeholder="Patient Name"
                  required fullWidth readOnly
                  value={patientName}
                  inputProps={{ style: { padding: 12 } }}
                />
              </div>
            </div>
            <hr />
          </div>
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
                        onChange={event => updateInputsArray(event, i)}
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
                        onChange={event => updateInputsArray(event, i)}
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
                        onChange={event => updateInputsArray(event, i)}
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
                        onChange={event => updateInputsArray(event, i)}
                        required fullWidth
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div> <div className="col-xl-1">
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
            <br /><br />
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
