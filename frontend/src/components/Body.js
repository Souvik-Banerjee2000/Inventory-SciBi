import React,{useState,useContext} from 'react';
import OneLayerChart from './OneLayerChart';

function Body({bodyData}) {
    
    return (
        <div className="chartcontainer">
            <OneLayerChart type="PieChart" classname="donutChart" bodyData={bodyData}/>
            
        </div>
    )
}

export default Body;
