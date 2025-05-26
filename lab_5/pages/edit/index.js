import { HomeButtonComponent } from '../../components/home-button/index.js'
import { MainPage } from '../main/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class EditPage {
    constructor(parent, cardId) {
        this.parent = parent
        this.cardId = cardId
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

                <h4 class="mt-4">Элемент 1</h4>
                <div class="mb-3">
                    <label for="element1-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element1-title" required>
                </div>
                <div class="mb-3">
                    <label for="element1-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element1-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element1-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element1-src" required>
                </div>
                <div class="mb-3">
                    <label for="element1-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element1-comment">
                </div>

                <h4 class="mt-4">Элемент 2</h4>
                <div class="mb-3">
                    <label for="element2-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element2-title" required>
                </div>
                <div class="mb-3">
                    <label for="element2-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element2-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element2-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element2-src" required>
                </div>
                <div class="mb-3">
                    <label for="element2-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element2-comment">
                </div>

                <h4 class="mt-4">Элемент 3</h4>
                <div class="mb-3">
                    <label for="element3-title" class="form-label">Название</label>
                    <input type="text" class="form-control" id="element3-title" required>
                </div>
                <div class="mb-3">
                    <label for="element3-description" class="form-label">Описание</label>
                    <textarea class="form-control" id="element3-description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="element3-src" class="form-label">URL изображения</label>
                    <input type="url" class="form-control" id="element3-src" required>
                </div>
                <div class="mb-3">
                    <label for="element3-comment" class="form-label">Комментарий</label>
                    <input type="text" class="form-control" id="element3-comment">
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
                // Заполняем форму данными карточки
                document.getElementById('title').value = data.title
                
                data.elements.forEach((element, index) => {
                    const num = index + 1
                    document.getElementById(`element${num}-title`).value = element.title
                    document.getElementById(`element${num}-description`).value = element.description
                    document.getElementById(`element${num}-src`).value = element.src
                    document.getElementById(`element${num}-comment`).value = element.comments || ''
                })
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

        // Загружаем данные карточки
        this.loadCardData()

        const form = document.getElementById('edit-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            const updatedCard = {
                id: this.cardId,
                title: document.getElementById('title').value,
                elements: [
                    {
                        title: document.getElementById('element1-title').value,
                        description: document.getElementById('element1-description').value,
                        src: document.getElementById('element1-src').value,
                        comments: document.getElementById('element1-comment').value
                    },
                    {
                        title: document.getElementById('element2-title').value,
                        description: document.getElementById('element2-description').value,
                        src: document.getElementById('element2-src').value,
                        comments: document.getElementById('element2-comment').value
                    },
                    {
                        title: document.getElementById('element3-title').value,
                        description: document.getElementById('element3-description').value,
                        src: document.getElementById('element3-src').value,
                        comments: document.getElementById('element3-comment').value
                    }
                ]
            }

            ajax.put(bankproductsUrls.updateTemplate(this.cardId), updatedCard, (data, status) => {
                if (status === 200) {
                    // В случае успеха возвращаемся на главную страницу
                    this.clickBack()
                } else {
                    console.error('Ошибка обновления карточки:', status, data)
                    // Здесь можно добавить отображение ошибки пользователю
                }
            })
        })
    }
} 