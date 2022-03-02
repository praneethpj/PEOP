import React from 'react'
import Headers from '../Home-Page/Header'
import Sidebar from './Side-bar'
import styled from 'styled-components';
import axios from 'axios';
 
import { Card } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { useState } from 'react';

export default function ProfileEdit() {

       const [pdet, setPdet] = useState({pname1: ""})
 


        const Centerdiv = styled.div `
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;
 

 
  const dropzoneContainer =styled.div  `
    height: 300;
    background: "#efefef";
    display: "flex";
    align-items: "center";
    justify-content: "center";
    border-style: "dashed";
    border-color: "#aaa";
  `;
 const previewimg =styled.div  `
    width: 250;
    height: 250;
    margin: "auto";
    display: "block";
    margin-bottom: theme.spacing(2);
    object-fit: "contain";
  `;
  
  const wrapper =styled.div  `
    margin: theme.spacing(1);
    position: "relative";
  `;

 
  const fabProgress  =styled.div  `
    color: green;
    position: "absolute";
    top: -6;
    left: -6;
    z-index: 1;
 `;
  const buttonProgress =styled.div  `
    color: green;
    position: "absolute";
    top: "50%";
    left: "50%";
    margin-top: -12;
    margin-left: -12;
    `;

   
  
 

 
 
 
  
  
    return (
       
       <>
        <Headers/>
        <Sidebar active="editprofile"/>
     
            
     <input className="form-control" type="text" placeholder="professionName" name="professionName" id="professionName"
                            value={
                                pdet.pname1
                            }
                            onChange={
                                (e) => setPdet({
                                    ...pdet,
                                    pname1: e.target.value
                                })
                            }
                           />
          
        </>
     
    )
}
