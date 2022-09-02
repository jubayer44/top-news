const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCategory = (categories) => {
    console.log(categories)
    const categoriesContainer = document.getElementById('categories-container')
    
    categories.forEach(category => {
        // console.log(category.category_name)
        const categoryText = document.createElement('h6')
        categoryText.innerHTML = `${category.category_name}`;
        categoriesContainer.appendChild(categoryText)
    });
}
loadCategory()