import React from 'react'
import Headers from '../Home-Page/Header'
import Sidebar from './Side-bar'
import styled from 'styled-components';

export default function DashboardProfile() {
        const Centerdiv = styled.div `
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;
    return (
       
       <>
        <Headers/>
        <Sidebar active="profile"/>
      
        <Centerdiv>
         <form>

            <input type="text" className="form-control" placeholder="name"/>

         </form>
         </Centerdiv>
      

        </>
     
    )
}
