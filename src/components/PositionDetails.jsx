import { useState } from 'react';

const PositionDetails = ({ position, selectedMeat, allButchersData }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const lowestPrice = allButchersData
    ? Math.min(...allButchersData.meats.map((meat) => meat.price))
    : null;

  return (
    <div id='match-right-container'>
    <div id='match-right-div' key={position.id}>
      <br />
      <h3 id='match-butch-name'>{position.name}</h3>
      {position.street &&
        position.city &&
        position.state &&
        position.zipcode && (
          <>
          <p>
            {' '}
            {position.street}
          </p>
          <p>
          {' '}
          {position.city +
            ', ' +
            position.state +
            ', ' +
            position.zipcode}
        </p>
        </>
        )}
      {position.phonenumber && <p>Phone number: {position.phonenumber}</p>}
      <br />
      {position.meats && position.meats.length > 0 && (
        <>
          <h3 id='match-butch-name'>Meat Selection:</h3>
          {position.meats.map((meat) => {
            if (meat.meat.name === selectedMeat) {
              return (
                <div key={meat.meatId}>
                  <p>{meat.meat.name}</p>
                  <p>Description: {meat.meat.description}</p>
                  <p id='match-meat-price'>
                    Price: ${meat.price}
                    {lowestPrice.toFixed(2) ===
                    parseFloat(meat.price).toFixed(2) ? (
                      <span> (LOWEST PRICE)</span>
                    ) : null}
                  </p>
                </div>
              );
            }
          })}
          <br />
          <button onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
            COMPARE PRICES
          </button>
          {isDetailsOpen && (
            <>
              <div key={allButchersData.id}>
                {allButchersData.meats && allButchersData.meats.length > 0 && (
                  <>
                    {allButchersData.meats
                      .filter((meat) => meat.meat.name.id === selectedMeat.id)
                      .map((meat, index) => {
                        const isLowestPrice =
                          parseFloat(meat.price).toFixed(2) ===
                          parseFloat(lowestPrice).toFixed(2);
                        if (allButchersData.name[index] !== position.name) {
                          return (
                            <div key={index}>
                              <p id='match-butch-name'>
                                {allButchersData.name[index]}
                              </p>{' '}
                              <p id='match-meat-price'>
                                Price: ${meat.price}
                                {isLowestPrice && <span> (LOWEST PRICE)</span>}
                              </p>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default PositionDetails;
