const API_URL = "https://api.themoviedb.org/3";
const API_IMAGES = "https://image.tmdb.org/t/p/original";
const API_COVER = "https://image.tmdb.org/t/p/w500";
const MOVIE_TRAILER = "https://www.youtube.com/watch?v=";

async function init() {
    await createBannerMovies();
    slider();
}

init();