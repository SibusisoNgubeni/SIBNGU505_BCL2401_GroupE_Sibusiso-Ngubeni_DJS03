class BookSearch extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
        <!DOCTYPE html>
<html lang="en">


<title>Book Connect</title>

<link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png">
<link rel="manifest" href="/meta/manifest.json">
<link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#0096ff">
<link rel="shortcut icon" href="/meta/favicon.ico">
<meta name="msapplication-TileColor" content="#0a0a14">
<meta name="msapplication-config" content="/meta/browserconfig.xml">
<meta name="theme-color" content="#0a0a14">

<link rel="stylesheet" href="./styles.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap"
    rel="stylesheet"
/>



<header class="header">
    <div class="header__inner">
        <div class="header__logo">
            <svg
                class="header__shape"
                viewBox="0 0 89 68"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M52.88 57.62 4.126 37.897a3 3 0 0 0-2.25 5.562L58.95 66.55a11.062 11.062 0 0 0 2.1.849l.154.062c.351.142.714.213 1.071.22 5.35.912 10.682-2.253 12.34-7.577l14.27-45.83C90.694 8.473 87.456 2.307 81.654.5c-5.8-1.806-11.966 1.432-13.773 7.233l-8.23 26.429L49.03 4.479a5 5 0 1 0-9.415 3.37l14.04 39.23-31.087-31.085a4 4 0 1 0-5.657 5.656l35.97 35.97Z"
                ></path>
            </svg>

            <svg
                class="header__text"
                viewBox="0 0 652 74"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M49.344 37.056c3.84 1.216 6.848 3.264 9.024 6.144 2.176 2.816 3.264 6.304 3.264 10.464 0 5.888-2.304 10.432-6.912 13.632C50.176 70.432 43.52 72 34.752 72H0V4.8h32.832c8.192 0 14.464 1.568 18.816 4.704 4.416 3.136 6.624 7.392 6.624 12.768 0 3.264-.8 6.176-2.4 8.736-1.536 2.56-3.712 4.576-6.528 6.048ZM15.456 16.512v15.84h15.456c3.84 0 6.752-.672 8.736-2.016 1.984-1.344 2.976-3.328 2.976-5.952s-.992-4.576-2.976-5.856c-1.984-1.344-4.896-2.016-8.736-2.016H15.456ZM33.6 60.288c4.096 0 7.168-.672 9.216-2.016 2.112-1.344 3.168-3.424 3.168-6.24 0-2.912-1.056-5.056-3.168-6.432-2.048-1.408-5.12-2.112-9.216-2.112H15.456v16.8H33.6ZM79.744 72H65.664V4.8h14.08c7.872 0 13.856 1.696 18.016 5.056 4.224 3.392 6.336 8.32 6.336 14.816 0 5.856-1.984 10.176-5.952 13.056-3.84 2.88-8.832 4.32-15.008 4.32H79.744ZM82.08 16.464c-1.344-.528-2.496-.96-3.456-1.296-1.056-.32-2.432-.544-4.224-.672-1.824-.16-3.712-.24-5.664-.24H65.664v18.72h8.928c5.44 0 9.6-1.12 12.48-3.36 2.88-2.208 4.32-5.52 4.32-9.936 0-3.136-.64-5.856-1.92-8.16ZM111.2 53.424c-1.344-.528-2.496-.96-3.456-1.296-1.056-.32-2.432-.544-4.224-.672-1.824-.16-3.712-.24-5.664-.24H94.4v18.72h8.928c5.44 0 9.6-1.12 12.48-3.36 2.88-2.208 4.32-5.52 4.32-9.936 0-3.136-.64-5.856-1.92-8.16ZM131.296 28.464V72H117.44V4.8h13.856v19.392h.032c1.856-3.648 5.072-5.472 9.648-5.472 2.368 0 4.496.768 6.384 2.304 1.856 1.504 2.784 3.536 2.784 6.096 0 1.856-.512 3.392-1.536 4.608-1.024 1.216-2.368 2.176-4.032 2.88 2.176 1.008 3.84 2.528 4.992 4.56 1.184 2.08 1.76 4.544 1.76 7.392 0 4.224-1.44 7.776-4.32 10.656-2.848 2.912-6.8 4.368-11.856 4.368-3.12 0-5.92-.784-8.4-2.352-2.48-1.568-4.432-3.632-5.856-6.192-.544-1.12-.976-2.4-1.296-3.792-.32-1.344-.48-2.88-.48-4.608V28.464ZM169.856 4.8l-.16 12.432H139.52v20.16h28.8l.128 12.528h-42.24V4.8h42.048ZM203.264 37.056c3.84 1.216 6.848 3.264 9.024 6.144 2.176 2.816 3.264 6.304 3.264 10.464 0 5.888-2.304 10.432-6.912 13.632-4.512 3.2-11.168 4.768-19.968 4.768h-34.752V4.8h32.832c8.192 0 14.464 1.568 18.816 4.704 4.416 3.136 6.624 7.392 6.624 12.768 0 3.264-.8 6.176-2.4 8.736-1.536 2.56-3.712 4.576-6.528 6.048Zm-16.896-20.544v15.84h15.456c3.84 0 6.752-.672 8.736-2.016 1.984-1.344 2.976-3.328 2.976-5.952s-.992-4.576-2.976-5.856c-1.984-1.344-4.896-2.016-8.736-2.016h-15.456Zm17.184 43.824c4.096 0 7.168-.672 9.216-2.016 2.112-1.344 3.168-3.424 3.168-6.24 0-2.912-1.056-5.056-3.168-6.432-2.048-1.408-5.12-2.112-9.216-2.112h-15.36v16.8h15.36Zm39.296-16.8V72h-14.08V4.8h14.08v19.392h.032c1.856-3.648 5.072-5.472 9.648-5.472 2.368 0 4.496.768 6.384 2.304 1.856 1.504 2.784 3.536 2.784 6.096 0 1.856-.512 3.392-1.536 4.608-1.024 1.216-2.368 2.176-4.032 2.88 2.176 1.008 3.84 2.528 4.992 4.56 1.184 2.08 1.76 4.544 1.76 7.392 0 4.224-1.44 7.776-4.32 10.656-2.848 2.912-6.8 4.368-11.856 4.368-3.12 0-5.92-.784-8.4-2.352-2.48-1.568-4.432-3.632-5.856-6.192-.544-1.12-.976-2.4-1.296-3.792-.32-1.344-.48-2.88-.48-4.608V23.52Zm40.384 7.056c-1.344-.528-2.496-.96-3.456-1.296-1.056-.32-2.432-.544-4.224-.672-1.824-.16-3.712-.24-5.664-.24h-8.832v18.72h8.928c5.44 0 9.6-1.12 12.48-3.36 2.88-2.208 4.32-5.52 4.32-9.936 0-3.136-.64-5.856-1.92-8.16Zm28.736 25.056V72h-14.08V4.8h14.08v19.392h.032c1.856-3.648 5.072-5.472 9.648-5.472 2.368 0 4.496.768 6.384 2.304 1.856 1.504 2.784 3.536 2.784 6.096 0 1.856-.512 3.392-1.536 4.608-1.024 1.216-2.368 2.176-4.032 2.88 2.176 1.008 3.84 2.528 4.992 4.56 1.184 2.08 1.76 4.544 1.76 7.392 0 4.224-1.44 7.776-4.32 10.656-2.848 2.912-6.8 4.368-11.856 4.368-3.12 0-5.92-.784-8.4-2.352-2.48-1.568-4.432-3.632-5.856-6.192-.544-1.12-.976-2.4-1.296-3.792-.32-1.344-.48-2.88-.48-4.608Zm39.424 2.688c-1.344-.528-2.496-.96-3.456-1.296-1.056-.32-2.432-.544-4.224-.672-1.824-.16-3.712-.24-5.664-.24h-8.992v18.72h8.96c5.44 0 9.6-1.12 12.48-3.36 2.88-2.208 4.32-5.52 4.32-9.936 0-3.136-.64-5.856-1.92-8.16Zm32.8-25.056V72h-14.08V4.8h14.08v19.392h.032c1.856-3.648 5.072-5.472 9.648-5.472 2.368 0 4.496.768 6.384 2.304 1.856 1.504 2.784 3.536 2.784 6.096 0 1.856-.512 3.392-1.536 4.608-1.024 1.216-2.368 2.176-4.032 2.88 2.176 1.008 3.84 2.528 4.992 4.56 1.184 2.08 1.76 4.544 1.76 7.392 0 4.224-1.44 7.776-4.32 10.656-2.848 2.912-6.8 4.368-11.856 4.368-3.12 0-5.92-.784-8.4-2.352-2.48-1.568-4.432-3.632-5.856-6.192-.544-1.12-.976-2.4-1.296-3.792-.32-1.344-.48-2.88-.48-4.608Zm40.384 7.056c-1.344-.528-2.496-.96-3.456-1.296-1.056-.32-2.432-.544-4.224-.672-1.824-.16-3.712-.24-5.664-.24h-8.832v18.72h8.928c5.44 0 9.6-1.12 12.48-3.36 2.88-2.208 4.32-5.52 4.32-9.936 0-3.136-.64-5.856-1.92-8.16Z"
                ></path>
            </svg>
        </div>
        <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            class="header__search"
            id="search-input"
        />
    </div>
</header>

<div class="search-results">
    <div class="search-results__inner" id="search-results"></div>
</div>

<footer class="footer">
    <div class="footer__inner">© Book Connect</div>
</footer>
</html>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        this.shadowRoot.getElementById('search-input').addEventListener('input', this.handleSearch.bind(this));
    }

    connectedCallback() {
        console.log('Custom element added to page');
    }

    handleSearch(event) {
        const query = event.target.value;
        console.log('Searching for:', query);

        // Perform your search logic here
    }
}

customElements.define('book-search', BookSearch);
