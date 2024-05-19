class test extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'})
        let div = document.createElement('div')
        div.textContent = 'wello horld';
}
}

window.customElements.define('test-test',testTest)