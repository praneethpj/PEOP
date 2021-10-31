import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../features/authenticationActivities';
import Loading from './Loading';

const Headers = ()=> {
    const history = useHistory();
    const selectUser=useSelector((state)=>state.authActivity.user)
 
    const  dispatch = useDispatch();
  const handleLogout=()=>{
        dispatch(logout({}));


        
  }


  const handleLogin=()=>{
    history.push(`/signin`)
}
  const handleDashboard=()=>{
    history.push(`/dashboard`)
  }

        return (
            <div>
               
                <div class="clearfix">
  <div   role="status">
 
  </div>
</div>
                 <header className="section-header">
               <section className="header-main border-bottom">
                   <div className="container">
               <div className="row align-items-center">
                   <div className="col-lg-2 col-4">
                       <a href="#" onClick={()=>{history.push(`/`)}} className="brand-wrap">
                         Company Name
                       </a> 
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
                           <div className="widget-header  mr-3">
                               <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart"></i></a>
                               <span className="badge badge-pill badge-danger notify">0</span>
                           </div>
                           <div className="widget-header icontext">
                               <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-user"></i></a>
                               <div className="text">
                                   {/* <span className="text-muted">Welcome!</span> */}
                                     
                                       {   
                                          ((localStorage.getItem("token")!=null) && (selectUser!=null ))?
                                      
                                          <div>Hi <a href="#"  onClick={()=>{ handleDashboard()}}>{selectUser.user}</a> 
                                          <Button className="btn btn-danger" onClick={()=>{handleLogout()}}>Log out</Button>
                                          </div>:<Button  onClick={()=>{ handleLogin()}}>Sign in</Button>  
                                       
                                    }
                                   
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
