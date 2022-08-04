import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import {signedUser } from '../../features/authenticationActivities';
import { loadingVisibility } from '../../features/configurationsActivity';
 
import Headers from '../Home-Page/Header';
import Loading from '../Home-Page/Loading';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "../../styles/Auth.css";

export default function Signup() {

    const [details,setDetails]=useState({name:"",username:"",email:"",password:""})
 
    const [login,setLogin]=useState({username:"",password:""})

    const selectUser=useSelector((state)=>state.authActivity.user)
   
    const history=useHistory();

    const  dispatch = useDispatch();

    if(localStorage.getItem("token")!=null && selectUser!=null){
        history.push(`/dashboard`);
    }
    

    const addNotify=(t,e)=> {
        store.addNotification({
            title: t,
            message: e,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
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

//  const handleLoginSubmit=(e)=>{
//      e.preventDefault();
//      dispatch(loadingVisibility({visibility:"true"}));
//      const loginData={
//          "usernameOrEmail":login.username,
//          "password":login.password
//      }

//      console.log("login "+loginData);
//      axios.post('https://peop-backend-app.herokuapp.com/api/auth/signin', loginData,{
//          "headers": {
//            'Content-Type': 'application/json',
//          }})
//          .then(response =>  {
//              localStorage.setItem("token",response.data.accessToken);
//               dispatch(signedUser({
//             user:loginData.usernameOrEmail 
//         }));
//         })
//          .catch(error => {
      
//              console.log(error.response);
//              // console.log(error.response.status);
//              // console.log(error.response.headers);
//          });
//          dispatch(loadingVisibility({visibility:"false"}));
//  }

    const handleSubmit=(e)=>{
       e.preventDefault();
       dispatch(loadingVisibility({visibility:"true"}));

 
       const signUp={
      
        "name":details.name,
        "username":details.username,
        "email":details.email,
        "password":details.password
    };
    console.log("signUp "+signUp);
    axios.post('https://peop-backend-app.herokuapp.com/api/auth/signup', signUp,{
        "headers": {
          'Content-Type': 'application/json',
        }})
        .then(response => {console.log(response);addNotify("Success",JSON.stringify(response.data.message));})
        .catch(error => {
             addNotify("Error",JSON.stringify(error.response.data.message));
            console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
    
    
 

        // dispatch(signedUser({
        //     user:"praneeth" 
        // }));

        
        dispatch(loadingVisibility({visibility:"false"}));
        // console.log(selectUser);
    }

    const onCallSignin=()=>{
        
        let path = `/signin`; 
        history.push(path);
//alert(pid);

     }

    return (
        <>
        <Headers/>
        <ReactNotification />
        <Loading />
        <div className="container mt-5 mb-5">
        <div class="d-flex p-2">
        <div className="col-md-12 center-block">
            <div className="row">
        
                <div className="col-md-6">
{/*                
                <form className="login_form" onSubmit={(e)=>handleLoginSubmit(e)}>
           
                <input className="form-control" type="text" placeholder="Username" name="lusername" value={login.username} onChange={(e)=>setLogin({...details,username:e.target.value})}/>
   
                <input className="form-control" type="password" placeholder="Password" name="lpassword" id="lpassword" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})}/>

<button type="submit" className="btn btn-success" >
Submit
</button>
            </form> */}
                    </div>
                    <div className="col-md-6">
       
            <form className="login_form" onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group">
                    <label>Your Name</label>
                    <input className="form-control" type="text" placeholder="Enter Your Name" name="name" value={details.name} onChange={(e)=>setDetails({...details,name:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Your Username</label>
                    <input className="form-control" type="text" placeholder="Enter a Username" name="username" id="username" value={details.username} onChange={(e)=>setDetails({...details,username:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Your Email</label>
                    <input className="form-control" type="email" placeholder="Enter Your Email" name="email" value={details.email} onChange={(e)=>setDetails({...details,email:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Your Password</label>
                    <input className="form-control" type="password" placeholder="Enter your Password" name="password" id="password" value={details.password} onChange={(e)=>setDetails({...details,password:e.target.value})}/>
                </div>
                
               
                

<button type="submit" className="btn btn-primary btn-block" >
Submit
</button>
 
<p className="forgot-password text-right">
                    Do you have an Account? <a href="#" onClick={()=>onCallSignin()}>sign in</a>
                </p>
            </form>
            
      
        </div>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}
