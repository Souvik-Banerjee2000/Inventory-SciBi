import React,{useContext,useEffect,useState} from 'react'
import { ChartContext } from '../context/ChartContext';
import Chart from './Chart';
import Headers from "./Headers";
import Axios from "axios";
import { ToogleContext } from '../context/ToogleContext';
import Body from './Body';
function Charts() {
    const { chartData, dispatch } = useContext(ChartContext);
    const {toogle,setToogle} = useContext(ToogleContext);
    const [requestPayload,setRequestPayload] = useState({});
    const [headers,setHeaders] = useState([]);
    const [chartBody,setChartBody] = useState([]);
    
    function preparePayloadData(){
        let payload = {};
        let payloadString;
        console.log("ChartData",chartData);
        for (let key in chartData) {
            payloadString = `(`;
            chartData[key].forEach((d, index) => {
                payloadString+='\'';
                payloadString += d.value;
                payloadString += '\'';
                if (index === chartData[key].length - 1) {
                    payloadString += ')';
                } else {
                    payloadString += ',';
                }
            })
            payload[`${key}`] = payloadString;
        }

        setRequestPayload(payload);
        
    }
    const fetchData = ()=>{
        if (Object.keys(requestPayload).length === 0 && requestPayload.constructor === Object){
            console.log("empty");
        }else{
            Axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/',
                data: requestPayload
            })
                .then((res) => {
                    console.log(res.data);

                    setHeaders(res.data.summedResult);
                    setChartBody(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
    useEffect(() => {
        preparePayloadData();
    }, [toogle])
    useEffect(()=>{
        fetchData();
    },[requestPayload])
    return (
        <div>
            <Headers headers={headers}/>
            <Body bodyData = {chartBody}/>
        </div>
    )
}

export default Charts;
