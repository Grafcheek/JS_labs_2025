import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { BankProductsCardComponent } from '../../components/bank_products-card/index.js'
import { BankProductsPage } from '../api-bank/index.js'
import { HomeButtonComponent } from '../../components/home-button/index.js'
import { SearchFilterComponent } from '../../components/filter/index.js'
import { AddPage } from '../add/index.js'
import { EditPage } from '../edit/index.js'
import { ajax } from '../../modules/ajax.js'
import { bankproductsUrls } from '../../modules/bankproductsUrls.js'

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.data = []
        this.handleSearch = this.handleSearch.bind(this)
    }

    async getData() {
        try {
            const result = await ajax.get(bankproductsUrls.getTemplates());
            if (result.status === 200 && result.data) {
                this.data = result.data;
                this.renderCards(this.data, true);
            } else {
                console.error('Ошибка получения данных:', result.status);
                this.data = [];
                this.renderCards(this.data, true);
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            this.data = [];
            this.renderCards(this.data, true);
        }
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        <!-- Добавляем контейнер для фильтра -->
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
        `
    }

    async handleSearch(searchTerm) {
        try {
            if (searchTerm) {
                const result = await ajax.get(bankproductsUrls.getTemplatesWithSearch(searchTerm));
                if (result.status === 200 && result.data) {
                    this.renderCards(result.data, false);
                } else {
                    console.error('Ошибка получения данных при поиске:', result.status);
                    this.renderCards([], false);
                }
            } else {
                await this.getData();
            }
        } catch (error) {
            console.error('Ошибка при поиске:', error);
            this.renderCards([], false);
        }
    }

    renderCards(data, renderAddButtonComponent) {
        this.pageRoot.innerHTML = ''
        data.forEach(item => {
            const card = new BankProductsCardComponent(this.pageRoot)
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.handleRemoveCard(item.id)
            )
        })

        if (renderAddButtonComponent) {
            const addButton = new AddCardButtonComponent(this.pageRoot)
            addButton.render(() => this.handleAddCard())
        }
    }

    clickCard(cardId) {
        const editPage = new EditPage(this.parent, cardId)
        editPage.render()
    }

    handleAddCard() {
        const addPage = new AddPage(this.parent)
        addPage.render()
    }

    async handleRemoveCard(cardId) {
        try {
            const result = await ajax.delete(bankproductsUrls.deleteTemplate(cardId));
            if (result.status === 200) {
                this.data = this.data.filter(item => item.id !== cardId);
                this.renderCards(this.data, true);
            } else {
                console.error('Ошибка удаления карточки:', result.status);
            }
        } catch (error) {
            console.error('Ошибка при удалении карточки:', error);
        }
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