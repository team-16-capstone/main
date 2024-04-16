const postNewExperience = async (formData, token) => {
  try {
    const response = await fetch(
      'https://pocket-butcher-backend.onrender.com/api/new-experience',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('Form submitted successfully:', data);
    } else {
      console.error('Form submission failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

export default postNewExperience;
