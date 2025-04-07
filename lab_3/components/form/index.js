export class CaruselComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
    <div class="carousel-container">
        <div id="carousel-${data.id}" class="carousel slide" style="position: relative;">
            <div class="carousel-inner">
                ${data.elements.map((elem, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}" style="text-align: center; padding-bottom: 32px;">
                        <img src="${elem.src}" alt="Icon ${elem.title}" style="width: 69px; height: 50px; margin: 12px auto;">
                        <h3 style="font-size: 20px; font-family: 'ALS Hauss', sans-serif; color: #2B2D33; margin-top: 16px;">
                            ${elem.title}
                        </h3>
                        <p style="font-size: 14px; color: #777677; margin: 0 20px;">
                            ${elem.description}
                        </p>
                    </div>
                `).join('')}
            </div>

            <div style="display: flex; justify-content: center; margin-top: -8px; padding-bottom: 16px;">
                ${data.elements.map((_, index) => `
                    <button 
                        type="button" 
                        data-bs-target="#carousel-${data.id}" 
                        data-bs-slide-to="${index}" 
                        class="${index === 0 ? 'active' : ''}" 
                        aria-current="${index === 0 ? 'true' : 'false'}" 
                        aria-label="Slide ${index + 1}"
                        style="
                            background: ${index === 0 ? '#2B2D33' : 'rgba(110, 115, 130, 0.2)'};
                            width: ${index === 0 ? '40px' : '8px'};
                            height: 8px;
                            border-radius: 10px;
                            border: none;
                            margin: 0 4px;
                            transition: all 0.3s ease;">
                    </button>
                `).join('')}
            </div>
        </div>
    </div>`;
	}

	render(data) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
	}
}
