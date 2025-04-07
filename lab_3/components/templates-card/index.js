import { ButtonGroupComponent } from '../button-group/index.js'
import { CaruselComponent } from '../carusel/index.js'

export class TemplatesCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
        <div style="
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 6px rgba(43, 45, 51, 0.05);
            height: 100%;
            height: 450px;
            
            display: flex;
            flex-direction: column;
        ">
            <h5 style="
                color: #2B2D33;
                font-size: 18px;
                font-weight: 500;
                margin-top: 0;
                margin-bottom: 16px;
            ">${data.title}</h5>
            
            <div style="
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                gap: 16px;
            ">
                <img src="${data.elements[0].src}" 
                     alt="${data.elements[0].title}"
                     style="
                        width: 100%;
                        height: 160px;
                        object-fit: contain;
                        border-radius: 8px;
                        background: #F8F6F2;
                     "
                     onerror="this.src='https://www.raiffeisen.ru/common/img/uploaded/logo.svg';this.style.objectFit='contain';this.style.padding='20px'">
                
                <div>
                    <h6 style="
                        color: #2B2D33;
                        font-size: 16px;
                        margin: 12px 0 4px 0;
                    ">${data.elements[0].title}</h6>
                    <p style="
                        color: #777677;
                        font-size: 14px;
                        margin: 0;
                    ">${data.elements[0].description}</p>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                ${new ButtonGroupComponent().getHTML(data)}
            </div>
        </div>`
    }

    render(data, analyzeListener, removeListener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const buttonGroup = new ButtonGroupComponent(this.parent.lastElementChild)
        buttonGroup.addListeners(data, analyzeListener, removeListener)
    }
}