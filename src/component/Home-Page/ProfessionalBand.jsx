import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../features/userActivities";
import _ from "lodash";
import Loading from "./Loading";
import { loadingVisibility } from "../../features/configurationsActivity";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const ProfessionalBand = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [data, setData] = useState([]);
  const [random, setRandom] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const getRandomNumber = () => {
    var min = 1;
    var max = 100;
    var rand = min + Math.random() * (max - min);
    setRandom({ rand });
  };

  const onCallHandler = (pid) => {
    dispatch(selectUser({ userid: pid }));
    let path = `/profile/${pid}`;
    history.push(path);
    //alert(pid);
  };

  useEffect(async () => {
    try {
      dispatch(loadingVisibility({ visibility: "true" }));

      let result = await fetch("http://localhost:5000/api/professional/0/6");

      result = await result.json();
      console.log("result " + result);
      setData(result);
      dispatch(loadingVisibility({ visibility: false }));
    } catch (e) {
      console.log(e);
    }
  }, []);
  //console.warn("resilt ",data);

  return (
    <main className="col-md-12">
      <Loading />

      <div className="row">
        <div>
          <div className="clearfix mt-5 mb-2">
            <h2 className="float-left">Recently</h2>
            <Link className="float-right text-uppercase" to="/">
              see all
            </Link>
          </div>
          <Slider {...settings}>
            {data.map(function (d) {
              return (
                <React.Fragment>
                  <div
                    onClick={() => onCallHandler(d[0])}
                    style={{ cursor: "pointer" }}
                  >
                    <Col>
                      <Card
                        class="product-grid"
                        style={{ backgroundColor: "rgb(16, 16, 16)",width:"80%" ,height:"50%"}}
                      >
                        <figure
                          className="card zoom"
                          style={{ backgroundColor: "rgb(16, 16, 16)" }}
                        >
                          <Card.Img
                            variant="center"
                            className=""
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            style={{ height: "50%", width: "auto" }}
                            src={
                              d[4] != null
                                ? "/assets/profileImg/" + d[0] + ".png"
                                : "https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"
                            }
                          />

                          <div class="product-content">
                            <Card.Body
                              style={{ color: "white", textAlign: "left" }}
                            >
                              <Card.Title>
                                <span>{d[1] || "No Name"}</span>
                                <i class="bi bi-balloon"></i>
                                <i class="bi bi-balloon-fill"></i>
                              </Card.Title>
                            </Card.Body>
                          </div>
                        </figure>
                      </Card>
                    </Col>
                  </div>
                </React.Fragment>
              );
            })}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default ProfessionalBand;
