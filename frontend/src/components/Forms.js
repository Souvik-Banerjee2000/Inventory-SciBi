
import React from 'react'
import MultiselectForm from './MultiselectForm'

function Forms() {
    const url = "http://127.0.0.1:5000/";
    return (
        <div className="formComponent">
            <MultiselectForm endpoint="Whname" url= {url} />
            <MultiselectForm endpoint="Whid" url={url} />
            <MultiselectForm endpoint="Status" url={url} />
            <MultiselectForm endpoint="ExpBucket" url={url} />
            <MultiselectForm endpoint="Menuid" url={url} />
            <MultiselectForm endpoint="Categoryname" url={url} />
            <MultiselectForm endpoint="Productname" url={url} />
        </div>
    )
}

export default Forms;
