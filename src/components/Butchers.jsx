import NavBar from "./NavBar";
import { useState } from "react";

const Butchers = ({ auth })=> {

  return (
    <>
    <NavBar/>
    <div id="butcher-body">
    <h2>
      BUTCHERS
    </h2>
      <h3>
      BUTCHER PROFILE
      </h3>
    </div>
    </>
  );
};

export default Butchers;