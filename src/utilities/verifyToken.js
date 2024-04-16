const verifyToken = async (token) => {
  const response = await fetch(
    'https://pocket-butcher-backend.onrender.com/api/verifytoken',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    throw new Error(message);
  }

  const result = await response.json();
  return result.userId;
};

export default verifyToken;
