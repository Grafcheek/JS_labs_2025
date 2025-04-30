import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';
import { FinancialTools } from '../../components/financial-tools/index.js';

export class AnalyticToolsPage {
  constructor(parent, cardData) {
    this.parent = parent;
    this.cardData = cardData;
    this.financialTools = new FinancialTools();
    this.currentTool = null;
  }

  getHTML() {
    if (this.currentTool) {
      const tool = this.cardData.elements.find(el => el.toolType === this.currentTool);
      return `
        <div class="analytic-tool-page" style="padding: 20px;">
          <div id="back-button-container"></div>
          <h2>${tool.title}</h2>
          ${this.getToolInterface(this.currentTool)}
          <div class="tool-result" style="margin-top: 20px;"></div>
        </div>
      `;
    }

    return `
    <div class="analytic-tools-page" style="padding: 20px;">
      <div id="back-button-container"></div>
      <h1>${this.cardData.title}</h1>
      <div class="tools-grid" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 24px;
      ">
        ${this.cardData.elements.map(el => `
          <div class="tool-card" style="
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          ">
            <h3>${el.title}</h3>
            <p>${el.description}</p>
            <button class="use-tool-btn" data-tool="${el.toolType}" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              margin-top: 12px;
              cursor: pointer;
            ">
              Использовать
            </button>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

  getToolInterface(toolType) {
    // Реализация интерфейсов для каждого инструмента
    switch(toolType) {
      case 'sumOfSquares':
        return `
          <div>
            <input type="text" class="tool-input" value="1,2,3,4" 
                   style="width: 100%; padding: 8px; margin: 16px 0;">
            <button class="calculate-btn" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Рассчитать
            </button>
          </div>
        `;
      // Добавьте другие инструменты по аналогии
    }
  }

  clickBack() {
    if (this.currentTool) {
      this.currentTool = null;
      this.render();
    } else {
      new MainPage(this.parent).render();
    }
  }

  addEventListeners() {
    document.getElementById('back-button-container')?.addEventListener('click', () => this.clickBack());
    
    document.querySelectorAll('.use-tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.currentTool = e.target.dataset.tool;
        this.render();
      });
    });

    document.querySelector('.calculate-btn')?.addEventListener('click', () => {
      this.calculateResult();
    });
  }

  calculateResult() {
    const input = document.querySelector('.tool-input').value;
    const resultDiv = document.querySelector('.tool-result');
    
    try {
      let result;
      switch(this.currentTool) {
        case 'sumOfSquares':
          const numbers = input.split(',').map(Number).filter(n => !isNaN(n));
          result = this.financialTools.sumOfSquares(numbers);
          resultDiv.innerHTML = `
            <p><strong>Результат:</strong> ${result}</p>
            <p>Для чисел: [${numbers.join(', ')}]</p>
          `;
          break;
        // Добавьте другие инструменты
      }
    } catch (error) {
      resultDiv.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.addEventListeners();
  }
}