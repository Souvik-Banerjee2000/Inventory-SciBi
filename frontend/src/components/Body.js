import React,{useState,useContext} from 'react';
import OneLayerChart from './OneLayerChart';

function Body({bodyData}) {
    
    return (
        <div>
            <OneLayerChart type="PieChart" bodyData={bodyData}/>
        </div>
    )
}

export default Body;
