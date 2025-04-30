// pages/main/index.js
import { AddCardButtonComponent } from '../../components/add-card-button/index.js';
import { TemplatesCardComponent } from '../../components/templates-card/index.js';
import { ApiTemplatesPage } from '../api-templates/index.js';
import { productsData } from '../../components/models/index.js';
import { FinancialTools } from '../../components/financial-tools/index.js';

import { AnalyticToolsPage } from '../analytic-tools/index.js';

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.originalData = [...productsData];
    this.filteredData = [...productsData];
    this.currentFilter = 'all';
    this.firstCard = {...this.originalData[0]};
    this.currentTool = null;
    this.activeCardId = null;
    this.financialTools = new FinancialTools();
  }

  getHTML() {
    return `
    <div id="main-page">
      <div class="filter-buttons" style="
        display: flex;
        gap: 12px;
        padding: 16px 24px;
        background: white;
        border-bottom: 1px solid #eee;
      ">
        <button id="filter-all" class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}">
          Все продукты
        </button>
        <button id="filter-fl" class="filter-btn ${this.currentFilter === 'ФЛ' ? 'active' : ''}">
          Физ. лица
        </button>
        <button id="filter-ul" class="filter-btn ${this.currentFilter === 'ЮЛ' ? 'active' : ''}">
          Бизнес
        </button>
      </div>

      <div class="cards-container" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        padding: 24px;
        background-color: #f5f5f5;
      "></div>
    </div>
    `;
  }

  applyFilter(filterType) {
    this.currentFilter = filterType;
    this.filteredData = this.originalData.filter(product => 
      filterType === 'all' || product.type === filterType
    );
    this.renderCards();
  }

  addEventListeners() {
    document.getElementById('filter-all')?.addEventListener('click', () => this.applyFilter('all'));
    document.getElementById('filter-fl')?.addEventListener('click', () => this.applyFilter('ФЛ'));
    document.getElementById('filter-ul')?.addEventListener('click', () => this.applyFilter('ЮЛ'));
  }

  renderTools(cardId) {
    this.activeCardId = cardId;
    const cardElement = document.querySelector(`[data-card-id="${cardId}"] .card-content`);
    if (!cardElement) return;

    cardElement.innerHTML = `
      <div style="padding: 16px;">
        <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <button class="tool-tab ${this.currentTool === 'sumSquares' ? 'active' : ''}" 
                  data-tool="sumSquares"
                  style="padding: 8px 12px; background: ${this.currentTool === 'sumSquares' ? '#0066cc' : '#f0f0f0'}; color: ${this.currentTool === 'sumSquares' ? 'white' : '#333'}; border: none; border-radius: 4px; cursor: pointer;">
            Сумма квадратов
          </button>
          <button class="tool-tab ${this.currentTool === 'sumAndMult' ? 'active' : ''}" 
                  data-tool="sumAndMult"
                  style="padding: 8px 12px; background: ${this.currentTool === 'sumAndMult' ? '#0066cc' : '#f0f0f0'}; color: ${this.currentTool === 'sumAndMult' ? 'white' : '#333'}; border: none; border-radius: 4px; cursor: pointer;">
            Сумма/произведение
          </button>
          <button class="tool-tab ${this.currentTool === 'qualityDiff' ? 'active' : ''}" 
                  data-tool="qualityDiff"
                  style="padding: 8px 12px; background: ${this.currentTool === 'qualityDiff' ? '#0066cc' : '#f0f0f0'}; color: ${this.currentTool === 'qualityDiff' ? 'white' : '#333'}; border: none; border-radius: 4px; cursor: pointer;">
            Качественная разница
          </button>
          <button class="tool-tab ${this.currentTool === 'anagrams' ? 'active' : ''}" 
                  data-tool="anagrams"
                  style="padding: 8px 12px; background: ${this.currentTool === 'anagrams' ? '#0066cc' : '#f0f0f0'}; color: ${this.currentTool === 'anagrams' ? 'white' : '#333'}; border: none; border-radius: 4px; cursor: pointer;">
            Анаграммы
          </button>
        </div>

        ${this.renderCurrentTool()}

        <button class="back-btn" style="
          margin-top: 16px;
          padding: 8px 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">
          Назад к продукту
        </button>
      </div>
    `;

    document.querySelectorAll('.tool-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentTool = tab.dataset.tool;
        this.renderTools(cardId);
      });
    });

    document.querySelector('.back-btn').addEventListener('click', () => {
      this.currentTool = null;
      this.renderCards();
    });

    this.setupCurrentTool();
  }

  renderCurrentTool() {
    switch(this.currentTool) {
      case 'sumSquares':
        return `
          <div>
            <h4 style="margin-bottom: 12px;">Сумма квадратов значений</h4>
            <input type="text" id="numbersInput" 
                   value="1, 2, 3, 4" 
                   placeholder="Введите числа через запятую"
                   style="width: 100%; padding: 8px; margin-bottom: 8px;">
            <button id="calculateBtn" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Рассчитать
            </button>
            <div id="result" style="margin-top: 12px;"></div>
          </div>
        `;

      case 'sumAndMult':
        return `
          <div>
            <h4 style="margin-bottom: 12px;">Сумма и произведение</h4>
            <input type="text" id="numbersInput" 
                   value="1, 2, 3, 4" 
                   placeholder="Введите числа через запятую"
                   style="width: 100%; padding: 8px; margin-bottom: 8px;">
            <button id="calculateBtn" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Рассчитать
            </button>
            <div id="result" style="margin-top: 12px;"></div>
          </div>
        `;

      case 'qualityDiff':
        return `
          <div>
            <h4 style="margin-bottom: 12px;">Качественная разница</h4>
            <input type="text" id="numbersInput" 
                   value="5,6,2,7,4" 
                   placeholder="Введите минимум 4 числа"
                   style="width: 100%; padding: 8px; margin-bottom: 8px;">
            <button id="calculateBtn" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Рассчитать
            </button>
            <div id="result" style="margin-top: 12px;"></div>
          </div>
        `;

      case 'anagrams':
        return `
          <div>
            <h4 style="margin-bottom: 12px;">Группировка анаграмм</h4>
            <input type="text" id="wordsInput" 
                   value="listen,silent,post,stop,tops,pots,get" 
                   placeholder="Введите слова через запятую"
                   style="width: 100%; padding: 8px; margin-bottom: 8px;">
            <button id="calculateBtn" style="
              padding: 8px 16px;
              background: #0066cc;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">
              Группировать
            </button>
            <div id="result" style="margin-top: 12px;"></div>
          </div>
        `;

      default:
        return '<p>Выберите инструмент для работы</p>';
    }
  }

  setupCurrentTool() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', () => {
      switch(this.currentTool) {
        case 'sumSquares':
          const input1 = document.getElementById('numbersInput').value;
          const numbers1 = input1.split(',').map(Number).filter(n => !isNaN(n));
          const result1 = this.financialTools.sumOfSquares(numbers1);
          document.getElementById('result').innerHTML = `
            <p>Сумма квадратов: <strong>${result1}</strong></p>
            <p>Для массива: [${numbers1.join(', ')}]</p>
          `;
          break;

        case 'sumAndMult':
          const input2 = document.getElementById('numbersInput').value;
          const numbers2 = input2.split(',').map(Number).filter(n => !isNaN(n));
          const { sum, product } = this.financialTools.getSumAndMultOfArray(numbers2);
          document.getElementById('result').innerHTML = `
            <p>Сумма: <strong>${sum}</strong></p>
            <p>Произведение: <strong>${product}</strong></p>
            <p>Для массива: [${numbers2.join(', ')}]</p>
          `;
          break;

        case 'qualityDiff':
          const input3 = document.getElementById('numbersInput').value;
          const numbers3 = input3.split(',').map(Number).filter(n => !isNaN(n));
          const result3 = this.financialTools.maxQualityDifference(numbers3);
          document.getElementById('result').innerHTML = numbers3.length < 4
            ? '<p class="error">Нужно минимум 4 числа</p>'
            : `<p>Максимальная разница: <strong>${result3}</strong></p>
               <p>Для массива: [${numbers3.join(', ')}]</p>`;
          break;

        case 'anagrams':
          const input4 = document.getElementById('wordsInput').value;
          const words = input4.split(',').map(w => w.trim()).filter(w => w);
          const groups = this.financialTools.groupAnagrams(words);
          let html = groups.length === 0
            ? '<p>Группы анаграмм не найдены</p>'
            : groups.map(group => `
                <div style="margin-bottom: 8px;">
                  <strong>Группа:</strong> ${group.join(', ')}
                </div>
              `).join('');
          document.getElementById('result').innerHTML = html;
          break;
      }
    });
  }

  renderCards() {
    const container = document.querySelector('#main-page .cards-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    this.filteredData.forEach(item => {
      const card = new TemplatesCardComponent(container);
      card.render(
        item,
        () => this.clickCard(item.id),
        () => this.handleRemoveCard(item.id)
      );
    });

    new AddCardButtonComponent(container).render(() => this.handleAddCard());
  }

  // pages/main/index.js
  clickCard(cardId) {
    const apiTemplatesPage = new ApiTemplatesPage(this.parent, cardId);
    apiTemplatesPage.render();
  }

  handleAddCard() {
    const newCard = {
      ...this.firstCard,
      id: Math.max(...this.originalData.map(c => c.id)) + 1,
      type: 'ФЛ'
    };
    
    this.originalData.push(newCard);
    
    if (this.currentFilter === 'all' || this.currentFilter === newCard.type) {
      this.filteredData.push(newCard);
    }
    
    this.renderCards();
  }

  handleRemoveCard(cardId) {
    this.originalData = this.originalData.filter(item => item.id !== cardId);
    this.filteredData = this.filteredData.filter(item => item.id !== cardId);
    
    if (this.filteredData.length === 0 && this.currentFilter !== 'all') {
      this.currentFilter = 'all';
      this.filteredData = [...this.originalData];
    }
    
    this.renderCards();
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.addEventListeners();
    this.renderCards();
  }
}