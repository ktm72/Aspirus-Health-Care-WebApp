import React from 'react';

function ProfileAppointments() {
    return (
      <div className="container"  >
        <div className="blue-table ">
          <div className="blue-table, box-view-prescription">
            <table>
              <thead >
                <tr>
                  <th style={{ textAlign: 'center' }}>Date</th>
                  <th style={{ textAlign: 'center' }}>Name of the patient</th>
                  <th style={{ textAlign: 'center' }}>time</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                  <tr>
                    <td>
                      YYYY-MM-DD
                    </td>
                    <td>
                      Mr.John Doe
                    </td>
                    <td>
                      HH:MM
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}

export default ProfileAppointments
