import NavBar from "./NavBar";
import { useState } from "react";

const Community = ({ auth })=> {

  return (
    <>
    <NavBar/>
    <h2>
      COMMUNITY
    </h2>
    <div id="community-body">
      <h3>
      FLEXBOX CONTAINER OF MOST RECENT EXPERIENCES CREATED BY USERS
      </h3>
    </div>
    </>
  );
};

export default Community;