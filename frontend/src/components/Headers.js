import React,{useEffect} from 'react';

function Headers({headers}) {
    return (
        <div>
            {headers.length === 0?(<h1>Loading</h1>):(
                <div>
                {Object.keys(headers[0]).map((keyName,keyIndex)=>(
                    <div key = {keyName}>
                    {keyName}
                    <br/>
                    {headers[0][keyName]}
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}

export default Headers;
