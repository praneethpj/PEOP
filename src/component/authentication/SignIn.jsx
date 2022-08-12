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
import { Carousel, Col, Toast, ToastContainer } from 'react-bootstrap';
 

export default function SignIn() {
     
    const [details,setDetails]=useState({name:"",username:"",email:"",password:""})
 
    const [login,setLogin]=useState({username:"",password:""})

    const selectUser=useSelector((state)=>state.authActivity.user)
   
    const history=useHistory();

    const  dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const [alertBody,setalertBody]=useState("");

    if(localStorage.getItem("token")!=null && selectUser!=null){
        history.push(`/dashboard`);
    }
    
    const onCallSignup=()=>{
        
        let path = `/signup`; 
        history.push(path);
//alert(pid);

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

 const handleLoginSubmit=(e)=>{
     e.preventDefault();
     dispatch(loadingVisibility({visibility:"true"}));
     const loginData={
         "usernameOrEmail":login.username,
         "password":login.password
     }

     console.log("login "+loginData);
     axios.post('https://peop-backend-app.herokuapp.com/api/auth/signin', loginData,{
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
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log("error "+error.response.data.error);
                if(error.response.status===401){
                    setalertBody("Invalid Username or Password");
                    setShow(true);
                }
                 
              }
      
             // console.log(error.response.status);
             // console.log(error.response.headers);
         });
         dispatch(loadingVisibility({visibility:"false"}));
 }


    

    return (
        <>
        <Headers/>
    
        <Loading />
        <ToastContainer className="p-1" position="top-end">
             
             <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        
               <Toast.Body className="Danger" style={{color:"black"}}>{alertBody}</Toast.Body>
             </Toast>
          
           </ToastContainer>
        <div className="divider"  >
       
</div>
        <div className="container mt-5 mb-5">
        <div class="d-flex p-2">
        <div className="col-md-12 center-block">
            <div className="row">
                <div className="col-md-6">
                <div class="jumbotron">
  <h2 class="display-4">Hi Folk Back Again</h2>
  <p>
   We are glad to see you again.
</p>

</div>

                </div>
                
                <div className="col-md-6">
    
                <div class="col-md-12 col-sm-12 col-xs-12 ">
                <form className="login_form" onSubmit={(e)=>handleLoginSubmit(e)}>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control"  type="text" placeholder="Enter Your Username" name="lusername" value={login.username} onChange={(e)=>setLogin({...details,username:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                   
                    <input className="form-control"  placeholder="Enter password" type="password"   name="lpassword" id="lpassword" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})}/>
                </div>
   
                

<button type="submit" className="btn btn-primary btn-block" >
Submit
</button>
<p className="forgot-password text-right">
                    Dont have Account? <a href="#" onClick={()=>onCallSignup()}>sign up</a>
                </p>
            </form>
                    </div>
                    </div>
          
        </div>
        </div>
        </div>
        </div>
        </>
    )
}
