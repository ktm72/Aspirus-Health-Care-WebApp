import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

function PrescriptionHistory() {

  const [prescriptionArr, setPrescription] = useState([])

  useEffect(() => {
    function getData() {
      axios.get("http://localhost:8070/prescription/")
        .then((res) => {
          setPrescription(res.data)
        }).catch((err) => {
          alert(err)
        })
    }
    getData();
  }, [])

  return (
    <div>
      <h1>Appointment History</h1>
      <div>
        <span>Appointment History</span>
      </div>
      <div>
        <table>
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
            {prescriptionArr.map((prescriptions, key) => (
              <tr key={key}>
                <td>
                  { }
                </td>
                <td>
                  <p>not in table</p>
                </td>
                <td>
                  {prescriptions.doctorID}
                </td>
                <td>
                  <p> {prescriptions.patientID}</p>
                </td>
                <td>
                  <p>{prescriptions.dose}</p>
                </td>
                <td>
                  <p> {prescriptions.action}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PrescriptionHistory

