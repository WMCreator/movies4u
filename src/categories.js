async function getCategoryClassName (id) {
    const { data : { name }} = await API(`genre/${id}`, {
        params: {
            'language': 'en'
        }
    });

    return name.toLowerCase().split(' ').join('-');
}

async function createCategories() {
    const { data: { genres: categories } } = await API('genre/movie/list');

    categories.forEach(async category => {
        const categoriesContainer = document.querySelector('.categories__container');
        const categoryClassName = await getCategoryClassName(category.id)

        let html = `
            <a href="" class="categories__button category--${categoryClassName}">${category.name}</a>
        `;

        categoriesContainer.innerHTML += html;
    });
}