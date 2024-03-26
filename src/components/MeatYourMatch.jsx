import NavBar from "./NavBar";
import { useState } from "react";

const MeatYourMatch = ({ auth })=> {
  const [search, setSearch] = useState("");

  return (
    <>
    <NavBar/>
    <div>
      MEAT YOUR MATCH
    </div>
    <br/>
      <form>
      <label>Search 
        <input
        type="text"
        placeholder="search butcher or meat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>
    <div>
      MAP IMAGE
    </div>
    </>
  );
};

export default MeatYourMatch;