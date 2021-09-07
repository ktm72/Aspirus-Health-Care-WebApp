import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
// import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { red } from '@material-ui/core/colors';
import './css/History.css';

function History(props) {

  const [prescriptionArr, setPrescriptionsArr] = useState([])

  useEffect(() => {
    async function getPrescription() {
      axios.get(`http://localhost:8070/prescription/${props.match.params.id}`).then((res) => {
        setPrescriptionsArr(res.data.result)
        console.log(res.data.result)
      }).catch((err) => {
        alert(err)
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
      alert(`Failed to delete the item\n${error.message}`)
    })
  }

  return (
    <div class="container">
      <div>
        <h3>Prescription List</h3>
        <div class="table100 ver1 m-b-110">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Problem</th>
                <th>Drug</th>
                <th>Sig</th>
                <th>disp</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {prescriptionArr.map((Prescription, key) => (
                <tr key={key}>
                  <td>
                    {Prescription.doctorName}
                  </td>
                  <td>
                    {Prescription.patientName}
                  </td>
                  <td>
                    {Prescription.action}
                  </td>
                  <td>
                    {Prescription.productTitle}
                  </td>
                  <td>
                    {Prescription.sig}
                  </td>
                  <td>
                    {Prescription.disp}
                  </td>
                  <td>
                    <div>
                      <IconButton onClick={() => onDelete(Prescription._id)}>
                        <DeleteIcon style={{color:red[500]}} ></DeleteIcon>
                      </IconButton>
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
