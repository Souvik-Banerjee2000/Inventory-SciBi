import React,{useContext, useEffect} from 'react'
import { ToogleContext } from '../context/ToogleContext';

function Dummy({prepare}) {
    const {toogle,setToogle} = useContext(ToogleContext);
    useEffect(()=>{
        prepare();
    },[toogle])
    useEffect(()=>{
        prepare();
    })
    return (
        <div>
            
        </div>
    )
}

export default Dummy;
