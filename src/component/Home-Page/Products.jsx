import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ProductList from './ProductList'
import {selectUser} from '../../features/userActivities'
 
import Loading from './Loading';
import  { loadingVisibility } from '../../features/configurationsActivity';
const Products =() =>{

    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    const details={
         name:"praneeth",
         price:"50"
     };
    //  const getAllData = () => {
    //     axios.get("https://jsonplaceholder.typicode.com/users")
    //     .then((response) => {
    //    // 
    //     setData({data:response.data});
    //     })
    //     .catch((error) => {
    //     console.log(error);
    //     });
    //     };

     useEffect(async () => {
        //getAllData();
       try{
        dispatch(loadingVisibility({visibility:"true"}));
       
        let result=await fetch("http://localhost:5000/api/professional/");
        
        result = await result.json();
        setData(result);
        dispatch(loadingVisibility({visibility:false}));
       }catch(e){
        console.log(e);
       }
     }, [])
     //console.warn("resilt ",data);
 
     const onCallHandler=(pid)=>{
        dispatch(selectUser({userid:pid}));
        let path = `/profile/${pid}`; 
        history.push(path);
//alert(pid);

     }
        return (
            
                 
                <main className="col-md-12" >
                       <Loading />
               <header className="mb-4 pb-3">
                       <div className="form-inline">
                           <span className="mr-md-auto"><h2>Newly Professions</h2></span>
                           {/* <select className="mr-2 form-control">
                               <option>Latest items</option>
                               <option>Trending</option>
                               <option>Most Popular</option>
                               <option>Cheapest</option>
                           </select> */}
                           {/* <div className="btn-group">
                               <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                                   <i className="fa fa-bars"></i></a>
                               <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                                   <i className="fa fa-th"></i></a>
                           </div> */}
                       </div>
               </header>
               <div className="row">

                
              {  console.log(data)}
               {data.map((d) =>  
            
              <div className="col-md-3 col-sm-6" onClick={()=>onCallHandler(d[0])} style={{cursor:'pointer'}}>
                    <div class="product-grid">
              <figure className="card card-product-grid" style={{backgroundColor:"rgb(16, 16, 16)"}}>
                  <div className="img-wrap"> 
                  <div class="product-image">
                      {/* <span className="badge badge-danger"> NEW </span> */}
                      {/* <img src="assets/images/items/1.jpg" style={{position:'relative'}} class="zoom"/> */}
                        <img
            className="zoom"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
          
            src={ d[4]!=null?"/assets/profileImg/"+d[0]+".png" :"https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"}  
            
           />
                      {/* <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a> */}
                  </div> 
                  </div>
                  <div class="product-content">
                  <figcaption className="info-wrap" style={{textAlign:'left'}}>
                      <div className="fix-height">
                      <h3 class="title">{d[1]||"No Name"}</h3>
                          <div className="price-wrap mt-2">
                          <h4 class="title"> <span className="price-old">{d[3]}</span></h4>
                              <br/>
                              <span className="price">{d[3]}</span>
                             
                          </div>
                      </div>
                      {/* <Button  onClick={()=>onCallHandler(d.id)} className="btn btn-block btn-primary">Call</Button> */}
                  </figcaption>
                  </div>
              </figure>
              </div>
          </div> 

       )}
                   
                    
               </div> 
               <nav className="mt-4" aria-label="Page navigation sample">
                 <ul className="pagination">
                   <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                   <li className="page-item active"><a className="page-link" href="#">1</a></li>
                   <li className="page-item"><a className="page-link" href="#">2</a></li>
                   <li className="page-item"><a className="page-link" href="#">3</a></li>
                   <li className="page-item"><a className="page-link" href="#">Next</a></li>
                 </ul>
               </nav>
                   </main>
          
           
        )
 
}

export default Products