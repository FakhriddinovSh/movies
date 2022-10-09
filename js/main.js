const elList = document.querySelector(".movie-list");
const elTemplate = document.querySelector(".template").content;
const fragment = document.createDocumentFragment();
const myModal = document.querySelector(".modal")
const searchForm = document.querySelector(".search-form");
const formInput = document.querySelector(".search-input")

const myArr = movies.splice(0, 101);
console.log(myArr);
function findTime(date){
    return `${Math.floor(date / 60)} hr ${date % 60} min`
}

function showMovies(arr){
    elList.innerHTML = "";
    for (const movie of arr) {
        const clonedTemplate = elTemplate.cloneNode(true);
        
        clonedTemplate.querySelector(".movie-image").src = `http://i3.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`; 
        clonedTemplate.querySelector(".movie-title").textContent = movie.Title
        clonedTemplate.querySelector(".movie-star").textContent = movie.imdb_rating;
        clonedTemplate.querySelector(".movie-year").textContent = movie.movie_year;
        clonedTemplate.querySelector(".movie-hour").textContent = findTime(movie.runtime);
        clonedTemplate.querySelector(".movie-categories").textContent = movie.Categories.split("|").join(", ")
        clonedTemplate.querySelector(".js-modal-btn").dataset.mybtn = movie.imdb_id
        fragment.appendChild(clonedTemplate)
    }   
    elList.appendChild(fragment)
}

function findImdbid(mybtn){
    let myFind = myArr.find(function(myMovie){
        return myMovie.imdb_id == mybtn
    })
    
    const modalTitle = document.querySelector(".modal-title");
    const modalStars = document.querySelector(".mymodal-stars");
    const modalHour = document.querySelector(".mymodal-hour");
    const modalCalendar = document.querySelector(".mymodal-calendar");
    const modalTriller = document.querySelector(".mymodal-triller");
    const modalSummary = document.querySelector(".mymodal-summary");
    const modalLink = document.querySelector(".mymodal-link").href = `https://www.imdb.com/title/${myFind.imdb_id}`;
    const modalIframe = document.querySelector(".mymodal-iframe").src = `https://www.youtube-nocookie.com/embed/${myFind.ytid}`
    
    modalTitle.textContent = myFind.Title;
    modalStars.textContent = myFind.imdb_rating;
    modalHour.textContent = findTime(myFind.runtime);
    modalCalendar.textContent = myFind.movie_year;
    modalTriller.textContent = myFind.Categories.split("|").join(", ");
    modalSummary.textContent = myFind.summary;
}

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".js-modal-btn")){
        findImdbid(evt.target.dataset.mybtn)
    }
})

myModal.addEventListener("hidden.bs.modal", function(){
    let modalIframe = document.querySelector(".mymodal-iframe").src = ``
})
showMovies(myArr)


// formInput.addEventListener("keyup", function(evt){
//     const valInput = evt.target.value;
//     const oneArr = movies.filter((item) => {
//         return item.Title.includes(valInput)
//     });
//     showMovies(oneArr)
// })


// let findElement = movies.filter(film =>{
//     let formInputValue = formInput.value;
//     return film.Title.includes(formInputValue)
// })

// showMovies(findElement)


searchForm.addEventListener("keyup", function(evt){
    let elInputVal = formInput.value;
    let searchMovi = myArr.filter(film =>{
        return film.Title.includes(elInputVal)
    })
    showMovies(searchMovi)
})