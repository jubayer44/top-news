
const findCategories = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => displayNews(data))
    .catch(error => console.log(error))
}

const displayNews = (allNewsCategories) => {

const viewCategories = allNewsCategories.data;
// console.log(viewCategories)





if(allNewsCategories.data.length === 0){
    console.log(allNewsCategories.data.length, ('nothing'))
}
}
findCategories()








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



