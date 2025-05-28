import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class ViewPage {
    constructor(parent, cardId) {
        this.parent = parent
        this.cardId = cardId
        this.data = null
        this.saveMsgTimeout = null
    }

    get pageRoot() {
        return document.getElementById('view-page')
    }

    getHTML() {
        if (!this.data) return '<div>Загрузка...</div>'
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
            <div class="container-fluid">
                <div id="home-button-container"></div>
            </div>
        </header>
        <div id="view-page" class="container mt-4">
            <div class="card mb-3" style="max-width: 500px; margin: 0 auto;">
                <img src="${this.data.src}" class="card-img-top" alt="${this.data.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${this.data.title}</h5>
                    <p class="card-text">${this.data.description}</p>
                    <p class="card-text"><small class="text-muted">ID: ${this.data.id}</small></p>
                </div>
            </div>
            <form id="comment-form" class="mt-4" style="max-width: 500px; margin: 0 auto;">
                <div class="mb-3">
                    <label for="comments" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="comments" value="${this.data.comments || ''}" placeholder="Введите комментарий...">
                </div>
                <button type="submit" class="btn btn-primary">Сохранить комментарий</button>
                <div id="save-msg" style="margin-top:10px; color:green; display:none;">Комментарий сохранён!</div>
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
                this.data = result.data
                this.render()
            } else {
                console.error('Ошибка загрузки данных карточки:', result.status)
                this.clickBack()
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных карточки:', error)
            this.clickBack()
        }
    }

    async saveComment(e) {
        e.preventDefault()
        const newComment = document.getElementById('comments').value
        const updatedCard = { ...this.data, comments: newComment }

        try {
            const result = await ajax.put(bankproductsUrls.updateTemplate(this.cardId), updatedCard)
            if (result.status === 200) {
                this.data.comments = newComment
                const msg = document.getElementById('save-msg')
                if (msg) {
                    msg.style.display = 'block'
                    clearTimeout(this.saveMsgTimeout)
                    this.saveMsgTimeout = setTimeout(() => { msg.style.display = 'none' }, 2000)
                }
            } else {
                this.showError('Ошибка при сохранении комментария!')
            }
        } catch (error) {
            console.error('Ошибка при сохранении комментария:', error)
            this.showError('Ошибка при сохранении комментария!')
        }
    }

    showError(message) {
        const msg = document.getElementById('save-msg')
        if (msg) {
            msg.textContent = message
            msg.style.color = 'red'
            msg.style.display = 'block'
            clearTimeout(this.saveMsgTimeout)
            this.saveMsgTimeout = setTimeout(() => {
                msg.style.display = 'none'
                msg.textContent = 'Комментарий сохранён!'
                msg.style.color = 'green'
            }, 2000)
        }
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        if (homeButtonContainer) {
            const homeButton = new HomeButtonComponent(homeButtonContainer)
            homeButton.render(this.clickBack.bind(this))
        }

        if (!this.data) {
            this.loadCardData()
            return
        }

        const form = document.getElementById('comment-form')
        if (form) {
            form.addEventListener('submit', this.saveComment.bind(this))
        }
    }
} 