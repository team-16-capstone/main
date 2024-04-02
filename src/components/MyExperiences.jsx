import NavBar from "./NavBar";
import { useState } from "react";

const MyExperiences = ({ auth })=> {

  return (
    <>
    <NavBar/>
    <h2>
      EXPERIENCE HISTORY
    </h2>
    <div id="exp-history-body">
      <h3>
      FLEXBOX CONTAINER OF MOST RECENT EXPERIENCES CREATED BY ME
      </h3>
    </div>
    </>
  );
};

export default MyExperiences;