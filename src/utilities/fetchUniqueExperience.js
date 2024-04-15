const fetchUniqueExperience = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/experiences/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch experiences:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching experiences:', error);
  }
};

export default fetchUniqueExperience;
