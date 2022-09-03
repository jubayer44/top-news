const cardsContainer = document.getElementById('cards-container')



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

    // const cardsContainer = document.getElementById('cards-container')
    cardsContainer.textContent = '';

    // let arrayNum = []
    // let arrayElement = []
    viewCategories.forEach(singleCategories => {
        const { title, image_url, thumbnail_url, details, author, total_view, rating } = singleCategories
        // arrayNum.push(total_view, singleCategories)  
        // arrayElement.push(total_view)
        // console.log(singleCategories.details)

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
                            <button onclick="newsModal('${image_url}', '${title}', '${details.slice(0, 95) + '...'}')" class="btn btn-primary h-25" data-bs-toggle="modal" data-bs-target="#newsModal">View</button>
                        </div>

                    </>
                </div>
            </div>
        `;
        cardsContainer.appendChild(CardDiv)

        //spinner stop
        loadingSpinner(false)
    })
    


    // console.log(arrayNum.sort((a, b) => b-a), arrayElement)
    // function findBySort(element) {

        // console.log(arrayNum.sort((a, b) => b-a))
       
    // }

}
// findCategories()

   // Modal 

   const modalTitle = document.getElementById('newsModalLabel')
   const modalBody = document.getElementById('modal-body')
   const newsModal = (img, title, details) => {

    //    console.log(details)
       modalTitle.innerText = `${title}`;
       modalBody.innerHTML = `
       <img src="${img}" class="w-100 rounded-start" alt="...">
       
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



