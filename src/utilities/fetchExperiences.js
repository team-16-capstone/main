const fetchExperiences = async () => {
  try {
    const response = await fetch(
      'https://pocket-butcher-backend.onrender.com/api/experiences'
    );
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

export default fetchExperiences;
