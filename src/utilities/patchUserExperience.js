const patchUserExperience = async (experienceId, token, experience) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/experiences/${experienceId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          butcher: experience.butcher,
          date: experience.date,
          meats: experience.meats,
          price: experience.price,
          rating: experience.rating,
          review: experience.review,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

export default patchUserExperience;
