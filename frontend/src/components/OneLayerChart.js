import React,{useState,useContext, useEffect,useRef} from 'react';
import Chart from "react-google-charts";
import { calculateDistinctPID } from "../Calculations";
import { ToogleContext } from '../context/ToogleContext';
import { ChartContext } from '../context/ChartContext';
let pieData = [];

function OneLayerChart({type,bodyData,classname}) {
    const [oneLayerChart, setOneLayerChart] = useState([]);
    const [oneLayerChartOption, setOneLayerChartOption] = useState([]);
    const {toogle,setToogle} = useContext(ToogleContext);
    const {chartData,dispatch} = useContext(ChartContext);
    const [reloadStopper,setReloadStopper] = useState([0,0]);
    if(bodyData.length>0 && pieData.length === 0){
        pieData = bodyData;
    }
    function isEmpty(obj) {
        if (Object.entries(obj).length === 0 && obj.constructor === Object) {
            return true;
        } else {
            return false;
        }
    }

    const chartEvents = [
        {
            eventName: "select",
            callback({ chartWrapper }) {
                let selectionObj = chartWrapper.getChart().getSelection();
                let selectionRow = selectionObj[0].row;
                let reloadStopperInSelection = [];
                reloadStopperInSelection.push(reloadStopper[0]+1);
                reloadStopperInSelection.push(reloadStopper[1]);
                console.log(reloadStopperInSelection);
                setReloadStopper(reloadStopperInSelection);
                dispatch({
                    value: [{ label: oneLayerChart[selectionRow + 1][0], value: oneLayerChart[selectionRow + 1][0]}],
                    type:"ExpBucket"
                })
                setToogle(!toogle);
                // console.log(oneLayerChart[selectionRow+1][0]);
            }
        }
    ];

    function prepareOneLayerChart() {

        if (type === 'PieChart') {
            if (bodyData.length > 0) {
                let donutChartObject;
                if(reloadStopper[0]===reloadStopper[1])
                    donutChartObject = calculateDistinctPID(bodyData);
                else 
                    donutChartObject = calculateDistinctPID(pieData);
                // console.log(donutChartObject);
                console.log(pieData);
                let donutData = [["EXPBucket", "DistinctCount"]];
                const options = {
                    title: "Expiry Bucket",
                    pieHole: 0.4,
                    is3D: false,
                    animation: {
                        duration: 2000,
                        easing: 'out',
                        startup: true
                    },
                    colors: ['#FF684C', '#6EBE4A', '#F28E2B', '#2d4ea1', '#375ebf']
                };
                if (!isEmpty(donutChartObject)) {
                    for (let key in donutChartObject) {
                        donutData.push([key, donutChartObject[key]]);
                    }
                } else {
                    donutData.push([0, 0]);
                }
                setOneLayerChart(donutData);
                setOneLayerChartOption(options);
                setReloadStopper([0,0]);
            }
        }

    }
    useEffect(()=>{
        prepareOneLayerChart();
    },[bodyData])
    // const { chartData, dispatch } = useContext(ChartContext)
    
    return (
        <div className="donutDiv">
            {oneLayerChart.length > 0 ? (
                <Chart className = "donutchart"
                    chartType={type}
                    data={oneLayerChart}
                    options={oneLayerChartOption}
                    width="500px"
                    height="300px"
                    chartEvents={chartEvents}
                />
            ) : (<></>)}
        </div>
    )
}

export default OneLayerChart;
