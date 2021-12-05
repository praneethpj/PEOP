import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../features/authenticationActivities';
import {viewProfileAs} from '../../features/profileActivities';
import Loading from './Loading';
import { ADropdown } from './sub/ADropdown';
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
  const handleNotification=()=>{
    history.push(`/notification`)
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
                 <header className="section-header"  style={{backgroundColor:"rgb(16, 16, 16)",color:"white"}}>
                 
               <section className="header-main ">
               
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
                           <div className="input-group col-md-12">
                <input className="form-control py-2 border-right-0 border" type="search" defaultValue="search" placeholder="I want a Mechaniery" id="example-search-input" />
                <span className="input-group-append">
                <div className="btn btn-outline-secondary border-left-0 border">
                <i className="fa fa-search"></i>
                </div>
                </span>
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
                                            
                                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                              <div className="widget-header  mr-3">
                              <ADropdown>
                                              </ADropdown>
                                              
                           </div>
                           
                               </div>
                           </div>
                                          </div>:  <div className="widgets-wrap float-md-right"><Button className="btn btn-secondary " onClick={()=>{ handleLogin()}}>Sign in</Button>  </div>
                                       
                                    }
                                   
                               </div>
                              {((localStorage.getItem("token")!=null) && (selectUser!=null ))?
                                  <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                                <div className="widget-header  mr-3">
                               <a href="#"  onClick={()=>{ handleNotification()}} className="icon icon-sm rounded-circle border"><i className="fa fa-bell"></i></a>
                               <span className="badge badge-pill badge-danger notify">0</span>
                           </div>
                               </div>
                           </div>
:""}
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
