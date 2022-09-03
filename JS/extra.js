const cardsContainer = document.getElementById('cards-container')

console.log('connected')

const findCategories = (id) => {
    // spinner start
    loadingSpinner(true)
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data))
        // .catch(error => console.log(error))
}


const displayNews = (allNewsCategories) => {

    const viewCategories = allNewsCategories.data;
    // console.log(viewCategories.length)
    const resultsContainer = document.getElementById('results-container')

    const resultFound = document.getElementById('founded-results')
    resultFound.textContent = '';

    if (viewCategories.length === 0) {
        // console.log('No News Found In This Category')
        resultFound.innerText = 'News Not Found In This Category';
        resultsContainer.classList.remove('d-none')
        cardsContainer.textContent = '';
        //spinner stop
        loadingSpinner(false)
        // const spinner = document.getElementById('spinner')
        return
    }

    else {
        // console.log(viewCategories.length + ' News Found In This Category')
        resultFound.innerText = viewCategories.length + ' News Found In This Category';
        resultsContainer.classList.remove('d-none')

    }

    cardsContainer.textContent = '';

    viewCategories.forEach(singleCategories => {
        const { title, image_url, thumbnail_url, details, author, total_view, rating } = singleCategories

        const CardDiv = document.createElement('div')
        CardDiv.classList.add('card', 'mb-3', 'my-3')
        CardDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${thumbnail_url}" class="w-100 rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h3 class="card-title">${title}</h2>
                        <p class="card-text">${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>
                        
                        <div class="d-md-flex justify-content-between" style="margin-top: 15%">
                            <div class="d-flex gap-2">
                                <img class="rounded-circle" src="${author.img}" alt="" style="width: 50px; height: 50px;">
                                <div>
                                    <h5>${author.name ? author.name : 'N/A'}</h5>
                                    <p>${author.published_date ? author.published_date : 'N/A'}</p>
                                </div>
                            </div>
                            <p><i class="fa-regular fa-eye me-2"></i>${total_view}</p>
                            <p>Rating: ${rating.number}</p>
                            
                        </div>

                    </>
                </div>
            </div>
        `;
        cardsContainer.appendChild(CardDiv)

        //spinner stop
        loadingSpinner(false)
    })
    

}
// findCategories()


const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}


//Display Categories
const displayCategory = (categories) => {
    // console.log(categories)
    const categoriesContainer = document.getElementById('categories-container')

    categories.forEach(category => {
        // console.log(category.category_id)

        const categoryText = document.createElement('div')
        categoryText.innerHTML = `<h6 onclick="findCategories('${category.category_id}')" style="cursor: pointer;">${category.category_name}</h6>`;

        categoriesContainer.appendChild(categoryText)
    });
}

 


//spinner function
const spinner = document.getElementById('spinner')
const loadingSpinner = (isLoading) => {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

loadCategory()



