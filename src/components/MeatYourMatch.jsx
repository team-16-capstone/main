import NavBar from "./NavBar";
import { useState } from "react";

const MeatYourMatch = ({ auth })=> {
  const [search, setSearch] = useState("");

  return (
    <>
    <NavBar/>
    <h2>
      MEAT YOUR MATCH
      </h2>
      <div id="match-body">
      <form>
      <label>Compare Prices:  
        <input
        type="text"
        placeholder="search meat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>
    <br/>
    <h3>
      <img src="https://www.google.com/maps/vt/data=8b94_7l6DRntDjkd1fMBvFleR-s_9RZHuda5sNH-GC9eNVu9f-3vdKygtehfVAlOFCnAmzLMDgb8ey8iVuCXKsaB1yjZsImC0pl2D1YsTcanggeQa2NMoebjrTUFl-5HaT5CivuzmAAO6jsfZeiVNNdpVFYhPLfnDV1XydP-L_Qx6ECzlFEn2V90ta_eHJJFPwWYEMDDa84aBsAQVoquVcWq5e84bRn4osWXRcTzqZRxNtz2ucIIeowPpqiRZyWOn_LVqnkRX_cdJXf9a7KeZQ" alt="map-image"/>
    </h3>
    </div>
    </>
  );
};

export default MeatYourMatch;