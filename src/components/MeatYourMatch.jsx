import NavBar from './NavBar';
import { useState } from 'react';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';


// API KEY and map ID should not be hard coded, that will be resolved later. It's a quick client-server fix

const MeatYourMatch = () => {
  const [search, setSearch] = useState('');
  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const toggleInfoWindow = (markerId) => {
    console.log(markerId, activeMarkerId);
    setActiveMarkerId(markerId === activeMarkerId ? null : markerId);
  };

  // If our butchers have lat and lng as rows in their models, we could map over them instead of hard coding positions

  const positions = [
    {
      id: '1',
      lat: 40.75644631753445,
      lng: -73.99435489999999,
      name: 'Esposito Meat Market',
    },
    {
      id: '2',
      lat: 40.75839054564528,
      lng: -73.9929978266508,
      name: 'Another Meat Market',
    },
  ];

  return (
    <>
      <NavBar />
      <h2>MEAT YOUR MATCH</h2>
      <div id='match-body'>
        <form>
          <label>
            Search
            <input
              type='text'
              placeholder='search butcher or meat...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </form>
        <APIProvider apiKey='AIzaSyCtFRXZffWGD5Pz-JQd799Vhg4oxoaUI4A'>
          <div style={{ height: '50vh' }}>
            <Map
              zoom={14}
              center={{ lat: 40.75, lng: -73.984 }}
              mapId={'70d74e311a440c10'}
            >
              {positions.map((position) => (
                <AdvancedMarker
                  key={position.id}
                  position={{ lat: position.lat, lng: position.lng }}
                  onClick={() => toggleInfoWindow(position.id)}
                >
                  <Pin background={'grey'} borderColor={'red'}></Pin>
                  {activeMarkerId === position.id && (
                    <InfoWindow
                      anchor={{
                        position: { lat: position.lat, lng: position.lng },
                        offset: [0, -10],
                      }}
                      onCloseClick={() => toggleInfoWindow(null)}
                    >
                      <p>{position.name}</p>
                    </InfoWindow>
                  )}
                </AdvancedMarker>
              ))}
            </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
};

export default MeatYourMatch;
