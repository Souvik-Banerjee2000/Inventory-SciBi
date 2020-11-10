import React,{useState,useContext} from 'react';
import OneLayerChart from './OneLayerChart';
import PivotChart from "./PivotChart";

function Body({bodyData}) {
    
    return (
        <div className="chartcontainer">
            <OneLayerChart type="PieChart" classname="donutChart" bodyData={bodyData}/>
            <PivotChart bodyData={bodyData} tableHeaders={["Whid","Whname","Menuid","Categoryid","Productname","PID"]}/>
        </div>
    )
}

export default Body;
