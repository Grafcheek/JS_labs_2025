export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
    <div class="templates-card">
        <div class="card-body-custom">
            <button id="add-card-button" type="button" style="color:#2B2D33; font-size:200px; border:none; min-width:400px;min-height:312px;">+</button>
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
