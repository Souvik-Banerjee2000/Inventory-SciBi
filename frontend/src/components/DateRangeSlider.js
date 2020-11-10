import React,{useState,useEffect,useContext} from 'react'
import { Slider } from '@material-ui/core';
import Axios from "axios";
import {ToogleContext} from "../context/ToogleContext";
import { ChartContext } from "../context/ChartContext";
function DateRangeSlider({endpoint,url}) {
    const [dateValue,setDateValue] = useState([0,100]);
    const [lowestDateValue,setLowestDateValue] = useState("");
    const [highestDateValue, setHighestDateValue] = useState("");
    const {chartData,dispatch} = useContext(ChartContext);
    const {toogle,setToogle} = useContext(ToogleContext);
    const [max,setMax] = useState(100);
    const [min,setMin] = useState(0);
    const [tweak,setTweak] = useState(false);
    const [payloadDates,setPayloadDates] = useState(["",""]);
    function formatFetchedDateValues(val){
        return val.split("T")[0];
    }
    function convertDateToNumeric(dateVal,lowestDateVal){
        let splittedDateValue = dateVal.split("-");
        let lowestDateSplittedValue = lowestDateVal.split("-");
        let yearDiff = Number(splittedDateValue[0]) - Number(lowestDateSplittedValue[0]);
        let month = Number(splittedDateValue[1]);
        let days = Number(splittedDateValue[2]);
        let convertedValue = yearDiff*365 + month*30 + days;
        return convertedValue;
    }
    function decodeDateVal(dateVal,index,lowestDateVal){ //dateVal is nUMERIC when it's been passed it has to be converted to "2017-04-11"
        let lowestDateSplittedValue = lowestDateVal.split("-");
        // console.log(Number(index));
        // console.log(dateVal);
        // console.log( lowestDateVal);
        let diffYears = Math.floor(dateVal[Number(index)] / 365);
        let remainingDays = dateVal[Number(index)] % 365;
        let diffMonth = Math.floor(remainingDays / 30);
        remainingDays = remainingDays % 30;
        let newYear = Number(lowestDateSplittedValue[0]) + diffYears;
        let newMonth = diffMonth + Number(lowestDateSplittedValue[1]) <= 12 ? diffMonth + Number(lowestDateSplittedValue[1]) : (diffMonth + Number(lowestDateSplittedValue[1])) - 12
        let newDay = remainingDays + Number(lowestDateSplittedValue[1]) <= 30 ? remainingDays + Number(lowestDateSplittedValue[1]) : remainingDays + Number(lowestDateSplittedValue[1]) -30 ;
        let newDate = "";
        newDate+= newYear.toString();
        newDate+="-";
        newMonth >= 10 ? newDate+=newMonth.toString():newDate+=("0"+newMonth.toString());
        newDate+="-";
        newDay >= 10 ? newDate += newDay.toString() : newDate += ("0" + newDay.toString())
        let newPayload = [];
        if(Number(index)===0){
            newPayload.push(newDate);
            newPayload.push(payloadDates[1]);
        }else if(Number(index)===1){
            newPayload.push(payloadDates[0]);
            newPayload.push(newDate);
        }
        setPayloadDates(newPayload);
        // console.log(newYear,newMonth,newDay);
        // let  

    }
    function handleChange(e,val){
        // decodeDateVal(lowestDateValue,value);
        
        if(e.target.attributes[4]!==undefined){
            decodeDateVal(val,e.target.attributes[4].value,lowestDateValue);
            setDateValue(val);
        }

    }
    function handleChangeCommitted(e,val){
        // setDateValue(val);
        dispatch({
            type:endpoint,
            value:payloadDates
        })
        setToogle(!toogle);
    }
    async function fetchDates(){
        const {data} = await Axios.get(url+endpoint);
        let highDateVal = formatFetchedDateValues(data[0].maxdate);
        let lowDateVal = formatFetchedDateValues(data[0].mindate);
        dispatch({
            type: endpoint,
            value: [lowDateVal,highDateVal]
        });
        setToogle(!toogle);
        setPayloadDates([lowDateVal,highDateVal]);
        let lowNumericVal = convertDateToNumeric(lowDateVal, lowDateVal);
        let highNumericVal = convertDateToNumeric(highDateVal,lowDateVal); 
        setLowestDateValue(lowDateVal);
        setHighestDateValue(highDateVal);
        setDateValue([lowNumericVal, highNumericVal]);
        setMin(lowNumericVal);
        setMax(highNumericVal);
    }
    useEffect(()=>{
        fetchDates();
        
    },[tweak])
    return (
        <div>
            <h3>Createdat</h3>
        <div style={{width:240,marginTop:20}}>
            <Slider
                min = {min}
                max= {max}
                value = {dateValue}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                aria-labelledby="range-slider"
            />
        </div>
        </div>
    )
}

export default DateRangeSlider;
