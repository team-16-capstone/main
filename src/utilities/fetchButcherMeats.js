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

export default fetchButcherMeats;
