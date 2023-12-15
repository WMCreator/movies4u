const API_URL = "https://api.themoviedb.org/3";
const API_IMAGES = "https://image.tmdb.org/t/p/original";
const API_COVER = "https://image.tmdb.org/t/p/w500";
const MOVIE_TRAILER = "https://www.youtube.com/watch?v=";

async function getPopularMovies(time) {
    try {
        const res = await fetch(`${API_URL}/trending/movie/${time}?api_key=${API_KEY}&language=es-MX`);
        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
    }
}

async function init() {
    await createBannerMovies();
    slider();
}

init();