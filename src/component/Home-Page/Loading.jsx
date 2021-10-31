import React from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Loading() {
    
    const visibility=useSelector((state)=>state.configActivity.value.visibility)

    console.log("visibility "+visibility);

    const main=`
    position:"absolute";
    bottom: "50%";
    right: "50%";
    left: "50%";
    top:"50%";
    `;

    return (
        <>
        {visibility=="true"?
        <main>
             <Spinner style={{position:"absolute",bottom: "50%",right: "50%",left: "50%",top:"50%"}} animation="grow" variant="success"  />
        </main>
        :""}
        </>
    )
}
