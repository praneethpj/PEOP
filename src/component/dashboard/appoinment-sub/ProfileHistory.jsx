import Button from '@restart/ui/esm/Button';
import React from 'react'
import  { useEffect } from "react";
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loadingVisibility } from '../../../features/configurationsActivity';
import AppoinmentLoading from './appoinment-loading';

export default function ProfileHistory(props) {
    const [times, setTimes] = React.useState([]);
    const [seconds, setSeconds] = React.useState(10);
    const [isLoading, setIsLoading] = React.useState(false);
    let time=props.details.timeSlot;
    const  dispatch = useDispatch();


useEffect(() => {
    dispatch(loadingVisibility({visibility:"true"}));
    if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 100);
      } else {
        setTimes(time.timeSlot);
    
        console.log(times);
        dispatch(loadingVisibility({visibility:"false"}));
      }
   
})
const Centerdiv = styled.div `
margin: auto;
width: 50%;

padding: 10px;

`;
// if (!Array.isArray(time)) {
//     return <p>There was an error loading your data!</p>;
//   }
const handleReset = () => {

}
    return (
        <Centerdiv>

            <h1>My Professional Profile</h1>
            <h3>My Name is {props.details.name}</h3>
           <h3>I am a {props.details.profession_name}</h3>
           <h4> {props.details.description}</h4>
           {isLoading ? <h3>Loading...</h3> : <AppoinmentLoading details={times}/>}
           <Button className="btn btn-warning" onClick={()=>handleReset}>Reset</Button>
        </Centerdiv>
    )
}
