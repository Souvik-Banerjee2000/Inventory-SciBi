import React,{useContext,useEffect} from 'react'
import { ChartContext } from '../context/ChartContext';
import Chart from './Chart'

function Charts() {
    const { chartData, dispatch } = useContext(ChartContext);
    useEffect(()=>{
        console.log(chartData);
    })
    return (
        <div>
            <Chart/>
        </div>
    )
}

export default Charts;
