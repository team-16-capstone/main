const fetchUserById = async (userId) => {
  try {
    const response = await fetch(
      `https://pocket-butcher-backend.onrender.com/api/users/${userId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

export default fetchUserById;
