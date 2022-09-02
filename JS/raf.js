
const findCategories = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data))
        .catch(error => console.log(error))
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
        return
    }

    else {
        // console.log(viewCategories.length + ' News Found In This Category')
        resultFound.innerText = viewCategories.length + ' News Found In This Category';
        resultsContainer.classList.remove('d-none')
        
    }

    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.textContent = '';
    
    viewCategories.forEach(singleCategories => {
        const {title, image_url, details, author} = singleCategories
        // console.log(author.name)

        const CardDiv = document.createElement('div')
        CardDiv.classList.add('card', 'mb-3', 'my-3')
        CardDiv.innerHTML = `
        <div class="row g-0">
                          <div class="col-md-4">
                            <img src="..." class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                          </div>
                        </div>
        `;
        cardsContainer.appendChild(CardDiv)


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
loadCategory()



