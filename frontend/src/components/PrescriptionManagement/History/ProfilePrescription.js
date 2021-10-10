import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { teal } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import './History.css';

function ProfilePrescription(props) {

  const user = JSON.parse(localStorage.getItem('user'));
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
      await axios.get(`http://localhost:8070/prescription/${user._id}`).then((res) => {
        setPrescriptionsArr(res.data.result)

      }).catch((error) => {
        alert("Failed to fetch the prescription history")
      })
    }
    getPrescription();
  }, [props])



  function viewOne(id) {
    history.push(`/prescription/view/${id}`)
  }

  return (
    <div className="container"  >
      <div className="blue-table ">
        <div className="blue-table, box-view-prescription">
        {prescriptionArr.length > 0 &&
          <table>
            <thead >
              <tr>
                <th style={{ textAlign: 'center' }}>Doctor Name</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Disease</th>
                <th style={{ textAlign: 'center' }}>status</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {prescriptionArr.slice(0, 4).map((Prescription, key) => (
                <tr key={key}>
                  <td>
                    {Prescription.doctorID.title + ' ' + Prescription.doctorID.name}
                  </td>
                  <td>
                    {Prescription.date}
                  </td>
                  <td>
                    {Prescription.action}
                  </td>
                  <td>
                    <div>
                      <IconButton onClick={() => viewOne(Prescription._id)}>
                        <OpenInNewIcon style={{ color: teal[500] }}  ></OpenInNewIcon>
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        </div>
      </div>
    </div>
  )
}

export default ProfilePrescription
