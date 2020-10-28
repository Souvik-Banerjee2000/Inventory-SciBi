import React,{useState,useContext, useEffect} from 'react';
import Chart from "react-google-charts";
import { calculateDistinctPID } from "../Calculations";
import { ToogleContext } from '../context/ToogleContext';

function OneLayerChart({type,bodyData}) {
    const [oneLayerChart, setOneLayerChart] = useState([]);
    const [oneLayerChartOption, setOneLayerChartOption] = useState([]);
    const {toogle,setToogle} = useContext(ToogleContext);
    function isEmpty(obj) {
        if (Object.entries(obj).length === 0 && obj.constructor === Object) {
            return true;
        } else {
            return false;
        }
    }
    function prepareOneLayerChart() {

        if (type === 'PieChart') {
            if (bodyData.length > 0) {
                let donutChartObject = calculateDistinctPID(bodyData);
                console.log(donutChartObject);
                let donutData = [["EXPBucket", "DistinctCount"]];
                const options = {
                    title: "My Daily Activities",
                    pieHole: 0.4,
                    is3D: false
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
            }
        }

    }
    useEffect(()=>{
        prepareOneLayerChart();
    },[bodyData])
    // const { chartData, dispatch } = useContext(ChartContext)
    
    return (
        <div>
            {oneLayerChart.length > 0 ? (
                <Chart
                    chartType={type}
                    data={oneLayerChart}
                    options={oneLayerChartOption}
                    width="100%"
                    height="400px"
                />
            ) : (<></>)}
        </div>
    )
}

export default OneLayerChart;
