export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
    <div class="templates-card" style="width: 340px; height: 400px; display: flex; align-items: center; justify-content: center;">
        <div class="card-body-custom" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <button id="add-card-button" type="button" style="color:#2B2D33; font-size:120px; border:none; background: #F5F6F7; border-radius: 50%; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); line-height: 1; padding: 0; text-align: center;">+</button>
        </div>
    </div>`
    }

    addListeners(listener) {
		document.getElementById('add-card-button').addEventListener('click', listener)
	}

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}
