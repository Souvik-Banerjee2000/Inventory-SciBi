
import React from 'react'
import MultiselectForm from './MultiselectForm'

function Forms() {
    return (
        <div className="formComponent">
            <MultiselectForm endpoint="Whname" url= "http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="Whid" url="http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="Status" url="http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="ExpBucket" url="http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="Menuid" url="http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="Categoryname" url="http://127.0.0.1:5000/" />
            <MultiselectForm endpoint="Productname" url="http://127.0.0.1:5000/" />
        </div>
    )
}

export default Forms;
