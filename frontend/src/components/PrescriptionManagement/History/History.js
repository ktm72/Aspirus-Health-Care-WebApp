import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, teal, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import './History.css';

function History(props) {

  const [prescriptionArr, setPrescriptionsArr] = useState([])
  const history = useHistory()
  const [isDoctor, setIsDoctor] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("doctorAuthToken")) {
      setIsDoctor(true)
    } else {
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

  function update(id) {
    history.push(`/prescription/update/${id}`)
  }

  function viewOne(id) {
    history.push(`/prescription/view/${id}`)
  }

  function filterContent(data, searchTerm) {
    const result = data.filter((prescription) =>
      prescription.doctorID.name.toLowerCase().includes(searchTerm) || 
      prescription.patientID.firstname.toLowerCase().includes(searchTerm) || 
      prescription.date.toLowerCase().includes(searchTerm) || 
      prescription.action.toLowerCase().includes(searchTerm))
    setPrescriptionsArr(result)
  }

  function handleSearch(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/prescription/${props.match.params.id}`).then((res) => {
      filterContent(res.data.result, searchTerm.toLowerCase())
      console.log(res.data.result)
    }).catch((error) => {
      alert("Failed to search prescriptions")
    })
  }

  return (
    <div className="container"  >
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between ">
            <h2>Prescription History</h2>
          </div>
        </div>
        <div className="col-3">
        </div>
        <div className="col-5">
          <div className="px-3 search" align="right">
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
      <div style={{ display: 'flex', justifyContent: 'right' }}>
      </div><br/>
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
                    {Prescription.doctorID.title + ' ' + Prescription.doctorID.name}
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
