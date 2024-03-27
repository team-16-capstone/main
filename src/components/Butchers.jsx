import NavBar from "./NavBar";
import { useState } from "react";

const Butchers = ({ auth })=> {

  return (
    <>
    <NavBar/>
    <h2>
      BUTCHERS
    </h2>
    <div id="butcher-body">
      <h3>
      BUTCHER PROFILE
      </h3>
    </div>
    </>
  );
};

export default Butchers;