import React from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ContentLoader, { Facebook, List } from 'react-content-loader'

export default function Loading(props) {

    const visibility = useSelector((state) => state.configActivity.value.visibility)

    console.log("visibility " + visibility);

    const main = `
    position:"absolute";
    bottom: "50%";
    right: "50%";
    left: "50%";
    top:"50%";
 
    `;

    
    
    return (
        <>
            {visibility == "true" ?
                <main className='col col-lg-12'>
                    {/* <Spinner style={{position:"absolute",width:"70%",bottom: "50%", left: "30%",top:"80%",display:"block",marginTop: "100"}} animation="grow" variant="success"  /> */}
                    {
                        <List style={{ position: "absolute", width: "70%", bottom: "50%", left: "30%", top: "80%", display: "block", marginTop: "100" , zIndex:11111111111111}} />

                    }

                </main>
                : ""}
        </>
    )
}
