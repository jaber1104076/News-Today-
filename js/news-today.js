document.getElementById('spinner').style.display = 'none'
const loadCatagor = () => {
    const url = ' https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCtagory(data.data.news_category))
}
const displayCtagory = items => {
    // console.log(items)
    const catagoryContainer = document.getElementById('catagory-container')
    items.forEach(item => {
        //  console.log(item.category_name)
        const catagoryDiv = document.createElement('div')
        catagoryDiv.innerHTML = `
        <button href="#"  class="btn border border-0" onclick="loadNewsDeatils('${item.category_id}')">${item.category_name}</button>
        `;
        catagoryContainer.appendChild(catagoryDiv)
    });
}
const loadNewsDeatils = category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
    document.getElementById('spinner').style.display = 'block'
}

const displayNews = newsinfo => {
    console.log(newsinfo)
    const textField = document.getElementById('text-field')
    if (newsinfo.length != 0) {
        textField.innerHTML = `
        <p>${newsinfo.length} Number of news</p>
        `;
    }
    else {
        textField.innerText = 'There is No news'
    }
    const newsContainer = document.getElementById('news-container')

    newsContainer.innerHTML = "";
    newsinfo.forEach(news => {
        console.log(news)
        const { title, details, total_view, thumbnail_url, image_url, author, category_id } = news;
        const { name, published_date, img } = author;
        const newsDiv = document.createElement('div')
        //newsDiv.classList.add('imgs')
        newsDiv.innerHTML = `
        <div class="d-flex my-4 rounded rounded-2 shadow-lg">
        <div class="col-md-4 ">
        <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
        </div>
        <div class="col-md-8 ms-2">
        <div class="card-body">
            <h5 class="card-title mt-3"> ${title}</h5>
            <p class="card-text">${details.slice(0, 300) === true ? details.slice(0, 300) : details.slice(0, 301) + " ..."}</p>
            <div class="d-flex justify-content-around align-items-center mt-5 mb-2">
                <div class="d-flex "><img src="${thumbnail_url}" class="img-fluid w-25 h-25 rounded-circle " alt="...">
                <p class="mt-4 p-2">${name}</p> 
                </div>
                <div >${total_view}</div>
                <div class="me-4"><button class="btn btn-outline-success"  onclick="loadModal('${category_id}')">details</button></div>
            </div>
        </div>
    </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
    document.getElementById('spinner').style.display = 'none'
}
const loadModal = (id) => {
    console.log(id)
}
loadCatagor();