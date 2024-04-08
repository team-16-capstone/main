import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const secretKey = import.meta.env.VITE_GOOGLE_API_KEY;

const PositionDetails = ({ position }) => {
  return (
    <div>
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
    </div>
  );
};

const defaultPosition = {
  name: 'Please click on one of the icons to display more information.',
};

const MeatYourMatch = () => {
  const [search, setSearch] = useState('');
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [positions, setPositions] = useState([]);

  const handleMarkerClick = (markerId, position) => {
    const updatedPositions = positions.map((pos) => ({
      ...pos,
      selected: pos.id === markerId,
    }));
    setPositions(updatedPositions);
    setActiveMarkerId(markerId);
    setSelectedPosition(position);
  };

  const handleDropdownChange = (event) => {
    const selectedName = event.target.value;
    const updatedPositions = positions.map((pos) => ({
      ...pos,
      selected: pos.name === selectedName,
    }));
    const selectedPos = updatedPositions.find(
      (pos) => pos.name === selectedName
    );
    if (selectedPos) {
      setPositions(updatedPositions);
      setSelectedPosition(selectedPos);
    }
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

  return (
    <>
      <NavBar />
      <h2>MEAT YOUR MATCH</h2>
      <div id='match-body'>
        <div>
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
            {selectedPosition ? (
              <div style={{ flex: '1 1 auto' }}>
                <PositionDetails position={selectedPosition} />
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
