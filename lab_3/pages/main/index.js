import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { ApiTemplatesPage } from '../api-templates/index.js'

export class MainPage {
  constructor(parent) {
    this.parent = parent
    this.data = this.getData()
    this.firstCard = {...this.data[0]}
  }

  getData() {
    return [
      {
        id: 1,
        title: 'Продукты для физических лиц',
        elements: [
          {
            title: "Дебетовая карта с кешбэком",
            description: "Получайте до 10% кешбэка на повседневные покупки. Бесплатное обслуживание первый год.",
            src: "https://www.raiffeisen.ru/static/common/sme/mainpage/%20.webp"
          },
          {
            title: "Кредит наличными",
            description: "Оформите кредит онлайн — без справок и визита в офис. До 2 000 000 ₽ на срок до 5 лет.",
            src: "https://cdn-icons-png.flaticon.com/512/3523/3523063.png"
          },
          {
            title: "Вклады под 12% годовых",
            description: "Откройте вклад онлайн и зарабатывайте больше с гарантированной ставкой.",
            src: "https://cdn-icons-png.flaticon.com/512/2331/2331943.png"
          }
        ]
      },
      {
        id: 2,
        title: 'Продукты для бизнеса',
        elements: [
          {
            title: "Расчётно-кассовое обслуживание",
            description: "Быстрое открытие счёта, бесплатное подключение онлайн-банка, круглосуточная поддержка.",
            src: "https://www.raiffeisen.ru/static/common/sme/mainpage/2.webp"
          },
          {
            title: "Кредит для бизнеса",
            description: "Оформите кредит до 10 млн ₽ на развитие бизнеса под льготные ставки.",
            src: "https://cdn-icons-png.flaticon.com/512/1995/1995474.png"
          },
          {
            title: "Валютные счета",
            description: "Удобная работа с валютой и международными переводами. Поддержка SWIFT/SEPA.",
            src: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png"
          }
        ]
      },
      {
        id: 3,
        title: 'Инвестиционные решения',
        elements: [
          {
            title: "Брокерский счёт",
            description: "Инвестируйте в акции, облигации и фонды с минимальными комиссиями.",
            src: "https://www.raiffeisen.ru/static/common/Invest/funds/capital-pif-3-il-368x232.webp"
          },
          {
            title: "ПИФы от Райффайзен",
            description: "Готовые стратегии от профессиональных управляющих. Без налогов после 3 лет.",
            src: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
          },
          {
            title: "ОФЗ и корпоративные облигации",
            description: "Надёжный пассивный доход с государственными гарантиями.",
            src: "https://cdn-icons-png.flaticon.com/512/2438/2438078.png"
          }
        ]
      },
      {
        id: 4,
        title: 'Цифровые сервисы',
        elements: [
          {
            title: "Онлайн-банк",
            description: "Полный контроль над вашими финансами 24/7. Безопасно и удобно.",
            src: "https://www.raiffeisen.ru/static/common/sme/mainpage/4.webp"
          },
          {
            title: "Мобильное приложение",
            description: "Современное банковское приложение для управления счетами, картами и инвестициями.",
            src: "https://cdn-icons-png.flaticon.com/512/4813/4813791.png"
          },
          {
            title: "Чат-бот в Telegram",
            description: "Быстрые ответы на вопросы и управление услугами через мессенджер.",
            src: "https://cdn-icons-png.flaticon.com/512/5968/5968804.png"
          }
        ]
      }
    ]
  }

  get pageRoot() {
    return document.getElementById('main-page')
  }

  getHTML() {
    return `
  <div id="main-page" style="
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 24px;
    background-color: #f5f5f5;
    min-height: 100vh;
    align-items: start; /* Изменено с stretch на start */
  "></div>
  `
  }

  renderCards() {
    this.pageRoot.innerHTML = ''
    this.data.forEach(item => {
      const card = new TemplatesCardComponent(this.pageRoot)
      card.render(
        item,
        () => this.clickCard(item.id),
        () => this.handleRemoveCard(item.id)
      )
    })
    const addButton = new AddCardButtonComponent(this.pageRoot)
    addButton.render(() => this.handleAddCard())
  }

  clickCard(cardId) {
    const apiTemplatesPage = new ApiTemplatesPage(this.parent, cardId)
    apiTemplatesPage.render()
  }

  handleAddCard() {
    let newCard = {...this.firstCard}
    newCard.id = this.data.length + 1
    this.data.push(newCard)
    this.render()
  }

  handleRemoveCard(cardId) {
    this.data = this.data.filter(item => item.id !== cardId)
    this.renderCards()
  }

  render() {
    this.parent.innerHTML = ''
    this.parent.insertAdjacentHTML('beforeend', this.getHTML())
    this.renderCards()
  }
}