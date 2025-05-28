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
        <header class=\"navbar navbar-expand-lg navbar-dark bg-white sticky-top\">\n            <div class=\"container-fluid\">\n                <div id=\"home-button-container\"></div>\n            </div>\n        </header>\n        <div id=\"view-page\" class=\"container mt-4\">\n            <div class=\"card mb-3\" style=\"max-width: 500px; margin: 0 auto;\">\n                <img src=\"${this.data.src}\" class=\"card-img-top\" alt=\"${this.data.title}\" style=\"height: 200px; object-fit: cover;\">\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">${this.data.title}</h5>\n                    <p class=\"card-text\">${this.data.description}</p>\n                    <p class=\"card-text\"><small class=\"text-muted\">ID: ${this.data.id}</small></p>\n                </div>\n            </div>\n            <form id=\"comment-form\" class=\"mt-4\" style=\"max-width: 500px; margin: 0 auto;\">\n                <div class=\"mb-3\">\n                    <label for=\"comments\" class=\"form-label\">Комментарий</label>\n                    <input type=\"text\" class=\"form-control\" id=\"comments\" value=\"${this.data.comments || ''}\" placeholder=\"Введите комментарий...\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Сохранить комментарий</button>\n                <div id=\"save-msg\" style=\"margin-top:10px; color:green; display:none;\">Комментарий сохранён!</div>\n            </form>\n        </div>\n        `
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    loadCardData() {
        ajax.get(bankproductsUrls.getTemplateById(this.cardId), (data, status) => {
            if (status === 200 && data) {
                this.data = data
                this.render()
            } else {
                console.error('Ошибка загрузки данных карточки:', status, data)
                this.clickBack()
            }
        })
    }

    saveComment(e) {
        e.preventDefault()
        const newComment = document.getElementById('comments').value
        const updatedCard = { ...this.data, comments: newComment }
        ajax.put(bankproductsUrls.updateTemplate(this.cardId), updatedCard, (data, status) => {
            if (status === 200) {
                this.data.comments = newComment
                const msg = document.getElementById('save-msg')
                if (msg) {
                    msg.style.display = 'block'
                    clearTimeout(this.saveMsgTimeout)
                    this.saveMsgTimeout = setTimeout(() => { msg.style.display = 'none' }, 2000)
                }
            } else {
                const msg = document.getElementById('save-msg')
                if (msg) {
                    msg.textContent = 'Ошибка при сохранении комментария!'
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
        })
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