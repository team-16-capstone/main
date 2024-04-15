import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import fetchAllButchers from '../utilities/fetchAllButchers';
import fetchAllMeats from '../utilities/fetchAllMeats';
import fetchButcherMeats from '../utilities/fetchButcherMeats';

const secretKey = import.meta.env.VITE_GOOGLE_API_KEY;

const PositionDetails = ({ position, selectedMeat, allButchersData }) => {
  const lowestPrice = allButchersData
    ? Math.min(...allButchersData.meats.map((meat) => meat.price))
    : null;

  return (
    <div key={position.id}>
      <br />
      <h3 id='match-butch-name'>{position.name}</h3>
      <br />
      {position.street &&
        position.city &&
        position.state &&
        position.zipcode && (
          <p>
            Address:{' '}
            {position.street +
              ', ' +
              position.city +
              ', ' +
              position.state +
              ', ' +
              position.zipcode}
          </p>
        )}
      {position.phonenumber && <p>Phone number: {position.phonenumber}</p>}
      <br />
      {position.meats && position.meats.length > 0 && (
        <>
          <h3 id='match-butch-name'>Meat information:</h3>
          {position.meats.map((meat) => {
            if (meat.meat.name === selectedMeat) {
              return (
                <div key={meat.meatId}>
                  <p>Name: {meat.meat.name}</p>
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
          <button onClick={() => setIsOpen(!isOpen)}>
            Compare prices at other locations:
          </button>
          {isOpen && (
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
          ;
        </>
      )}
    </div>
  );
};

const defaultPosition = {
  name: 'Please select a meat and a butcher to display pricing information.',
};

const MeatYourMatch = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [positions, setPositions] = useState([]);
  const [meats, setMeats] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState('');
  const [allButchersData, setAllButchersData] = useState({});
  const [isMeatAndButcherSelected, setIsMeatAndButcherSelected] =
    useState(false);

  const handleMarkerClick = async (markerId, position) => {
    const updatedPositions = positions.map((pos) => ({
      ...pos,
      selected: pos.id === markerId,
    }));
    setPositions(updatedPositions);
    setSelectedPosition(position);

    try {
      const meatsData = await fetchButcherMeats(position.id);
      setSelectedPosition((prevSelectedPosition) => ({
        ...prevSelectedPosition,
        meats: meatsData,
      }));
    } catch (error) {
      console.error('Error fetching butcher meats:', error);
    }
  };

  const handleMeatSelectionUpdate = async (selectedName) => {
    setSelectedPosition(null);

    const meatsLength = meats.length;
    let comparisonMeatIndex = 0;

    for (let i = 0; i < meatsLength; i++) {
      if (selectedMeat === meats[i].name) comparisonMeatIndex = i;
    }

    try {
      const butchers = await fetchAllButchers();
      let butcherNames = [];

      for (let i = 0; i < butchers.length; i++) {
        butcherNames.push(butchers[i].name);
      }
      let butchersLength = butchers.length;
      let allMeatData = [];
      for (let i = 1; i <= butchersLength; i++) {
        const allButcherMeats = await fetchButcherMeats(i);
        const meatData = allButcherMeats[comparisonMeatIndex];
        allMeatData.push(meatData);
      }
      const combinedData = {
        name: butcherNames,
        meats: allMeatData,
      };
      setAllButchersData(combinedData);
    } catch (error) {
      console.error('Error fetching all butcher meats:', error);
    }

    {
      const selectedPos = positions.find((pos) => pos.name === selectedName);
      if (selectedPos) {
        const updatedPositions = positions.map((pos) => ({
          ...pos,
          selected: pos === selectedPos,
        }));
        setPositions(updatedPositions);
        setSelectedPosition(selectedPos);

        try {
          const meatsData = await fetchButcherMeats(selectedPos.id);
          setSelectedPosition((prevSelectedPosition) => ({
            ...prevSelectedPosition,
            meats: meatsData,
          }));
        } catch (error) {
          console.error('Error fetching butcher meats:', error);
        }
      }
    }
    setIsMeatAndButcherSelected(true);
  };

  const handleDropdownChange = async (event) => {
    const selectedName = event.target.value;
    handleMeatSelectionUpdate(selectedName);
  };

  const handleMeatSelection = async (event) => {
    const selectedMeat = event.target.value;
    setSelectedMeat(selectedMeat);
    handleMeatSelectionUpdate(selectedPosition.name);
  };

  const resetMeatAndButcherSelection = () => {
    setSelectedPosition(null);
    setSelectedMeat('');
    setIsMeatAndButcherSelected(false);
    const updatedPositions = positions.map((pos) => ({
      ...pos,
      selected: false,
    }));
    setPositions(updatedPositions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllButchers();
        const transformedData = data.map((position) => ({
          ...position,
          lat: parseFloat(position.lat),
          lng: parseFloat(position.lng),
          selected: false,
        }));
        setPositions(transformedData);
      } catch (error) {
        console.error('Error fetching butchers:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllMeats();
        const transformedData = data.map((meat) => ({
          name: meat.name,
        }));
        setMeats(transformedData);
      } catch (error) {
        console.error('Error fetching meats:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div id='meat-header'>
        <h2>MEAT YOUR MATCH</h2>
      </div>
      <div id='match-body'>
        <div>
          <label>
            Select a meat:
            <select
              value={selectedMeat}
              onChange={handleMeatSelection}
              disabled={selectedPosition}
            >
              <option value='' disabled>
                Select a meat
              </option>
              {meats.map((meat, index) => (
                <option key={index} value={meat.name}>
                  {meat.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select a butcher:
            <select
              value={selectedPosition ? selectedPosition.name : ''}
              onChange={handleDropdownChange}
              disabled={!selectedMeat || isMeatAndButcherSelected}
            >
              <option value='' disabled>
                Select a butcher
              </option>
              {positions.map((position) => (
                <option key={position.id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </select>
          </label>
          {isMeatAndButcherSelected ? (
            <button onClick={resetMeatAndButcherSelection}>
              Refresh meat selection
            </button>
          ) : null}
        </div>

        <br />
        <APIProvider apiKey={secretKey}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                height: '60vh',
                width: '50%',
                flex: '1 1 auto',
                position: 'relative',
              }}
            >
              <Map
                zoom={13.3}
                center={{ lat: 40.745, lng: -73.984 }}
                mapId={'70d74e311a440c10'}
                zoomControl={true}
                gestureHandling={'greedy'}
                draggable={false}
              >
                {positions.map((position) => (
                  <AdvancedMarker
                    key={position.id}
                    position={{ lat: position.lat, lng: position.lng }}
                    onClick={() => {
                      isMeatAndButcherSelected
                        ? handleMarkerClick(position.id, position)
                        : null;
                    }}
                    ref={markerRef}
                  >
                    <Pin
                      background={position.selected ? 'blue' : 'grey'}
                      borderColor={'red'}
                    ></Pin>
                  </AdvancedMarker>
                ))}
              </Map>
            </div>

            {selectedPosition && selectedPosition !== defaultPosition ? (
              <div style={{ flex: '1 1 auto' }}>
                <PositionDetails
                  position={selectedPosition}
                  selectedMeat={selectedMeat}
                  allButchersData={allButchersData}
                />
              </div>
            ) : (
              <div>
                <PositionDetails position={defaultPosition} />
              </div>
            )}
          </div>
        </APIProvider>
      </div>
    </>
  );
};

export default MeatYourMatch;
