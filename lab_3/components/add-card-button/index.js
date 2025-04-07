export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
        <div class="templates-card" style="
        width: 300px;
        height: 450px;
        border: 2px dashed var(--raif-text-additional);
        background-color: var(--raif-light);
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(43, 45, 51, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        align-self: start;
    ">
        <button id="add-card-button" type="button" style="
            background: transparent;
            border: none;
            color: var(--raif-text-additional);
            font-family: var(--raif-font);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: color 0.3s ease;
        ">
            <span style="
                font-size: 80px;
                font-weight: 300;
                line-height: 1;
            ">+</span>
            <span style="
                font-size: 20px;
                font-weight: 500;
            ">Добавить карту</span>
        </button>
    </div>`
    }

    addListeners(listener) {
        const button = document.getElementById('add-card-button')
        const card = button.closest('.templates-card')
        
        button.addEventListener('click', listener)
        
        // Добавляем hover-эффекты через JS
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--raif-yellow)'
            card.style.backgroundColor = 'var(--raif-beige)'
            button.style.color = 'var(--raif-dark)'
        })
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--raif-text-additional)'
            card.style.backgroundColor = 'var(--raif-light)'
            button.style.color = 'var(--raif-text-additional)'
        })
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}