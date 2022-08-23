import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ProductList from './ProductList'
import { selectUser } from '../../features/userActivities'
import _ from "lodash";
import Loading from './Loading';
import { loadingVisibility } from '../../features/configurationsActivity';
import '../../styles/Homecomponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaBeer } from 'react-icons/fa';
import { VscLaw } from "react-icons/vsc";
import { MdOutlinePsychology } from "react-icons/md";
import { faStethoscope } from '@fortawesome/fontawesome-free-solid'
import ContentLoader, { Facebook } from 'react-content-loader'
import { Code } from 'react-content-loader'

const Products = () => {

    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    const [offset, setOffset] = useState(0);
    const [perPage, setPerpage] = useState(10);
    const [pageCount, setPagecount] = useState([]);

    const details = {
        name: "praneeth",
        price: "50"
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

    const getMore = async (n) => {
        try {
            dispatch(loadingVisibility({ visibility: "true" }));


            let result = await fetch("/api/professional/" + n + "/" + perPage);



            result = await result.json();

            setData(result);
            dispatch(loadingVisibility({ visibility: false }));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(async () => {
        //getAllData();
        try {
            dispatch(loadingVisibility({ visibility: "true" }));

            let allCount = await fetch(process.env.REACT_APP_BACKEND_URL+"api/professional/allcount");
            setPagecount(Math.ceil(allCount.length / perPage));

            let result = await fetch(process.env.REACT_APP_BACKEND_URL+"api/professional/" + offset + "/" + perPage);



            result = await result.json();
            console.log("len " + Math.ceil(result.length / perPage));
            setData(result);
            dispatch(loadingVisibility({ visibility: false }));
        } catch (e) {
            console.log(e);
        }
    }, [])
    //console.warn("resilt ",data);

    const onCallHandler = (pid) => {
        dispatch(selectUser({ userid: pid }));
        let path = `/profile/${pid}`;
        history.push(path);
        //alert(pid);

    }
    return (

        <div>
            <Loading count={5} />
            <main className="col col-md-12" >
                
                <div>

                    <div className="buttonRoller">
                        <div className='contents'>

                            <div className="inside">
                                <div className='insidebody'>
                                    <div>
                                        <FontAwesomeIcon icon={faStethoscope} />
                                    </div>
                                    <span>
                                        Doctors
                                    </span>
                                </div>
                            </div>
                            <div className="inside">
                                <div className='insidebody'>
                                    <div>
                                        <FaBeer />
                                    </div>

                                    <span>
                                        Teachers
                                    </span>
                                </div>
                            </div>
                            <div className="inside">
                                <div className='insidebody'>
                                    <div>
                                        <VscLaw />
                                    </div>

                                    <span>
                                        Lawyers
                                    </span>
                                </div>
                            </div>
                            <div className="inside">
                                <div className='insidebody'>
                                    <div>
                                        <MdOutlinePsychology />
                                    </div>

                                    <span>
                                        Lawyers
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">


                    {console.log(data)}
                   
                   
                    {data.map((d) =>

                        <div className="col-md-3 col-sm-6" onClick={() => onCallHandler(d[0])} style={{ cursor: 'pointer' }}>
                            <div class="product-grid">
                                <figure className="card card-product-grid"  >
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

                                                src={d[4] != null ? "/assets/profileImg/" + d[0] + ".png" : "https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"}

                                            />
                                            {/* <a className="btn-overlay" href="#"><i className="fa fa-search-plus"></i> Quick view</a> */}
                                        </div>
                                    </div>
                                    <div class="product-content">
                                        <figcaption className="info-wrap" style={{ textAlign: 'left' }}>
                                            <div className="fix-height">
                                                <h3 class="title">{d[1] || "No Name"}</h3>
                                                <div className="price-wrap mt-2">
                                                    <h4 class="title"> <span className="price-old">{d[3]}</span></h4>
                                                    <br />
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
                {pageCount >= 10 ?
                    <nav className="mt-4" aria-label="Page navigation sample">
                        <ul className="pagination">
                            <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                            {/* <li className="page-item active"><a className="page-link" href="#">1</a></li>
                   <li className="page-item"><a className="page-link" href="#">2</a></li>
                   <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                            {
                                _.times(pageCount, (i) => (
                                    <li key={i} className="page-item" onClick={() => getMore(i)}><a className="page-link" href="#">{i}</a></li>
                                ))

                            }
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                    : ""}
            </main>

        </div>
    )

}

export default Products