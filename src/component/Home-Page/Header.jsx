import Button from '@restart/ui/esm/Button';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../features/authenticationActivities';
import { viewProfileAs } from '../../features/profileActivities';
import Notification from '../dashboard/Notification';
import Loading from './Loading';
import { ADropdown } from './sub/ADropdown';
import { NotificationDropdown } from './sub/NotificationDropdown';

import '../../styles/Header.css';

const Headers = () => {
    const history = useHistory();
    const selectUser = useSelector((state) => state.authActivity.user)
    const viewUserAs = useSelector((state) => state.profileActivity.viewas)

    const [bellCount, setBellCount] = useState(0);
    const [amessage, setMessage] = useState("");






    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout({}));



    }


    const handleHome = () => {
        history.push(`/`)
    }
    const handleLogin = () => {
        history.push(`/signin`)
    }

    const handleView = (type) => {

        dispatch(viewProfileAs({ viewas: type }));
    }

    return (
        <div>

            <section className="header-main">


                <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
                    <Container>
                        <Navbar.Brand href="/">PEOP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#howitiswork">How it is working</Nav.Link>
                                <Nav.Link href="#aboutus">About us</Nav.Link>
                                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            <Nav>
                                <Nav.Link>

                                    <div className="">
                                        {/* <span className="text-muted">Welcome!</span> */}

                                        {
                                            ((localStorage.getItem("token") != null) && (selectUser != null)) ?

                                                <div >

                                                    <div className="col-lg-4 col-sm-6 col-12">
                                                        <div className="widgets-wrap float-md-right">
                                                            <div className="widget-header  mr-3">
                                                                <ADropdown>
                                                                </ADropdown>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div> : <div className="col col-lg-12">
                          
                                         

                                                    
                                                    <button className="header-anim-button red-color"  onClick={() => { handleLogin() }} >
                                                        <div class="svg-wrapper-1">
                                                            <div class="svg-wrapper">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span >SignUp</span>
                                                    </button>
                                                    <button className="header-anim-button grey-color"  onClick={() => { handleLogin() }} >
                                                        <div class="svg-wrapper-1">
                                                             
                                                        </div>
                                                        <div >SignIn</div>
                                                    </button>


                                                </div>

                                        }

                                    </div>
                                </Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    <div className="">


                                        {((localStorage.getItem("token") != null) && (selectUser != null)) ?
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="widgets-wrap float-md-right">
                                                    <div className="widget-header  mr-3">
                                                        <NotificationDropdown message={amessage.data} />

                                                    </div>
                                                </div>
                                            </div>
                                            : ""}
                                    </div>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </section>



        </div>
    )

}

export default Headers;
