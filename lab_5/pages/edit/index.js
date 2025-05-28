import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class EditPage {
    constructor(parent, cardId) {
        this.parent = parent
        this.cardId = cardId
        this.comments = ''
    }

    get pageRoot() {
        return document.getElementById('edit-page')
    }

    getHTML() {
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>

        <div id="edit-page" class="container mt-4">
            <h2>Редактировать карточку</h2>
            <form id="edit-form" class="mt-4">
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

                <button type="submit" class="btn btn-primary mt-4">Сохранить изменения</button>
            </form>
        </div>
        `
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    loadCardData() {
        ajax.get(bankproductsUrls.getTemplateById(this.cardId), (data, status) => {
            if (status === 200 && data) {
                document.getElementById('title').value = data.title
                document.getElementById('description').value = data.description
                document.getElementById('src').value = data.src
                this.comments = data.comments || ''
            } else {
                console.error('Ошибка загрузки данных карточки:', status, data)
                this.clickBack()
            }
        })
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))

        this.loadCardData()

        const form = document.getElementById('edit-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const updatedCard = {
                id: this.cardId,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                src: document.getElementById('src').value,
                comments: this.comments
            }
            ajax.put(bankproductsUrls.updateTemplate(this.cardId), updatedCard, (data, status) => {
                if (status === 200) {
                    this.clickBack()
                } else {
                    console.error('Ошибка обновления карточки:', status, data)
                }
            })
        })
    }
} 