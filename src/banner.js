const bannerContainer = document.querySelector('.banner__container');
const bannerMoviesId = [];

let movieWidth;

async function getBannerMovies() {
    try {
        const res = await fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}&language=es-MX`);
        const data = await res.json();
    
        const banners = data.results.slice(0, 3);

        banners.forEach(movie => {
            bannerMoviesId.push(movie.id);
        });

    } catch (err) {
        console.log(err);
    }
}

async function createBannerMovies() {
    await getBannerMovies();

    bannerMoviesId.forEach(async id => {
        try {
            const getMovieData = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
            const movie = await getMovieData.json();

            const getTrailerData = await fetch(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-MX`);
            const trailerData = await getTrailerData.json();
            const trailer = trailerData.results.find(result => result.type == "Trailer");
            console.log(trailer);

            let html;

            if(!trailer) {
                html = `
                    <section class="banner__movie movie">
                        <img class="movie__background" src="${API_IMAGES}/${movie.backdrop_path}" alt="${movie.title}">
                        <div class="movie__info">
                            <img class="movie__cover" src="${API_IMAGES}/${movie.poster_path}" alt="${movie.title}">
                            <div class="movie__description">
                                <div class="movie__description--title">
                                    <h2>${movie.title}</h2>
                                    <div>
                                        <p class="movie__description--year">${movie.release_date.split('-')[0]}</p>
                                        <p class="movie__description--tag">${movie.genres[0].name}</p>
                                    </div>
                                </div>
                                <p class="movie__description--text">${movie.overview}</p>
                            </div>
                        </div>
                    </section>
                `
            } else {
                html = `
                    <section class="banner__movie movie">
                        <img class="movie__background" src="${API_IMAGES}/${movie.backdrop_path}" alt="${movie.title}">
                        <div class="movie__info">
                            <img class="movie__cover" src="${API_IMAGES}/${movie.poster_path}" alt="${movie.title}">
                            <div class="movie__description">
                                <div class="movie__description--title">
                                    <h2>${movie.title}</h2>
                                    <div>
                                        <p class="movie__description--year">${movie.release_date.split('-')[0]}</p>
                                        <p class="movie__description--tag">${movie.genres[0].name}</p>
                                    </div>
                                </div>
                                <p class="movie__description--text">${movie.overview}</p>
                                <button onclick="location.href='${MOVIE_TRAILER}${trailer.key}'" class="movie__description--button">
                                    <img class="movie__button--img" src="./assets/svg/play-icon.svg" alt="">
                                    Ver Tráiler
                                </button>
                            </div>
                        </div>
                    </section>
                `
            }

            bannerContainer.innerHTML += html
            movieWidth = document.querySelector('.movie').offsetWidth;
        } catch (err) {
            console.log(err)
        }
    })
}

function slider() {
    const dotsContainer = document.querySelector('.dots_container');
    const dots = dotsContainer.querySelectorAll('.dot');
    
    const interval = 8000; 
    
    function scrollSlider() {
        const scrollPosition = bannerContainer.scrollLeft;
        
        const newPosition = scrollPosition + movieWidth;
        
        bannerContainer.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
        
        if (newPosition >= bannerContainer.scrollWidth - bannerContainer.offsetWidth) {
            bannerContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }
    
    let scrollTimer = null;
    
    function identifyCurrentBanner() {
        clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(() => {
            currentBannerIndex = Math.floor(bannerContainer.scrollLeft / movieWidth);
            
            updateBannerDots();
        }, 200); 
    }
    
    function updateBannerDots() {
        dots.forEach((dot, index) => {
            if (index === currentBannerIndex) {
                dot.classList.add('dot--active');
            } else {
                dot.classList.remove('dot--active');
            }
        });
    }
    
    bannerContainer.addEventListener('scroll', identifyCurrentBanner);
    
    setInterval(scrollSlider, interval);
}