import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../features/authenticationActivities';
import {viewProfileAs} from '../../features/profileActivities';
import Loading from './Loading';

const Headers = ()=> {
    const history = useHistory();
    const selectUser=useSelector((state)=>state.authActivity.user)
    const viewUserAs=useSelector((state)=>state.profileActivity.viewas)



    const  dispatch = useDispatch();
  const handleLogout=()=>{
        dispatch(logout({}));


        
  }

  const handleHome=()=>{
    history.push(`/`)
}
  const handleLogin=()=>{
    history.push(`/signin`)
}
  const handleDashboard=()=>{
    history.push(`/dashboard`)
  }
  const handleView=(type)=>{
       
    dispatch(viewProfileAs({viewas:type}));
  }

        return (
            <div>
               
                <div class="clearfix">
  <div   role="status">
 
  </div>
</div>
                 <header className="section-header">
                 
               <section className="header-main border-bottom">
               
                   <div className="container-fluid">
                     <div className="widgets-wrap float-md-left">
  <div className="widget-header  mr-3">
                               <a href="#" onClick={()=>{ handleHome()}} className="icon icon-sm rounded-circle border"><i className="fa fa-home"></i></a>
                               
                           </div>
                          
                   </div>
               <div className="row align-items-center">
                   <div className="col-lg-2 col-4">
                    
                   </div>
                   <div className="col-lg-6 col-sm-12">
                       <form action="#" className="search">
                           <div className="input-group w-100">
                               <input type="text" className="form-control" placeholder="Search" />
                               <div className="input-group-append">
                                 <button className="btn btn-primary" type="submit">
                                   <i className="fa fa-search"></i>
                                 </button>
                               </div>
                           </div>
                       </form> 
                   </div> 
                   <div className="col-lg-4 col-sm-6 col-12">
                 
                       <div className="widgets-wrap float-md-right">
                         
                           <div className="widget-header icontext">
                              
                               <div className="text">
                                   {/* <span className="text-muted">Welcome!</span> */}
                                     
                                       {   
                                          ((localStorage.getItem("token")!=null) && (selectUser!=null ))?
                                      
                                          <div >
                                          <div class="dropdown">
  <button class="icon icon-sm rounded-circle border" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {/* Hi  {selectUser.user}  */}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#" onClick={()=>{ handleDashboard()}}>Dashboard</a>
     {viewUserAs.viewas=="1"?     <a class="dropdown-item" href="#"  onClick={()=>{handleView("2")}}>View as Professional</a>:    
                           <a class="dropdown-item" href="#"  onClick={()=>{handleView("1")}}>View as User</a>}
    <a class="dropdown-item" href="#" onClick={()=>{handleLogout()}}>Log out</a>
    
  </div>
</div>
                                           
                                          </div>:  <div className="widgets-wrap float-md-right"><Button className="btn btn-secondary" onClick={()=>{ handleLogin()}}>Sign in</Button>  </div>
                                       
                                    }
                                   
                               </div>
                                  <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                              <div className="widget-header  mr-3">
                               <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-bell"></i></a>
                               <span className="badge badge-pill badge-danger notify">0</span>
                           </div>
                               </div>
                           </div>
                           </div>
                          
                       </div> 
                       
                   </div> 
                   
               </div> 
               
                   </div> 
               </section>
               </header> 
            </div>
        )
  
}

export default Headers;
