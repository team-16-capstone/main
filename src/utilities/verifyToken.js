const verifyToken = async (token) => {
  const response = await fetch('http://localhost:3001/api/verifytoken', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    throw new Error(message);
  }

  const result = await response.json();
  return result.userId;
};

export default verifyToken;
