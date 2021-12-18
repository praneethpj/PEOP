import React, { useState } from 'react'
import { Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function AlertToast(props) {
    const [show, setShow] = useState(props.show);
    console.log("PROPS "+props.show);
    setTimeout(() => { if(show===true){
        setShow(false);
    }  }, 5000);
    return (
        <>
                <ToastContainer className="p-1" position="top-end">
             
             <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
               {/* <Toast.Header> */}
                 {/* <img
                   src="holder.js/20x20?text=%20"
                   className="rounded me-2"
                   alt=""
                 /> */}
                 {/* <strong className="me-auto">Error</strong> */}
                 {/* <small>11 mins ago</small> */}
               {/* </Toast.Header> */}
               <Toast.Body className="Danger" style={{color:"black"}}>{props.alertBody}</Toast.Body>
             </Toast>
          
           </ToastContainer>
        </>
    )
}
