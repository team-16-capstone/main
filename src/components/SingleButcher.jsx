import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';

  const SingleButcher = ()=> {
    const [singleButcherData, setSingleButcherData] = useState(null);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSingleButcher = async () => {
        try {
          const url = `http://localhost:3001/api/butchers/${id}`;
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch (url, options);
          const responseData = await response.json();
          setSingleButcherData(responseData);
        } catch (error) {
          console.error("Error fetching butcher:", error)
        }
      };
      fetchSingleButcher();
    }, [id]);

    // if (!singleButcherData) {
    //     return <div>Loading...</div>;
    // }

  return (
    <>
    <NavBar/>
    <div id='single-butcher-container'>
        <div id='single-butcher-body' key={singleButcherData.id}>
          <h2>{singleButcherData.name}</h2>
      {/* <img src={book.coverimage} alt={`${book.img}'s image`} width="300" height="300" /> */}
          <h3>{singleButcherData.street}</h3>
          <h3>{singleButcherData.city}</h3>
          <h3>{singleButcherData.state}</h3>
          <h3>{singleButcherData.zipcode}</h3>
          <h3>{singleButcherData.phonenumber}</h3>
          <br />
          <br />
          <button onClick={() => navigate("/butchers")}>RETURN TO BUTCHERS</button>
      {/* {
      auth.id ? (
        <button onClick={() => checkout(book)}>CHECKOUT BOOK</button>
      ) : (null)
      }   */}
        </div>
    </div>
    </>
  );
};

export default SingleButcher;