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

export function filterResults(data) {
    if (!data || !data.results) {
        return [];
    }

    const filteredData = data.results.filter(
        (data) => data.media_type !== "person"
    );

    return filteredData;
}

export async function fetchAndSetFavouriteMovies(callback) {
    const favMovies = JSON.parse(localStorage.getItem("favouriteMovies"));

    if (!favMovies) {
        return;
    }

    // try to find ids in movies
    const moviePromises = favMovies.map((movieId) => {
        const moviePromise = fetchData(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=bbd89781c7835917a2decb4989b56470`
        );
        return moviePromise;
    });

    const movies = await Promise.all(moviePromises);

    const filteredMovies = movies.map((res) => ({
        id: res.id,
        title: res.title,
        name: res.name,
        poster_path: res.poster_path,
    }));

    callback(filteredMovies);
}

export async function fetchAndSetFavouriteTv(callback) {
    const favTv = JSON.parse(localStorage.getItem("favouriteTv"));

    if (!favTv) {
        return;
    }

    const tvPromises = favTv.map((tvId) => {
        const tvShow = fetchData(
            `https://api.themoviedb.org/3/tv/${tvId}?api_key=bbd89781c7835917a2decb4989b56470`
        );
        return tvShow;
    });
    const tvShows = await Promise.all(tvPromises);
    const filteredTv = tvShows.map((res) => ({
        id: res.id,
        title: res.title,
        name: res.name,
        poster_path: res.poster_path,
    }));
    callback(filteredTv);
}
