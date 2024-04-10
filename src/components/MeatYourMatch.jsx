import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const secretKey = import.meta.env.VITE_GOOGLE_API_KEY;

const PositionDetails = ({ position, selectedMeat }) => {
  return (
    <div key={position.id}>
      <br />
      <h3>{position.name}</h3>
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
      <br />
      {position.phonenumber && <p>Phone number: {position.phonenumber}</p>}
      <br />
      {position.meats && position.meats.length > 0 && (
        <>
          <h3>Available Meats:</h3>
          {position.meats.map((meat) => {
            if (meat.meat.name === selectedMeat) {
              return (
                <div key={meat.meatId}>
                  <p>Name: {meat.meat.name}</p>
                  <p>Description: {meat.meat.description}</p>
                  <p>Price: ${meat.price}</p>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

const defaultPosition = {
  name: 'Please click on one of the icons to display more information.',
};

const MeatYourMatch = () => {
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [positions, setPositions] = useState([]);
  const [meats, setMeats] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState('');

  const handleMarkerClick = async (markerId, position) => {
    const updatedPositions = positions.map((pos) => ({
      ...pos,
      selected: pos.id === markerId,
    }));
    setPositions(updatedPositions);
    setActiveMarkerId(markerId);
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

  const handleDropdownChange = async (event) => {
    const selectedName = event.target.value;
    const selectedPos = positions.find((pos) => pos.name === selectedName);

    if (selectedPos) {
      // Set selected property for the newly selected position
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
  };

  const handleMeatSelection = async (event) => {
    const selectedMeat = event.target.value;
    setSelectedMeat(selectedMeat);
  };

  const fetchAllButchers = async () => {
    try {
      const url = 'http://localhost:3001/api/butchers/';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching butchers:', error);
    }
  };

  const fetchAllMeats = async () => {
    try {
      const url = 'http://localhost:3001/api/meats/';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching meats:', error);
    }
  };

  const fetchButcherMeats = async (butcherId) => {
    try {
      const url = `http://localhost:3001/api/butchers/${butcherId}/meats`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching butcher meats:', error);
    }
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
      <h2>MEAT YOUR MATCH</h2>

      <div id='match-body'>
        <div>
          <label>
            Select a meat:
            <select value={selectedMeat} onChange={handleMeatSelection}>
              <option value='' disabled>
                Select a meat
              </option>
              {meats.map((meat) => (
                <option key={meat.id} value={meat.name}>
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
                    onClick={() => handleMarkerClick(position.id, position)}
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
