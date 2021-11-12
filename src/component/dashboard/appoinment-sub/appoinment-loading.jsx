import React from 'react'
import styled from 'styled-components';
import Table from 'react-bootstrap/Table'
 
export default function AppoinmentLoading(props) {
    console.log(props.details)
    const Centerdiv = styled.div `
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;

    const Tableload= styled.table `
    
    `;
    return (
        <Centerdiv>
            <Table stripped bordered hover size="sm"  >
            <thead>
    <tr>
      {/* <th>#</th> */}
      <th>Day</th>
      <th>Time</th>
 
    </tr>
  </thead>

  <tbody>
      
               {props.details.map((name)=>
               <tr key={name.dayname}>
                    <td>{name.dayname}</td>
                    <td>
                    {name.times.map((t2)=>{
                       
                     return t2.time.length<=0?<div key={t2.time}>None</div>: <div key={t2.time}>{t2.time}</div>
                    })}
                    </td> 
                   </tr>
               )}
             
             </tbody>
           </Table>
        </Centerdiv>
    )
}
