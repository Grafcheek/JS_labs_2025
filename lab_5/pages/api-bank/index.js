import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class BankProductsPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
	}

	getData() {
		ajax.get(bankproductsUrls.getTemplateById(this.id), (data, status) => {
			if (status === 200 && data) {
				this.data = data
				this.renderCard()
			} else {
				console.error('Ошибка получения данных:', status)
				this.clickBack()
			}
		})
	}

	getHTML() {
		return `
    <div id="api-templates-page">
        <div class="main-container">
            <!-- Шапка -->
            <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

            <div class="header-center">
                <h4 class="header-title">${this.data?.title || 'Загрузка...'}</h4>
            </div>

            <div class="card-container" id="card-container"></div>
        </div>
    </div>`
	}

	renderCard() {
		const cardContainer = document.getElementById('card-container')
		if (!cardContainer) return

		cardContainer.innerHTML = `
			<div class="card mb-3">
				<img src="${this.data.src}" class="card-img-top" alt="${this.data.title}" style="height: 300px; object-fit: cover;">
				<div class="card-body">
					<h5 class="card-title">${this.data.title}</h5>
					<p class="card-text">${this.data.description}</p>
					${this.data.comments ? `<p class="card-text"><small class="text-muted"><i class="bi bi-chat"></i> ${this.data.comments}</small></p>` : ''}
				</div>
			</div>
		`
	}

	clickBack() {
		const mainPage = new MainPage(this.parent)
		mainPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render(this.clickBack.bind(this))

		this.getData()
	}
}
