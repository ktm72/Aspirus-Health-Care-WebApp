import React from 'react'
import AllDoctors from './Doctors/AllDoctors'
import Covid from './Covid/Covid'

function Homepage() {
    return (
        <div className="container">
            <Covid />       
            <br/>     
            <AllDoctors/>
        </div>
    )
}

export default Homepage