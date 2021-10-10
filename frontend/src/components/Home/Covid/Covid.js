import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BarChartIcon from '@material-ui/icons/BarChart';
import { orange, green, red } from '@material-ui/core/colors';
import CountUp from 'react-countup';
import './Covid.css'

function Covid() {

    const [time, setTime] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [hospital, setHospitals] = useState(0);
    const [cases, setCases] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);
    const [totalRecoveries, setTotalRecoveries] = useState(0);
    const [totalCases, setTotalCases] = useState(0);
    const location = useLocation();

    //fetching covid data
    useEffect(()=>{
        function fetchData(){
            axios.get("https://www.hpb.health.gov.lk/api/get-current-statistical").then((res)=>{
                setTime(res.data.data.update_date_time)
                setDeaths(res.data.data.local_new_deaths)
                setHospitals(res.data.data.local_total_number_of_individuals_in_hospitals)
                setCases(res.data.data.local_new_cases)
                setTotalDeaths(res.data.data.local_deaths)
                setTotalRecoveries(res.data.data.local_recovered)
                setTotalCases(res.data.data.local_total_cases)
            }).catch((error)=>{
                console.log(error)
            })
        }
        fetchData()
    },[location]);

    return (
        <div>
            <div className="covid-card">
                <div className="card-head">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <h3>Covid-19 Statistics (SL) <BarChartIcon/></h3>
                            <p>Last Updated at: {time}</p>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-xl-9">
                        <div className="row mb-4 px-5">
                            <div className="col-xl-4">
                                <h3 style={{ color: red[500]}}><CountUp end={deaths} duration={1}/></h3>
                                <h5>Deaths</h5>
                            </div>
                            <div className="col-xl-4">
                                <h3 style={{ color: orange[300]}}><CountUp end={cases} duration={1}/></h3>
                                <h5>Cases</h5>
                            </div>
                            <div className="col-xl-4">
                                <h3 style={{ color: green[300]}}><CountUp end={hospital} duration={1}/></h3>
                                <h5>In Hospitals</h5>
                            </div>
                        </div>
                        <div className="row px-5 mb-4">
                            <div className="col-xl-4" >
                                <h3 style={{ color: red[500]}}><CountUp end={totalDeaths} duration={1}/></h3>
                                <h5>Total Deaths</h5>
                            </div>
                            <div className="col-xl-4">
                                <h3 style={{ color: orange[300]}}><CountUp end={totalCases} duration={1}/></h3>
                                <h5>Total Cases</h5>
                            </div>
                            <div className="col-xl-4">
                                <h3 style={{ color: green[300]}}><CountUp end={totalRecoveries} duration={1}/></h3>
                                <h5>Total Recovered</h5>
                            </div>   
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="">
                            <img src="../images/covidgraph.gif" width="250px" alt="graph"/>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Covid
