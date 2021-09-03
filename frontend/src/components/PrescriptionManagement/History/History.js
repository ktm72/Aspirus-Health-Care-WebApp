import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

function History() {

  const [prescriptionArr, setPrescriptionsArr] = useState([])

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:8070/prescription/")
        .then((res) => {
          setPrescriptionsArr(res.data)
        }).catch((err) => {
          alert(err)
        })
    }
    getData();
  }, [])

  return (


  <div>
    <h3 class="">Prescription History</h3>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Doctor ID</th>
            <th>Patient ID</th>
            <th>Dose </th>
            <th>Current Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {prescriptionArr.map((Prescription, key) => (
            <tr key={key}>
              <td>
                {Prescription.dose}
              </td>
              <td>
                {Prescription.dose}
              </td>
              <td>
                {Prescription.doctorID}
              </td>
              <td>
                {Prescription.patientID}
              </td>
              <td>
                {Prescription.dose}
              </td>
              <td>
                {Prescription.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default History

