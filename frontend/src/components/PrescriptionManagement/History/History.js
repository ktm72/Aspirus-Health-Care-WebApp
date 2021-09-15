import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { red, teal, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import './History.css';

function History(props) {

  const [prescriptionArr, setPrescriptionsArr] = useState([])
  const history = useHistory()
  const [isDoctor,setIsDoctor]=useState(false)

  useEffect(() => { 
    if(localStorage.getItem("doctorAuthToken")){
      setIsDoctor(true)
    }else{
      setIsDoctor(false)
    }

    async function getPrescription() {
      await axios.get(`http://localhost:8070/prescription/${props.match.params.id}`).then((res) => {
        setPrescriptionsArr(res.data.result)
      }).catch((error) => {
        alert("Failed to fetch the prescription history")
      })
    }
    getPrescription();
  }, [props])

  async function onDelete(id) {
    const config = {
      headers: {
        "content-Type": "application/json"
      }
    };
    
    await axios.delete(`http://localhost:8070/prescription/delete/${id}`, config).then(() => {
      alert("Item deleted successfully")
      setPrescriptionsArr(prescriptionArr.filter(element => element._id !== id))
    }).catch((error) => {
      alert(`Failed to delete the item`)
    })
  }

  function addPrescription(id) {
    history.push(`/prescription/add`)
  }

  function update(id) {
    history.push(`/prescription/update/${id}`)
  }

  function viewOne(id){
    history.push(`/prescription/view/${id}`)
  }

  return (
    <div className="container"  >
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between ">
            <h2>Prescription History</h2>
            {isDoctor &&
            <IconButton onClick={() => addPrescription()} className="add-btn">
              <NoteAddIcon></NoteAddIcon>
            </IconButton>
            }
          </div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'right'}}>  
      </div>
      <div className="blue-table ">
        <div className="blue-table, box-view-prescription">
          <table>
            <thead >
              <tr>
                <th style={{ textAlign: 'center' }}>Doctor Name</th>
                <th style={{ textAlign: 'center' }}>Patient Name</th>
                <th style={{ textAlign: 'center' }}>Disease</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {prescriptionArr.map((Prescription, key) => (
                <tr key={key}>
                  <td>
                    {Prescription.doctorID.title + ' ' +Prescription.doctorID.name}
                  </td>
                  <td>
                    {Prescription.patientID.firstname + ' ' + Prescription.patientID.lastname}
                  </td>
                  <td>
                    {Prescription.action}
                  </td>
                  <td>
                    {Prescription.date}
                  </td>
                  <td>
                    <div>
                      <IconButton onClick={() => viewOne(Prescription._id)}>
                        <OpenInNewIcon style={{ color: teal[500] }}  ></OpenInNewIcon>
                      </IconButton>
                      <IconButton onClick={() => onDelete(Prescription._id)}>
                        <DeleteIcon style={{ color: red[500] }} ></DeleteIcon>
                      </IconButton>
                      {isDoctor &&
                        <IconButton onClick={() => update(Prescription._id)}>
                          <EditIcon style={{ color: grey[500] }} ></EditIcon>
                        </IconButton>
                      } 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default History
