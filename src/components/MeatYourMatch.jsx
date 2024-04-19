import NavBar from './NavBar';
import Footer from './Footer';
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
import PositionDetails from './PositionDetails';
import cleaverpin from '../assets/cleaverpin.png';

const secretKey = import.meta.env.VITE_GOOGLE_API_KEY;

const defaultPosition = {
  name: 'Welcome to Meat Your Match®! ' + 'This feature is designed to provide you with the best price comparisons across all participating butchers ensuring you make the right decision in your every day meat purchases!' + ' Please select a meat and a butcher to display pricing information.'
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
      <div className='site-bg'>
      <br/>
      <div id='meat-header'>
        <h2>MEAT YOUR MATCH</h2>
      </div>
      <div id='community-body'>
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
              REFRESH
            </button>
          ) : null}
        </div>
        <APIProvider apiKey={secretKey}>
          <div id='match-contents-div' style={{ display: 'flex' }}>
            <div id='match-left-div'
              style={{
                height: '520px',
                width: '400px',
                flex: '1 1 auto',
                position: 'relative',
                margin: '20px 10px 0px 30px',
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
                      // img src={cleaverpin}
                      background={position.selected ? 'white' : 'grey'}
                      borderColor={'black'}
                    ></Pin>
                  </AdvancedMarker>
                ))}
              </Map>
            </div>

            {selectedPosition && selectedPosition !== defaultPosition ? (
              <div id='match-extra-space' style={{ flex: '1 1 auto' }}>
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
      <br/>
      </div>
      <Footer />
    </>
  );
};

export default MeatYourMatch;
