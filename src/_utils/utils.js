export async function fetchData(url) {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return null;
  }
}