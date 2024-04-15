const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/users/${userId}`);
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
