import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()

//query selectors object
const selectors = {
    listItems: '[data-list-item]',
    listButton: '[data-list-button]',
    searchOverlay: '[data-seach-overlay]',
    searchGenre: '[data-search-genres]',
    searchAuthors: '[data-search-authors]',
    searchCancel: '[data-search-cancel]',
    settingsCancel: '[data-settings-cancel]',
    
}


for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    starting.appendChild(element)
}

 //data list items repetitive on line 150,172,207,211
 
 //made data-list-item querySelector into function because of repetition
 function selectDataListItems(){
    return document.querySelector('[data-list-items]');
 }
 const dataListItems = selectDataListItems();

 function selectDataListButton(){
    return document.querySelector('[data-list-button]');
 }
 const dataListButton = selectDataListButton();

 function selectDataSearchOverlay(){
    return document.querySelector('[data-search-overlay]');
 }
 const dataSearchOverlay = selectDataSearchOverlay();


selectDataListItems.appendChild(starting)
const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

//data list button repetitive on line 72,75,175,177,186
selectDataListButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
selectDataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

selectDataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
//line 78-84 is repetetive- make function
function querySelectorAll([data-search-cancel],[data-settings-cancel],[] ){}
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    dataSearchOverlay.open = false //repetitive code - line 83,112
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    dataSearchOverlay.open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    dataSearchOverlay.open = true //repetitive code- line 92
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    dataSearchOverlay.open = true 
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');``
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }
}

    page = 1;
    matches = result

    if (result.length < 1) {
        //line 143 repetitive, linne 145, make varuiabe or function
        //make ternary
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    //data list items repetitive on line 172,207,209,213
    selectDataListItems.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    //test commit commit 
        element.innerHTML = `
            <img class="preview__image" src="${image}"/>
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        newItems.appendChild(element)
    }

    selectDataListItems.appendChild(newItems)
    selectDataListButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    selectDataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    dataSearchOverlay.open = false
})

selectDataListButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img class="preview__image" src="${image}"/>
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        fragment.appendChild(element)
    }

    selectDataListItems.appendChild(fragment)
    page += 1
})

selectDataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})