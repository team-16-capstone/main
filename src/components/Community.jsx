import NavBar from "./NavBar";
import { useState } from "react";

const Community = ({ auth })=> {

  return (
    <>
    <NavBar/>
    <div id="community-body">
    <h2>
      COMMUNITY
    </h2>
      <h3>
      FLEXBOX CONTAINER OF MOST RECENT EXPERIENCES CREATED BY USERS
      </h3>
    </div>
    </>
  );
};

export default Community;