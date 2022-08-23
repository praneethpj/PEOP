import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';
import Headers from './Header';
import Products from './Products';

import '../../styles/Filters.css'



export class Filters extends Component {
  render() {
    return (
      //style={{ backgroundColor: "rgb(16, 16, 16)" }}
      <div >

        {/* <div class="tcb-bs-fullscreen">

          <Carousel fade>
            <Carousel.Item>
              <div className="img-gradient carousel slide carousel-bg">
                <img
                  className="d-block w-100"
                  src="https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/560691cf8037ca3458f959d3454508a9.jpg"
                  alt="First slide"
                  style={{ backgroundImage: "linear-gradient(rgba(255, 0, 0, 0.45), rgba(255, 0, 0, 0.45));" }}
                />
              </div>
              <Carousel.Caption>
                <h1>Find a Profession</h1>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>

              <div className="img-gradient">
                <img
                  className="d-block w-100 "
                  src="https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/b47508f71e213ff92ad4bd122647e1fb.jpg"
                  alt="Second slide"
                />
              </div>

              <Carousel.Caption>
                <h1>Get the Contact</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="img-gradient">
                <img
                  className="d-block w-100"
                  src="https://img.indiefolio.com/fit-in/1100x0/filters:format(webp):fill(transparent)/project/body/4b74020d028c7286d24c604a7399b84e.jpg"
                  alt="Third slide"
                />
              </div>

              <Carousel.Caption>
                <h1>Enjoy Night</h1>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div> */}
        <br></br>
        <section className="">
          <div className="container">
            <div className="row">
             

              <Products />
            </div>
          </div>
        </section>

        {/* <footer className="section-footer border-top padding-y">
          <div className="container">
            <p className="float-md-right">
              &copy; Copyright 2021 All rights reserved
            </p>
            <p>
              <a href="#">Terms and conditions</a>
            </p>
          </div>
        </footer> */}


      </div>
    );
  }
}

export default Filters;
