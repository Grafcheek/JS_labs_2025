export class CaruselComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    if (!data?.elements?.length) return '<p>Нет данных для отображения</p>';
    
    const isAnalyticTools = data.id === 5;
    
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
          ${data.elements.map((_, index) => `
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
               style="margin-bottom: 10%; text-align: center; padding: 20px;">
            ${isAnalyticTools ? this.getToolInterface(elem) : `
              <img src="${elem.src}" 
                   alt="${elem.title}" 
                   style="width:69px; height:50px; color:transparent"
                   onerror="this.src='https://www.raiffeisen.ru/common/img/uploaded/logo.svg';this.style.objectFit='contain';this.style.padding='20px'">
              <h3 style="font-size:20px">${elem.title}</h3>
              <p>${elem.description}</p>
            `}
          </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  }

  getToolInterface(elem) {
    const tools = {
      sumOfSquares: {
        title: "Анализ риска портфеля",
        desc: "Расчет суммарного риска на основе квадратов отклонений",
        example: "10000,15000,20000",
        placeholder: "Введите суммы инвестиций через запятую"
      },
      sumAndMult: {
        title: "Расчет доходности",
        desc: "Вычисление общей суммы и капитализированного дохода",
        example: "1000,0.05,5",
        placeholder: "Сумма, годовой %, годы"
      },
      qualityDiff: {
        title: "Анализ волатильности",
        desc: "Определение максимального разброса значений активов",
        example: "150,170,160,190",
        placeholder: "Введите значения активов (минимум 4)"
      },
      anagrams: {
        title: "Группировка терминов",
        desc: "Поиск схожих финансовых терминов",
        example: "кредит,тикер,рейтинг,тирек",
        placeholder: "Введите термины через запятую"
      }
    };
  
    const tool = tools[elem.toolType] || {
      title: elem.title,
      desc: elem.description,
      example: "",
      placeholder: ""
    };
  
    return `
    <div style="padding: 0 15px;">
      <h3 style="color: #2B2D33; font-size: 18px; margin-top: 0;">${tool.title}</h3>
      <p style="color: #777677;">${tool.desc}</p>
      
      <input type="text" class="tool-input" 
             value="${tool.example}"
             placeholder="${tool.placeholder}"
             style="
               width: 100%;
               padding: 8px;
               margin: 10px 0;
               border: 1px solid #ddd;
               border-radius: 4px;
             ">
      
      <button class="calculate-btn" style="
        padding: 8px 16px;
        background: #2B2D33;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
      ">
        Рассчитать
      </button>
      
      <div class="tool-result" style="margin-top: 10px;"></div>
    </div>`;
  }

  render(data) {
    try {
      if (!this.parent) return;
      this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    } catch (error) {
      console.error('Carousel render error:', error);
      if (this.parent) {
        this.parent.innerHTML = '<p>Ошибка загрузки карусели</p>';
      }
    }
  }
}