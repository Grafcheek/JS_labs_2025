export class HomeButtonComponent {
	constructor(parent) {
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('home-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="home-button" style="padding: 0; border: none; background: none;">
		<img src="https://www.raiffeisen.ru/static/common/initial/Footer/LogotypeRetail.svg" 
			alt="Raiffeisen Logo" 
			width="40" 
			height="40" 
			class="d-inline-block align-top">
    </button>`
	}
	

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
