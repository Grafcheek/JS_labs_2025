import { BackButtonComponent } from '../../components/back-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'

export class ApiTemplatesPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
        this.data = this.getData()
    }

    getData() {
        const products = [
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
                        src: "https://www.raiffeisen.ru/static/common/Mortgage/illustration/pages/1530x570-15.webp"
                    },
                    {
                        title: "Вклады под 12% годовых",
                        description: "Откройте вклад онлайн и зарабатывайте больше с гарантированной ставкой.",
                        src: "https://www.raiffeisen.ru/static/common/deposit_investing/Safeboxes_1530_570.webp"
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
                        src: "https://www.raiffeisen.ru/static/common/sme/mainpage/SME-sms-busines_UPD.webp"
                    },
                    {
                        title: "Валютные счета",
                        description: "Удобная работа с валютой и международными переводами. Поддержка SWIFT/SEPA.",
                        src: "https://www.raiffeisen.ru/static/common/DM/Transfers/01_val.webp"
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
                        src: "https://www.raiffeisen.ru/static/common/Invest/trust-management/capital-du-promo-block-background-desktop-il-1530x570-2v.webp"
                    },
                    {
                        title: "ОФЗ и корпоративные облигации",
                        description: "Надёжный пассивный доход с государственными гарантиями.",
                        src: "https://www.raiffeisen.ru/static/common/Invest/trust-management/capital-du-product-allweather-il-368x232-2v.webp"
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
                        src: "https://www.raiffeisen.ru/static/common/initial/Footer/LogotypeRetail.svg"
                    },
                    {
                        title: "Чат-бот в Telegram",
                        description: "Быстрые ответы на вопросы и управление услугами через мессенджер.",
                        src: "https://www.raiffeisen.ru/static/common/initial/Footer/Telegram.svg"
                    }
                ]
            }
        ]
        
        return products.find(product => product.id === Number(this.id)) || products[0]
    }

    getHTML() {
        return `
        <div id="api-templates-page" style="
            background-color: #F5F5F5;
            min-height: 100vh;
            font-family: 'ALS Hauss', Arial, sans-serif;
        ">
            <!-- Шапка -->
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

            <!-- Основной контент -->
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
                
                <!-- Дополнительная информация -->
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
        </div>`
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButtonContainer = document.getElementById('back-button-container')
        const backButton = new BackButtonComponent(backButtonContainer)
        backButton.render(this.clickBack.bind(this))

        const carouselContainer = document.getElementById('carousel-container')
        const carousel = new CaruselComponent(carouselContainer)
        carousel.render(this.data)
    }
}