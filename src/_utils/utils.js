// export async function fetchData(url) {
//     const fetch = require("node-fetch");

//     const options = {
//         method: "GET",
//         headers: {
//             accept: "application/json",
//         },
//     };

//     let response = await fetch(url, options);
//     let data = await response.json();
//     return data;
// }

// export function filterResults(data) {
//     let filteredData = data.results.filter(
//         (data) => data.media_type !== "person"
//     );
//     return filteredData;
// }

export async function fetchData(url) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { results: [] }; // 返回空數組以防止錯誤情況下的崩潰
    }
}

export function filterResults(data) {
    let filteredData = data.results.filter(
        (data) => data.media_type !== "person"
    );
    return filteredData;
}
