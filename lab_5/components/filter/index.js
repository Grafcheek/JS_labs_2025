export class SearchFilterComponent {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch;
    }

    getHTML() {
        return `
        <div class="search-filter-container p-3" style="background-color: #F5F6F7;">
            <div class="input-group">
                <input type="text" 
                       id="searchInput" 
                       class="form-control" 
                       placeholder="Поиск по названию шаблона..." 
                       aria-label="Поиск по названию шаблона">
                <button class="btn" id="searchButton" style="
                    background-color: #2B2D33;
                    border: none;
                    color: white;
                    border-radius: 25px;
                    padding: 10px 20px;
                    font-family: var(--raif-font);
                    outline: none;
                    box-shadow: none;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
                    <i class="bi bi-search"></i> Поиск
                </button>
                <button class="btn" type="button" id="clearSearch" style="
                    background-color: #E9E4DD;
                    border: none;
                    color: #2B2D33;
                    border-radius: 25px;
                    padding: 10px 20px;
                    font-family: var(--raif-font);
                    outline: none;
                    box-shadow: none;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
                    <i class="bi bi-x-lg"></i> Очистить
                </button>
            </div>
        </div>`;
    }

    addListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const clearButton = document.getElementById('clearSearch');

        // Эффект при наведении для кнопки "Поиск"
        searchButton.addEventListener('mouseenter', () => {
            searchButton.style.backgroundColor = '#1C1F24';
        });
        searchButton.addEventListener('mouseleave', () => {
            searchButton.style.backgroundColor = '#2B2D33';
        });

        // Эффект при наведении для кнопки "Очистить"
        clearButton.addEventListener('mouseenter', () => {
            clearButton.style.backgroundColor = '#D0C9C0';
        });
        clearButton.addEventListener('mouseleave', () => {
            clearButton.style.backgroundColor = '#E9E4DD';
        });
        
        searchButton.addEventListener('click', () => {
            this.onSearch(searchInput.value.trim().toLowerCase());
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.onSearch(searchInput.value.trim().toLowerCase());
            }
        });

        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            this.onSearch('');
        });
    }

    render() {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        this.addListeners();
    }
}