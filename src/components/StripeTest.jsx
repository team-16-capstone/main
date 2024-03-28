import React, { useState } from 'react';
import StripeContainer from "./StripeContainer";
import membercard from '../assets/membercard.png';

export default function StripeTest() {
    const [showItem, setShowItem] = useState(false);

    return (
        <div className="checkout">
            <h2>Membership</h2>
            <br/>
            {showItem ? <StripeContainer /> : <> <h3>$10</h3> <img src={membercard} alt="member card" />
                <button onClick={() => setShowItem(true)}>Purchase Membership</button></>}
        </div>
    );
}
