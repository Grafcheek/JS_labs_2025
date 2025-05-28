import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { BankProductsCardComponent } from '../../components/bank_products-card/index.js'
import { BankProductsPage } from '../api-bank/index.js'
import { HomeButtonComponent } from '../../components/home-button/index.js'
import { SearchFilterComponent } from '../../components/filter/index.js'
import { AddPage } from '../add/index.js'
import { EditPage } from '../edit/index.js'
import { ViewPage } from '../view/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.handleSearch = this.handleSearch.bind(this)
    }

    getData() {
        ajax.get(bankproductsUrls.getTemplates(), (data, status) => {
            if (status === 200 && data) {
                this.renderCards(data, true)
            } else {
                console.error('Ошибка получения данных:', status)
                this.renderCards([], true)
            }
        })
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return `
        <header class=\"navbar navbar-expand-lg navbar-dark bg-white sticky-top\">\n                <div class=\"container-fluid\">\n                    <div id=\"home-button-container\"></div>\n                </div>\n            </header>\n\n        <!-- Добавляем контейнер для фильтра -->\n        <div id=\"search-filter-container\"></div>\n        \n        <div id=\"main-page\" class=\"d-flex flex-wrap gap-3 p-3\" style=\"background-color:#F8F6F2; min-height: 100vh;\"></div>\n        `
    }

    handleSearch(searchTerm) {
        if (searchTerm) {
            ajax.get(bankproductsUrls.getTemplatesWithSearch(searchTerm), (data, status) => {
                if (status === 200 && data) {
                    this.renderCards(data, false)
                } else {
                    console.error('Ошибка получения данных при поиске:', status)
                    this.renderCards([], false)
                }
            })
        } else {
            this.getData()
        }
    }

    renderCards(data, renderAddButtonComponent) {
        this.pageRoot.innerHTML = ''
        data.forEach(item => {
            const card = new BankProductsCardComponent(this.pageRoot)
            card.render(
                item,
                () => this.handleViewCard(item.id),
                () => this.handleEditCard(item.id),
                () => this.handleRemoveCard(item.id)
            )
        })

        if (renderAddButtonComponent) {
            const addButton = new AddCardButtonComponent(this.pageRoot)
            addButton.render(() => this.handleAddCard())
        }
    }

    handleViewCard(cardId) {
        const viewPage = new ViewPage(this.parent, cardId)
        viewPage.render()
    }

    handleEditCard(cardId) {
        const editPage = new EditPage(this.parent, cardId)
        editPage.render()
    }

    handleAddCard() {
        const addPage = new AddPage(this.parent)
        addPage.render()
    }

    handleRemoveCard(cardId) {
        ajax.delete(bankproductsUrls.deleteTemplate(cardId), (data, status) => {
            if (status === 200) {
                this.getData() // Обновляем данные после удаления
            } else {
                console.error('Ошибка удаления карточки:', status)
            }
        })
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const homeButtonContainer = document.getElementById('home-button-container')
        const homeButton = new HomeButtonComponent(homeButtonContainer)
        homeButton.render()

        const filterContainer = document.getElementById('search-filter-container')
        const searchFilter = new SearchFilterComponent(filterContainer, this.handleSearch)
        searchFilter.render()
        
        this.getData()
    }
}