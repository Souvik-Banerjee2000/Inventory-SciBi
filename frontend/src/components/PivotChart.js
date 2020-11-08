import React, { useState,useEffect,useContext } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { distinctNameIdMapper,pivotDataById} from "../Calculations";

const PivotChart = ({bodyData,idNameHeaders,productCategoryHeaders}) => {
    const [idNameData,setIdNameData] = useState([]);
    const [productCategoryData,setProductCategoryData] = useState([]);
    useEffect(()=>{
        // console.log(bodyData);
        let data = distinctNameIdMapper(bodyData);
        // console.log(data);
        // console.log(pivotDataById(bodyData,data));
        setProductCategoryData(pivotDataById(bodyData, data));
        setIdNameData(data);
    },[bodyData])
    return (
        <div className="pivotChart">
            <div className="ag-theme-alpine" style={{ height: 200, width: 500 }} >
                <AgGridReact
                    rowData={idNameData}>
                    {idNameHeaders.map(header=>(
                    <AgGridColumn field={header} key={header}/>
                    ))}
                </AgGridReact>
            </div>
            <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }} >
                <AgGridReact
                    rowData={productCategoryData}>
                    {productCategoryHeaders.map(header => (
                        <AgGridColumn field={header} key={header} />
                    ))}
                </AgGridReact>
            </div>

        </div>
    );
};

export default PivotChart;