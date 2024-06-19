/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { testApi } from "../../api/api";

const Homepage = () => {
  // Print Hello, when page load (automatic)

  useEffect(() => {
    console.log("Hello!!!!");

    // trigger api
    testApi().then((res) => {
      console.log(res);
    });
  });

  return <div>Home page</div>;
};

export default Homepage;
