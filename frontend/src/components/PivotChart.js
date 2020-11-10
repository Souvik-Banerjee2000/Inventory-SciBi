import React, { useState,useEffect,useContext } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { distinctNameIdMapper,pivotDataById} from "../Calculations";

const PivotChart = ({bodyData,tableHeaders}) => {

    const [tableData,setTableData] = useState([]);
    useEffect(()=>{
        // console.log(bodyData);
        let data = distinctNameIdMapper(bodyData);
        setTableData(pivotDataById(bodyData, data));
    },[bodyData])

    return (
        <div className="pivotChart">
            <div className="ag-theme-alpine second-table" style={{ height: 300, width: 980 }} >
                <AgGridReact
                    rowData={tableData}>
                    {tableHeaders.map(header => (
                        <AgGridColumn field={header} key={header} />
                    ))}
                </AgGridReact>
            </div>
        </div>
    );
};

export default PivotChart;