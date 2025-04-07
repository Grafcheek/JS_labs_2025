export class CaruselComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(data) {
        return `
        <div class="carousel-container">
            <div id="carousel-${data.id}" class="carousel slide">
                <div class="carousel-indicators" style="
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                ">
                    ${[0, 1, 2].map((_, index) => `
                    <button type="button" 
                            data-bs-target="#carousel-${data.id}" 
                            data-bs-slide-to="${index}" 
                            ${index === 0 ? 'class="active" aria-current="true"' : ''}
                            aria-label="Slide ${index + 1}"
                            style="
                                position: relative;
                                display: inline-block;
                                cursor: pointer;
                                background: ${index === 0 ? 'rgb(43, 45, 51)' : 'rgba(110, 115, 130, 0.2)'};
                                width: ${index === 0 ? '40px' : '8px'};
                                height: 8px;
                                border-radius: 10px;
                                border: none;
                                padding: 0;
                                transition: all 0.3s ease;
                            ">
                    </button>
                    `).join('')}
                </div>
                <div class="carousel-inner">
                    ${data.elements.map((elem, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}" 
                         style="margin-bottom: 10%; text-align: center; padding-bottom: 30px;">
                        <img src="${elem.src}" 
                             alt="Icon ${elem.title}" 
                             style="width:69px; height:50px; color:transparent">
                        <h3 style="font-size:20px">${elem.title}</h3>
                        <p>${elem.description}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>`
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}