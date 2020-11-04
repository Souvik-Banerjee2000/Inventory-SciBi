import React,{useEffect} from 'react';
const colors = ['#1A5073','#4BBCEC','#6EBE4A','#F5AC41'];

function Headers({headers}) {
    return (
        <div >
            {headers.length === 0?(<h1>Loading</h1>):(
                <div className = " buttonContainer ">
                {Object.keys(headers[0]).map((keyName,keyIndex)=>(
                    <div style={{ backgroundColor: colors[keyIndex] }} className= "headers" key = {keyName}>
                    <div className="upper-label">
                    {keyName}
                    </div>
                    <hr/>
                    <div className = "headers">
                    <p>&#8377; {headers[0][keyName]}</p>
                    
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}

export default Headers;
