import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class AddPage {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('add-page')
    }

    getHTML() {
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>

        <div id="add-page" class="container mt-4">
            <h2>Добавить новую карточку</h2>
            <form id="add-form" class="mt-4">
                <div class="mb-3">
                    <label for="title" class="form-label">Название карточки</label>
                    <input type="text" class="form-control" id="title" required>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Описание</label>
                    <textarea class="form-control" id="description" rows="3" required></textarea>
                </div>

                <div class="mb-3">
                    <label for="src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="src" required>
                </div>

                <button type="submit" class="btn btn-primary mt-4">Добавить карточку</button>
            </form>
        </div>
        `
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))

        const form = document.getElementById('add-form')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const newCard = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                src: document.getElementById('src').value
            }

            try {
                const result = await ajax.post(bankproductsUrls.createTemplate(), newCard)
                if (result.status === 201) {
                    this.clickBack()
                } else {
                    console.error('Ошибка создания карточки:', result.status)
                }
            } catch (error) {
                console.error('Ошибка при создании карточки:', error)
            }
        })
    }
} 