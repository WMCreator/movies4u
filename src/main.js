const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`, 
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'language': 'es-MX'
    }
});

const API_IMAGES = "https://image.tmdb.org/t/p/original";
const API_COVER = "https://image.tmdb.org/t/p/w500";
const MOVIE_TRAILER = "https://www.youtube.com/watch?v=";

async function getPopularMovies(time) {
    try {
        const { data } = await API(`/trending/movie/${time}`)
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function init() {
    await createBannerMovies();
    await createCategories();
    await createTrendingMovies();
    await createUpcomingMovies();
    slider();
}

init();