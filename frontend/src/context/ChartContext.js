import React,{createContext,useState,useReducer} from "react";
import {ChartReducer} from "../reducer/ChartReducer"
export const ChartContext = createContext();

const ChartContextProvider = (props)=>{
    const [chartData,dispatch] = useReducer(ChartReducer,{
        Whname:[],
        Whid:[],
        Status:[],
        ExpBucket:[],
        Menuid:[],
        Categoryname:[],
        Productname:[],
        dates:[]
        
    });
    return(
        <ChartContext.Provider value = {{chartData,dispatch}}>
            {props.children}
        </ChartContext.Provider>
    )
}
export default ChartContextProvider;