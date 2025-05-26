export class CaruselComponent {
	constructor(parent) {
		this.parent = parent
	}
	
	getHTML(data) {
		return `
    <div class="carousel-container">
        <div id="carousel-${
					data.id
				}" class="carousel slide" >
			  <div class="carousel-indicators">
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button style="background-color:#2B2D33" type="button" data-bs-target="#carousel-${data.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
            <div class="carousel-inner">
                ${data.elements
									.map(
										(elem, index) => `
                    <div style="margin-bottom:5%" class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${elem.src}" alt="Icon ${elem.title}" style="width: 300px; height: 80px; object-fit: contain; margin-bottom: 5px; margin-right: auto;">
						<h3 style="font-size:20px; margin-top: 0;">${elem.title}</h3>
						<p>${elem.description}</p>
                    </div>
                `
									)
									.join('')}
            </div>
        </div>
    </div>`
	}

	render(data) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
	}
}