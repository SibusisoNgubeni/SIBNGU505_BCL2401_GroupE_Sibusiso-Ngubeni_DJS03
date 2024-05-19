import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()

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
//object to store selectors
const selectors = {
    listItems: '[data-list-items]',
    listButton: '[data-list-button]',
    searchOverlay: '[data-search-overlay]',
    searchGenre: '[data-search-genres]',
    searchAuthors: '[data-search-authors]',
    searchCancel: '[data-search-cancel]',
    settingsCancel: '[data-settings-cancel]',
    settingsTheme: '[data-settings-theme]',
    searchHeader: '[data-header-search]',
    searchTitle: '[data-search-title]',
    headerSettings: '[data-header-settings]',
    listClose: '[data-list-close]',
    listActive: '[data-list-active]',
    settingsForm: '[data-settings-form]',
    searchForm: '[data-search-form]',
    listMessage: '[data-list-message]',
    settingsOverlay: '[data-settings-overlay]',
    listBlur: '[data-list-blur]',
    listImage: '[data-list-image]',
    listTitle: '[data-list-title]',
    listSubtitle: '[data-list-subtitle]',
    listDescription: '[data-list-description]',



}

document.querySelector(selectors.listItems).appendChild(starting)


function appendGenre(){             
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
document.querySelector(selectors.searchGenre).appendChild(genreHtml)
}
appendGenre();

function appendAuthors(){
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
    document.querySelector(selectors.searchAuthors).appendChild(authorsHtml)
}
}
appendAuthors();
 
function colorValuesAbstraction(){
    const dark = document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    const light =  document.documentElement.style.setProperty('--color-light', '10, 10, 20');


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector(selectors.settingsTheme).value = 'night'
    dark;
    light;
} else {
    document.querySelector(selectors.settingsTheme).value = 'day'
    light;
    dark;
}
}

colorValuesAbstraction();


const updateListButton = () =>{
    const button = document.querySelector(selectors.listButton);
    button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0
    button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`    
}
updateListButton();

const updateListButton2 = () =>{
    const button = document.querySelector(selectors.listButton);
    button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
 
}
     updateListButton2();  

<<<<<<< HEAD
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
=======
document.querySelector(selectors.searchCancel).addEventListener('click', () => {
    document.querySelector(selectors.searchOverlay).open = false
>>>>>>> 9b782eff80aca092857fa924b000b609ece5a324
})

document.querySelector(selectors.settingsCancel).addEventListener('click', () => {
    document.querySelector(selectors.settingsOverlay).open = false
})

document.querySelector(selectors.searchHeader).addEventListener('click', () => {
    document.querySelector(selectors.searchOverlay).open = true 
    document.querySelector(selectors.searchTitle).focus();
})

document.querySelector(selectors.headerSettings).addEventListener('click', () => {
    document.querySelector(selectors.settingsOverlay).open = true 
})

document.querySelector(selectors.listClose).addEventListener('click', () => {
    document.querySelector(selectors.listActive).open = false
})

document.querySelector(selectors.settingsForm).addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector(selectors.settingsOverlay).open = false
})

document.querySelector(selectors.searchForm).addEventListener('submit', (event) => {
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

    page = 1;
    matches = result

    if (result.length < 1) {
        document.querySelector(selectors.listMessage).classList.add('list__message_show')
    } else {
        document.querySelector(selectors.listMessage).classList.remove('list__message_show')
    }

    document.querySelector(selectors.listItems).innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
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
        newItems.appendChild(element)
    }

    document.querySelector(selectors.listItems).appendChild(newItems)
     

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector(selectors.searchOverlay).open = false
})

document.querySelector(selectors.listButton).addEventListener('click', () => {
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

    document.querySelector(selectors.listItems).appendChild(fragment)
    page += 1
})

document.querySelector(selectors.listItems).addEventListener('click', (event) => {
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
        document.querySelector(selectors.listActive).open = true
        document.querySelector(selectors.listBlur).src = active.image
        document.querySelector(selectors.listImage).src = active.image
        document.querySelector(selectors.listTitle).innerText = active.title
        document.querySelector(selectors.listSubtitle).innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector(selectors.listDescription).innerText = active.description
    }
})