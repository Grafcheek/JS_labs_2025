import { ButtonGroupComponent } from '../button-group/index.js';

export class TemplatesCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    if (!data?.elements?.length) return '<p>Нет данных карточки</p>';
    
    const firstElement = data.elements[0];
    return `
    <div class="card" data-card-id="${data.id}" style="
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 6px rgba(43, 45, 51, 0.05);
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
      
      <div class="card-content" style="
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
      ">
        <img src="${firstElement.src}" 
             alt="${firstElement.title}"
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
          ">${firstElement.title}</h6>
          <p style="
            color: #777677;
            font-size: 14px;
            margin: 0;
          ">${firstElement.description}</p>
        </div>
      </div>
      
      <div style="margin-top: 24px;">
        ${new ButtonGroupComponent().getHTML(data)}
      </div>
    </div>`;
  }

  render(data, analyzeListener, removeListener) {
    try {
      if (!this.parent) return;
      
      const html = this.getHTML(data);
      this.parent.insertAdjacentHTML('beforeend', html);
      
      const buttonGroup = new ButtonGroupComponent(this.parent.lastElementChild);
      if (buttonGroup) {
        buttonGroup.addListeners(data, analyzeListener, removeListener);
      }
    } catch (error) {
      console.error('Card render error:', error);
    }
  }
}