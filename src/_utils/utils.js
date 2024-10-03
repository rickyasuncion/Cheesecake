export async function fetchData(url) {
    const fetch = require("node-fetch");

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    };

    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}

export function filterResults(data) {
    let filteredData = data.results.filter(
        (data) => data.media_type !== "person"
    );
    return filteredData;
}