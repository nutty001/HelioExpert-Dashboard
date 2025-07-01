export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/plant/SLM00E923M/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching solar data:", error);
    throw error; 
  }
}