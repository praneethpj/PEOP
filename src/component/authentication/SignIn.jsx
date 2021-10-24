import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {signedUser } from '../../features/authenticationActivities';
 
import Headers from '../Home-Page/Header';

export default function SignIn() {

    const [details,setDetails]=useState({name:"",username:"",email:"",password:""})
 
    const [login,setLogin]=useState({username:"",password:""})

    const selectUser=useSelector((state)=>state.authActivity.user)
   
    const history=useHistory();

    const  dispatch = useDispatch();

    if(selectUser!=null){
        history.push(`/dashboard`);
    }
    

//     const Layout=styled.div`
//       margin: auto;
//   width: 80%;
//   height: 80%;
//   padding: 20px;
//     `;

useEffect(async () => {
    //getAllData();
  
    // setData(result);
 
 }, [])

 const handleLoginSubmit=(e)=>{
     e.preventDefault();

     const loginData={
         "usernameOrEmail":login.username,
         "password":login.password
     }

     console.log("login "+loginData);
     axios.post('http://localhost:5000/api/auth/signin', loginData,{
         "headers": {
           'Content-Type': 'application/json',
         }})
         .then(response =>  {
             localStorage.setItem("token",response.data.accessToken);
              dispatch(signedUser({
            user:loginData.usernameOrEmail 
        }));
        })
         .catch(error => {
      
             console.log(error.response.data);
             // console.log(error.response.status);
             // console.log(error.response.headers);
         });
 }

    const handleSubmit=(e)=>{
       e.preventDefault();


 
       const signUp={
      
        "name":details.name,
        "username":details.username,
        "email":details.email,
        "password":details.password
    };
    console.log("signUp "+signUp);
    axios.post('http://localhost:5000/api/auth/signup', signUp,{
        "headers": {
          'Content-Type': 'application/json',
        }})
        .then(response => console.log(response))
        .catch(error => {
     
            console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
    
    
 

        // dispatch(signedUser({
        //     user:"praneeth" 
        // }));

        

        // console.log(selectUser);
    }

    

    return (
        <>
        <Headers/>
        <div className="login">
        <div class="d-flex p-2">
        <div className="col-md-8 ">
            <div className="row">
                <div className="col-md-6">
               
                <form className="login_form" onSubmit={(e)=>handleLoginSubmit(e)}>
           
                <input className="form-control" type="text" placeholder="Username" name="lusername" value={login.username} onChange={(e)=>setLogin({...details,username:e.target.value})}/>
   
                <input className="form-control" type="password" placeholder="Password" name="lpassword" id="lpassword" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})}/>

<button type="submit" className="btn btn-success" >
Submit
</button>
            </form>
                    </div>
                    <div className="col-md-6">
       
            <form className="login_form" onSubmit={(e)=>handleSubmit(e)}>
                <input className="form-control" type="text" placeholder="Name" name="name" value={details.name} onChange={(e)=>setDetails({...details,name:e.target.value})}/>
                <input className="form-control" type="text" placeholder="Username" name="username" id="username" value={details.username} onChange={(e)=>setDetails({...details,username:e.target.value})}/>
                <input className="form-control" type="text" placeholder="Email" name="email" id="email" value={details.email} onChange={(e)=>setDetails({...details,email:e.target.value})}/>
                <input className="form-control" type="password" placeholder="Password" name="password" id="password" value={details.password} onChange={(e)=>setDetails({...details,password:e.target.value})}/>

<button type="submit" className="btn btn-success" >
Submit
</button>
            </form>
            
      
        </div>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}
