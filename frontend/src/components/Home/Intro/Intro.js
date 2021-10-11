import React from 'react'
import Aos from "aos";
import "aos/dist/aos.css"

function Intro() {

    Aos.init({duration:2000})

    return (
            <div className="">
                <div className="row introCard">
                    <div className="col-7 px-5 pt-5">
                        <div data-aos="fade-up">
                            <h1>Secure Your Health Anytime Anywhere</h1>
                        </div>
                        <br/>
                        <div data-aos="fade" className="px-3 pt-3 text-muted">
                            <p>
                                Aspirus healthcare lets you to channel qualified doctors,receive a prescription if required, all from the comfort of your home. You can channel either a Physician or a specialist from our system. An appointment can be made 24/7 as your wish. Easy and convenient way to channel your doctor.
                            </p>
                        </div>
                    </div>
                    <div className="col-5 pb-5">
                        <img src="../images/doctorIntro.png" alt="download from store" width="600px" />
                    </div>
                </div>
            </div>
    )
}

export default Intro
