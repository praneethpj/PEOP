import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import _ from "lodash";
import Loading from "./Loading";
import { loadingVisibility } from "../../features/configurationsActivity";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const ProfessionType = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [data, setData] = useState([]);
  const [randomImg, setRandomImg] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const getImage = () => {
    let index = 0;
    let images = [];
    images[0] =
      "<a href = 'https://www.computerhope.com/'><img src='https://www.computerhope.com/banners/banner.gif' alt='Visit Computer Hope'></a>";
    images[1] =
      "<a href = 'https://www.computerhope.com/history'><img src='https://www.computerhope.com/banners/banner2.gif' alt='Computer History'></a>";
    images[2] =
      "<a href = 'https://www.computerhope.com/'><img src='https://www.computerhope.com/banners/banner3.gif' alt='Visit Computer Hope'></a>";
    index = Math.floor(Math.random() * images.length);
    setRandomImg(images[index]);
    //document.write(images[index]);
  };

  useEffect(async () => {
    try {
      dispatch(loadingVisibility({ visibility: "true" }));

      let result = await fetch(
        "https://peop-backend-app.herokuapp.com/api/professional/getAllProfessionType"
      );

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
            <h2 className="float-left">Type of Professions</h2>
            <Link className="float-right text-uppercase" to="/">
              see all
            </Link>
          </div>
          <Slider {...settings}>
            {data.map(function (d) {
              return (
                <React.Fragment>
                  <Link to={`/search/` + d}>
                    <Col>
                     
                      <Card style={{ height: "0%" }}>
                        {console.log(d.length)}
                        {d.length % 2 == 0 ? (
                          <Card.Img
                            variant="center"
                            src={`data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(106%2c 6%2c 221%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c480.453C90.774%2c483.112%2c171.972%2c435.123%2c251.737%2c391.711C337.238%2c345.177%2c437.551%2c306.81%2c480.006%2c219.212C522.667%2c131.188%2c486.517%2c28.85%2c474.658%2c-68.246C462.526%2c-167.577%2c464.085%2c-271.041%2c409.858%2c-355.144C351.463%2c-445.711%2c263.892%2c-516.799%2c162.29%2c-552.708C57.67%2c-589.684%2c-69.828%2c-616.883%2c-163.813%2c-557.897C-258.03%2c-498.765%2c-242.905%2c-355.865%2c-301.753%2c-261.47C-347.913%2c-187.427%2c-434.089%2c-147.239%2c-469.532%2c-67.509C-512.636%2c29.456%2c-572.714%2c145.006%2c-524.457%2c239.512C-475.896%2c334.612%2c-339.465%2c332.658%2c-242.434%2c377.235C-160.973%2c414.659%2c-89.608%2c477.828%2c0%2c480.453' fill='%235505b1'%3e%3c/path%3e%3cpath d='M1440 1082.671C1534.385 1064.3690000000001 1607.157 994.594 1676.492 927.989 1735.239 871.5550000000001 1772.601 801.404 1808.777 728.415 1846.147 653.018 1880.574 578.65 1891.025 495.152 1904.308 389.027 1949.6779999999999 259.818 1877.284 181.091 1804.399 101.82999999999998 1669.565 158.17700000000002 1563.594 139.07799999999997 1472.276 122.62 1387.113 50.53199999999998 1298.092 76.70400000000001 1209.073 102.87599999999998 1155.559 192.81599999999997 1108.606 272.845 1067.517 342.879 1073.616 426.656 1047.641 503.587 1013.9580000000001 603.349 916.188 687.4300000000001 933.563 791.282 951.26 897.057 1043.22 979.2760000000001 1136.176 1032.76 1226.973 1085.002 1337.162 1102.612 1440 1082.671' fill='%238018f9'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`}
                          />
                        ) : d.length%3==0?(
                          <Card.Img
                            variant="center"
                            src={`data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(235%2c 1%2c 54%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c480.453C90.774%2c483.112%2c171.972%2c435.123%2c251.737%2c391.711C337.238%2c345.177%2c437.551%2c306.81%2c480.006%2c219.212C522.667%2c131.188%2c486.517%2c28.85%2c474.658%2c-68.246C462.526%2c-167.577%2c464.085%2c-271.041%2c409.858%2c-355.144C351.463%2c-445.711%2c263.892%2c-516.799%2c162.29%2c-552.708C57.67%2c-589.684%2c-69.828%2c-616.883%2c-163.813%2c-557.897C-258.03%2c-498.765%2c-242.905%2c-355.865%2c-301.753%2c-261.47C-347.913%2c-187.427%2c-434.089%2c-147.239%2c-469.532%2c-67.509C-512.636%2c29.456%2c-572.714%2c145.006%2c-524.457%2c239.512C-475.896%2c334.612%2c-339.465%2c332.658%2c-242.434%2c377.235C-160.973%2c414.659%2c-89.608%2c477.828%2c0%2c480.453' fill='%23bc012b'%3e%3c/path%3e%3cpath d='M1440 1082.671C1534.385 1064.3690000000001 1607.157 994.594 1676.492 927.989 1735.239 871.5550000000001 1772.601 801.404 1808.777 728.415 1846.147 653.018 1880.574 578.65 1891.025 495.152 1904.308 389.027 1949.6779999999999 259.818 1877.284 181.091 1804.399 101.82999999999998 1669.565 158.17700000000002 1563.594 139.07799999999997 1472.276 122.62 1387.113 50.53199999999998 1298.092 76.70400000000001 1209.073 102.87599999999998 1155.559 192.81599999999997 1108.606 272.845 1067.517 342.879 1073.616 426.656 1047.641 503.587 1013.9580000000001 603.349 916.188 687.4300000000001 933.563 791.282 951.26 897.057 1043.22 979.2760000000001 1136.176 1032.76 1226.973 1085.002 1337.162 1102.612 1440 1082.671' fill='%23fe1d50'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`}
                          />
                        ):<Card.Img
                        variant="center"
                        src={`data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1002%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(230%2c 1%2c 235%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c480.453C90.774%2c483.112%2c171.972%2c435.123%2c251.737%2c391.711C337.238%2c345.177%2c437.551%2c306.81%2c480.006%2c219.212C522.667%2c131.188%2c486.517%2c28.85%2c474.658%2c-68.246C462.526%2c-167.577%2c464.085%2c-271.041%2c409.858%2c-355.144C351.463%2c-445.711%2c263.892%2c-516.799%2c162.29%2c-552.708C57.67%2c-589.684%2c-69.828%2c-616.883%2c-163.813%2c-557.897C-258.03%2c-498.765%2c-242.905%2c-355.865%2c-301.753%2c-261.47C-347.913%2c-187.427%2c-434.089%2c-147.239%2c-469.532%2c-67.509C-512.636%2c29.456%2c-572.714%2c145.006%2c-524.457%2c239.512C-475.896%2c334.612%2c-339.465%2c332.658%2c-242.434%2c377.235C-160.973%2c414.659%2c-89.608%2c477.828%2c0%2c480.453' fill='%23b801bc'%3e%3c/path%3e%3cpath d='M1440 1082.671C1534.385 1064.3690000000001 1607.157 994.594 1676.492 927.989 1735.239 871.5550000000001 1772.601 801.404 1808.777 728.415 1846.147 653.018 1880.574 578.65 1891.025 495.152 1904.308 389.027 1949.6779999999999 259.818 1877.284 181.091 1804.399 101.82999999999998 1669.565 158.17700000000002 1563.594 139.07799999999997 1472.276 122.62 1387.113 50.53199999999998 1298.092 76.70400000000001 1209.073 102.87599999999998 1155.559 192.81599999999997 1108.606 272.845 1067.517 342.879 1073.616 426.656 1047.641 503.587 1013.9580000000001 603.349 916.188 687.4300000000001 933.563 791.282 951.26 897.057 1043.22 979.2760000000001 1136.176 1032.76 1226.973 1085.002 1337.162 1102.612 1440 1082.671' fill='%23f91dfe'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1002'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`}
                      />
                        
                        }

                        <Card.ImgOverlay>
                          <Card.Body
                            style={{ color: "white", textAlign: "center" }}
                          >
                            <Card.Title>
                              <span>{d}</span>
                            </Card.Title>
                          </Card.Body>
                        </Card.ImgOverlay>
                      </Card>
                    </Col>
                  </Link>
                </React.Fragment>
              );
            })}
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default ProfessionType;
