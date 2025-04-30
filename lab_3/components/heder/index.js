import { BackButtonComponent } from "../back-button";

export class HeaderComponent {
    constructor(parent, showBackButton = false) {
        this.parent = parent;
        this.showBackButton = showBackButton;
    }

    getHTML() {
        return `
        <header style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: var(--raif-bg-primary);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">
            <div id="header-buttons" style="width: 120px;">
                ${this.showBackButton ? '<div id="back-button-container"></div>' : ''}
            </div>
            <h1 style="margin: 0; flex-grow: 1; text-align: center;">Мои Карточки</h1>
            <div style="width: 120px;"></div> <!-- Для выравнивания -->
        </header>`;
    }

    render(backListener = null) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html); // Вставляем хедер в начало страницы
        
        if (this.showBackButton && backListener) {
            const container = document.getElementById('back-button-container');
            const backButton = new BackButtonComponent(container);
            backButton.render(backListener);
        }
    }
}