import { render } from "@testing-library/react";
import React, { Component } from "react";
import { useLocation } from "react-router-dom";

const Searchpage = (props) => {
  return <div>{console.log(props.match.params.keyword)}</div>;
};

export default Searchpage;
