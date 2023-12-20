async function createTrendingMovies() {
    const trendingData = await getPopularMovies('day');
    const trending = trendingData.results.slice(0, 20);
    
    trending.forEach(movie => {
        const trendingContainer = document.querySelector('.trending__container');
        const html = `
            <article class="trending__movie">
                <a href="#" class="trending__movie--cover">
                    <img src="${API_IMAGES}/${movie.poster_path}" alt="${movie.title}" class="trending__movie">
                </a>
                <a href="#" class="trending__movie--add">
                    <img src="./assets/svg/remove-from-favorites.svg" alt="">
                </a>
            </article>
        `
        trendingContainer.innerHTML += html;
    });
}

async function getUpcomingMovies() {
    try {
        const { data } = await API('/movie/upcoming');
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function createUpcomingMovies() {
    const upcomingData = await getUpcomingMovies();
    const upcoming = upcomingData.results.slice(0, 20);
    
    upcoming.forEach(movie => {
        const upcomingContainer = document.querySelector('.upcoming__container');
        const html = `
            <article class="upcoming__movie">
                <a href="#" class="upcoming__movie--cover">
                    <img src="${API_IMAGES}/${movie.poster_path}" alt="${movie.title}" class="upcoming__movie">
                </a>
                <a href="#" class="upcoming__movie--add">
                    <img src="./assets/svg/remove-from-favorites.svg" alt="">
                </a>
            </article>
        `
        upcomingContainer.innerHTML += html;
    });
}