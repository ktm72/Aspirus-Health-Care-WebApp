import React from 'react'
import Covid from './Covid/Covid'
import PharmacyHome from './PharmacyHome'

function Homepage() {
    return (
        <div className="container">
            <Covid />
            <PharmacyHome/>
        </div>
    )
}

export default Homepage
