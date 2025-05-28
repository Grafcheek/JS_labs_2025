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

    async loadCardData() {
        try {
            const result = await ajax.get(bankproductsUrls.getTemplateById(this.cardId))
            if (result.status === 200 && result.data) {
                document.getElementById('title').value = result.data.title
                document.getElementById('description').value = result.data.description
                document.getElementById('src').value = result.data.src
                this.comments = result.data.comments || ''
            } else {
                console.error('Ошибка загрузки данных карточки:', result.status)
                this.clickBack()
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных карточки:', error)
            this.clickBack()
        }
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render(this.clickBack.bind(this))

        this.loadCardData()

        const form = document.getElementById('edit-form')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const updatedCard = {
                id: this.cardId,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                src: document.getElementById('src').value,
                comments: this.comments
            }

            try {
                const result = await ajax.put(bankproductsUrls.updateTemplate(this.cardId), updatedCard)
                if (result.status === 200) {
                    this.clickBack()
                } else {
                    console.error('Ошибка обновления карточки:', result.status)
                }
            } catch (error) {
                console.error('Ошибка при обновлении карточки:', error)
            }
        })
    }
} 