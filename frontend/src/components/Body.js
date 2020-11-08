import React,{useState,useContext} from 'react';
import OneLayerChart from './OneLayerChart';
import PivotChart from "./PivotChart";

function Body({bodyData}) {
    
    return (
        <div className="chartcontainer">
            <OneLayerChart type="PieChart" classname="donutChart" bodyData={bodyData}/>
            <PivotChart bodyData={bodyData} idNameHeaders ={["Whid","Whname"]} productCategoryHeaders={["Menuid","Categoryid","Productname","PID"]}/>
        </div>
    )
}

export default Body;
