import React from 'react'

export default function ProfileHistory(props) {
   // console.log(props.details.timeSlot.timeSlot);
    return (
        <div>

            <h1>My Professional Profile</h1>
            <h3>My Name is {props.details.name}</h3>
           <h3>I am a {props.details.profession_name}</h3>
           <h4> {props.details.description}</h4>
           <table>
               <th>
                   <td>Day</td>
                   <td>Time Slot</td>
               </th>
               {/* {props.details.timeSlot.timeSlot.map((id,name)=>
               <tr>
                    <td>{name.dayname}</td>
                    <td>{name.times}</td>
                   </tr>
               )} */}
             
           </table>
        </div>
    )
}
