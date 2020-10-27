import React,{useContext,useEffect,useState} from 'react'
import { ChartContext } from '../context/ChartContext';
import Chart from './Chart'
import Axios from "axios";
import { ToogleContext } from '../context/ToogleContext';
function Charts() {
    const { chartData, dispatch } = useContext(ChartContext);
    const {toogle,setToogle} = useContext(ToogleContext);
    const [requestPayload,setRequestPayload] = useState({});
    function preparePayloadData(){
        let payload = {};
        let payloadString;
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
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
    useEffect(() => {
        preparePayloadData();
        fetchData();
    }, [toogle])
    return (
        <div>
            <Chart/>
        </div>
    )
}

export default Charts;
