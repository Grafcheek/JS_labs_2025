import { BackButtonComponent } from '../../components/back-button/index.js';
import { CaruselComponent } from '../../components/carusel/index.js';
import { MainPage } from '../main/index.js';
import { productsData } from '../../components/models/index.js';
import { FinancialTools } from '../../components/financial-tools/index.js';

export class ApiTemplatesPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = Number(id);
    this.data = this.getData();
    this.financialTools = new FinancialTools();
  }

  getData() {
    const product = productsData.find(p => p.id === this.id);
    if (!product) {
      console.error(`Product with id ${this.id} not found`);
      return productsData[0];
    }
    return product;
  }

  getHTML() {
    return `
    <div id="api-templates-page" style="
      background-color: #F5F5F5;
      min-height: 100vh;
      font-family: 'ALS Hauss', Arial, sans-serif;
    ">
      <div style="
        background: white;
        padding: 16px 24px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
      ">
        <div style="
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 16px;
        ">
          <div id="back-button-container"></div>
          <h1 style="
            color: #2B2D33;
            font-size: 20px;
            font-weight: 500;
            margin: 0;
          ">${this.data.title}</h1>
        </div>
      </div>
      <div style="
        max-width: 1200px;
        margin: 0 auto;
        padding: 24px;
      ">
        <div id="carousel-container" style="
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        "></div>
        
        <div style="
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-top: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        ">
          <h3 style="
            color: #2B2D33;
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 16px;
          ">Может быть полезно</h3>
          <ul style="
            color: #2B2D33;
            padding-left: 20px;
            margin: 0;
          ">
            <li style="margin-bottom: 8px;">Тарифы и условия</li>
            <li style="margin-bottom: 8px;">Частые вопросы</li>
            <li>Офисы и банкоматы</li>
          </ul>
        </div>
      </div>
    </div>`;
  }

  clickBack() {
    new MainPage(this.parent).render();
  }

  setupCalculations() {
    if (this.id !== 5) return;
    
    document.querySelectorAll('.calculate-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const slide = btn.closest('.carousel-item');
        const input = slide.querySelector('.tool-input');
        const resultDiv = slide.querySelector('.tool-result');
        const toolType = this.data.elements[index].toolType;
        
        try {
          let resultHtml = '';
          switch(toolType) {
            case 'sumOfSquares':
              const numbers1 = input.value.split(',').map(Number).filter(n => !isNaN(n));
              const sumSq = this.financialTools.sumOfSquares(numbers1);
              resultHtml = `
                <p><strong>Суммарный риск:</strong> ${sumSq}</p>
                <p>(Сумма квадратов)</p>
              `;
              break;
  
            case 'sumAndMult':
              const numbers2 = input.value.split(',').map(Number).filter(n => !isNaN(n));
              const { sum, product } = this.financialTools.getSumAndMultOfArray(numbers2);
              resultHtml = `
                <p><strong>Сумма:</strong> ${sum}</p>
                <p><strong>Произведение:</strong> ${product}</p>
              `;
              break;
  
            case 'qualityDiff':
              const numbers3 = input.value.split(',').map(Number).filter(n => !isNaN(n));
              if (numbers3.length < 4) {
                resultHtml = '<p style="color: #d32f2f;">Нужно минимум 4 числа</p>';
              } else {
                const diff = this.financialTools.maxQualityDifference(numbers3);
                resultHtml = `
                  <p><strong>Максимальный разброс:</strong> ${diff}</p>
                  <p>(Качественная разница)<p>
                `;
              }
              break;
  
            case 'anagrams':
              const words = input.value.split(',').map(w => w.trim()).filter(w => w);
              const groups = this.financialTools.groupAnagrams(words);
              resultHtml = groups.length === 0 
                ? '<p>Группы анаграмм не найдены</p>' 
                : groups.map((group, index) => `
                  <div style="margin-bottom: 8px;">
                    <strong>${index + 1}. Группа:</strong> ${group.join(', ')}
                  </div>
                `).join('');
              break;
          }
          resultDiv.innerHTML = resultHtml;
        } catch (error) {
          resultDiv.innerHTML = `<p style="color: #d32f2f;">Ошибка: ${error.message}</p>`;
        }
      });
    });
  }

  render() {
    try {
      this.parent.innerHTML = this.getHTML();
      
      const backButtonContainer = document.getElementById('back-button-container');
      if (backButtonContainer) {
        new BackButtonComponent(backButtonContainer).render(() => this.clickBack());
      }

      const carouselContainer = document.getElementById('carousel-container');
      if (carouselContainer && this.data.elements) {
        new CaruselComponent(carouselContainer).render(this.data);
        this.setupCalculations();
      }
    } catch (error) {
      console.error('Render error:', error);
      this.parent.innerHTML = '<p>Ошибка загрузки страницы</p>';
    }
  }
}