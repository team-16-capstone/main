import NavBar from './NavBar';
import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import process from 'process';

// apiKey and mapId should be PRIVATE, this will be fixed! it's a client-sever issue

const MeatYourMatch = ({ auth }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const position = { lat: 40.716, lng: -73.984 };

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
            <Map zoom={15} center={position} mapId={'70d74e311a440c10'}>
              <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <Pin background={'grey'} borderColor={'red'}></Pin>
              </AdvancedMarker>

              {open && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpen(false)}
                >
                  <p>I am in the Lower East Side</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
};

export default MeatYourMatch;
