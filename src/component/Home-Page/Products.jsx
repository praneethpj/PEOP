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
            
                 
                <main className="col-md-9">
                       <Loading />
               <header className="border-bottom mb-4 pb-3">
                       <div className="form-inline">
                           <span className="mr-md-auto">32 Items found </span>
                           <select className="mr-2 form-control">
                               <option>Latest items</option>
                               <option>Trending</option>
                               <option>Most Popular</option>
                               <option>Cheapest</option>
                           </select>
                           <div className="btn-group">
                               <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view"> 
                                   <i className="fa fa-bars"></i></a>
                               <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view"> 
                                   <i className="fa fa-th"></i></a>
                           </div>
                       </div>
               </header>
               <div className="row">

              
               {data.map((d) =>  
              
              <div className="col-md-4">
              <figure className="card card-product-grid">
                  <div className="img-wrap"> 
                      <span className="badge badge-danger"> NEW </span>
                      <img src="assets/images/items/1.jpg" />
                      {/* <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a> */}
                  </div> 
                  <figcaption className="info-wrap">
                      <div className="fix-height">
                          <a href="#" className="title">{d.name||"No Name"}</a>
                          <div className="price-wrap mt-2">
                             <span className="price-old">{d.profession_name}</span>
                              <br/>
                              <span className="price">{d.chargesperHour}</span>
                             
                          </div>
                      </div>
                      <Button  onClick={()=>onCallHandler(d.id)} className="btn btn-block btn-primary">Call</Button>
                  </figcaption>
              </figure>
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