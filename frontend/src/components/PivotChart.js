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
        <div className="pivotChart cont">
            {/* <div class="first-table"> */}
            <div className="ag-theme-alpine first-table " style={{ height: 310, width: 350 }} >
                <AgGridReact
                    rowData={idNameData}>
                    {idNameHeaders.map(header=>(
                    <AgGridColumn field={header} key={header}/>
                    ))}
                </AgGridReact>
            </div>
            {/* </div> */}
            {/* <div class="first-table"> */}
            <div className="ag-theme-alpine second-table" style={{ height: 310, width: 550 }} >
                <AgGridReact
                    rowData={productCategoryData}>
                    {productCategoryHeaders.map(header => (
                        <AgGridColumn field={header} key={header} />
                    ))}
                </AgGridReact>
            </div>
            {/* </div> */}

        </div>
    );
};

export default PivotChart;