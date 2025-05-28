import { ButtonGroupComponent } from '../button-group/index.js'

export class BankProductsCardComponent {
	constructor(parent) {
		this.parent = parent
		this.buttonGroup = new ButtonGroupComponent(parent)
	}

	getHTML(data) {
		return `
    <div class="templates-card" data-id="${data.id}" style="width: 340px; height: 400px; display: flex; flex-direction: column;">
        <div class="card-body-custom" style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0; overflow: hidden;">
            <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 150px; object-fit: cover;">
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; overflow: hidden;">
                <div style="flex: 1 1 auto; min-height: 0; overflow: hidden;">
                    <h5 class="card-title-custom" style="margin-bottom: 10px;">${data.title}</h5>
                    <p class="card-text-custom" style="margin-bottom: 10px; color: #444; font-size: 1rem;">
                        ${data.description}
                    </p>
                    ${data.comments ? `<p class=\"card-comments\"><i class=\"bi bi-chat\"></i> ${data.comments}</p>` : ''}
                </div>
                <div class="button-group-container" style="margin-top: auto;">
                    ${this.buttonGroup.getHTML(data)}
                </div>
            </div>
        </div>
    </div>`
	}

	render(data, viewListener, editListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.buttonGroup.addListeners(data, viewListener, editListener, removeListener)
	}
}
