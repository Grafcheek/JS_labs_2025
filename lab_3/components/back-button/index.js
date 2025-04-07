export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
        <button id="back-button" class="btn-custom" style="
            background: var(--raif-bg-secondary);
            color: var(--raif-dark);
            border: none;
            border-radius: 6px;
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        ">
            <span style="font-size: 20px;">←</span>
            Назад
        </button>`;
    }

    addListeners(listener) {
        document.getElementById('back-button').addEventListener('click', listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}