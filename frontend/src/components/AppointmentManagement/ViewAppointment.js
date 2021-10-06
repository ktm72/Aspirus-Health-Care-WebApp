import React from 'react'

function ViewAppointment() {
    return (
        <div className="container">
            <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                <h2>Appointments</h2>
            </div>
            <div className="blue-table ">
                <div className="blue-table, box-view-prescription">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>Doctor Name</th>
                                <th style={{ textAlign: 'center' }}>Patient Name</th>
                                <th style={{ textAlign: 'center' }}>Date</th>
                                <th style={{ textAlign: 'center' }}>Time</th>
                            </tr>
                        </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <td>
                                        Doctor
                                    </td>
                                    <td>
                                        Mr.John Doe
                                    </td>
                                    <td>
                                        YYYY:MM:DD
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

export default ViewAppointment
