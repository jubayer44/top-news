const cardsContainer = document.getElementById('cards-container')
const footerSection = document.getElementById('footer-section')

const findCategories = (id) => {
    footerSection.classList.remove('d-none')
    // spinner start
    loadingSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data))
        .catch(error=> console.log(error))
}

const displayNews = (allNewsCategories) => {

    const viewCategories = allNewsCategories.data;
    viewCategories.sort((x, y) => {
        return y.total_view - x.total_view;
    });

    const resultsContainer = document.getElementById('results-container')
    const resultFound = document.getElementById('founded-results')
    resultFound.textContent = '';

    if (viewCategories.length === 0) {
        footerSection.classList.add('d-none')
        resultFound.innerText = 'News Not Found In This Category';
        resultFound.classList.add('text-danger')
        resultsContainer.classList.remove('d-none')
        cardsContainer.textContent = '';
        //spinner stop
        loadingSpinner(false)
        return
    }

    else {
        resultFound.innerText = viewCategories.length + ' News Found In This Category';
        resultsContainer.classList.remove('d-none')
        resultFound.classList.remove('text-danger')
    }
    cardsContainer.textContent = '';

    viewCategories.forEach(singleCategories => {
        const { title, image_url, thumbnail_url, details, author, total_view, rating } = singleCategories;

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
                        <p class="card-text text-muted">${details.length > 500 ? details.slice(0, 500) + '...' : details}</p>
                        
                        <div class="d-md-flex justify-content-between" style="margin-top: 15%">
                            <div class="d-flex gap-2">
                                <img class="rounded-circle" src="${author ? author.img : 'N/A'}" alt="" style="width: 50px; height: 50px;">
                                <div>
                                    <h5>${author.name ? author.name : 'N/A'}</h5>
                                    <p class=" text-muted">${author.published_date ? author.published_date : 'N/A'}</p>
                                </div>
                            </div>
                            <p class=" text-muted"><i class="fa-regular fa-eye me-2"></i>${total_view ? total_view : 'N/A'}</p>
                            <p class=" text-muted">Rating: ${rating ? rating.number : 'N/A'}</p>
                            <button onclick="openModal('${title}', '${image_url}', '${total_view ? total_view : 'N/A'}', '${author.img}', '${author.name ? author.name : 'N/A'}', '${author.published_date ? author.published_date : 'N/A'}')" type="button" class="btn btn-primary h-25" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Details
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(CardDiv)

        //spinner stop
        loadingSpinner(false)
    })

}

// Modal 
const modalTitle = document.getElementById('exampleModalLabel')
const modalBody = document.getElementById('modals-body')
const openModal = (title, img, view, authImg, name, date) => {

    modalTitle.innerText = `${title}`;
    modalBody.innerHTML = `
    <img src="${img}" class="w-100 rounded-start" alt="...">
    
    <div class="d-flex gap-2 mt-3">
         <img class="rounded-circle" src="${authImg}" alt="" style="width: 50px; height: 50px;">
     <div>
         <h5>${name}</h5>
         <p class=" text-muted">${date ? date : 'N/A'}</p>
    </div>
    <p class=" text-muted">View: ${view}</p>
    </div>
    `;
}

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

//Display Categories
const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById('categories-container')

    categories.forEach(category => {
        const categoryText = document.createElement('div')
        categoryText.innerHTML = `<h6 onclick="findCategories('${category.category_id}')" style="cursor: pointer;" class="hover-btn fw-bold">${category.category_name}</h6>`;

        categoriesContainer.appendChild(categoryText)
    });
}

//spinner 
const spinner = document.getElementById('spinner')
const loadingSpinner = (isLoading) => {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
};

loadCategory()

