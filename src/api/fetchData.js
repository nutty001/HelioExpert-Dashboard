export const fetchData = async () => {
  try {
    const response = await fetch('/data.json');
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