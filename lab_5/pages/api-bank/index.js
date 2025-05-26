import { HomeButtonComponent } from '../../components/home-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'

export class BankProductsPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
		this.data = this.getData()
	}

	getData() {
		const cards =  [
            {
                "id": 1,
                "title": "Продукты для физических лиц",
                "elements": [
                    {
                        "title": "Дебетовая карта с кешбэком",
                        "description": "Получайте до 10% кешбэка на повседневные покупки. Бесплатное обслуживание первый год.",
                        "src": "https://www.raiffeisen.ru/static/common/sme/mainpage/%20.webp"
                    },
                    {
                        "title": "Кредит наличными",
                        "description": "Оформите кредит онлайн — без справок и визита в офис. До 2 000 000 ₽ на срок до 5 лет.",
                        "src": "https://www.raiffeisen.ru/static/common/Digital_Marketing/main_illustrations/mob_main_obj.svg"
                    },
                    {
                        "title": "Вклады под 12% годовых",
                        "description": "Откройте вклад онлайн и зарабатывайте больше с гарантированной ставкой.",
                        "src": "https://www.raiffeisen.ru/static/common/SME_Finance/Benefit_ob_currancy.svg"
                    }
                ]
            },
            {
                "id": 2,
                "title": "Продукты для бизнеса",
                "elements": [
                    {
                        "title": "Расчётно-кассовое обслуживание",
                        "description": "Быстрое открытие счёта, бесплатное подключение онлайн-банка, круглосуточная поддержка.",
                        "src": "https://www.raiffeisen.ru/static/common/sme/mainpage/2.webp"
                    },
                    {
                        "title": "Кредит для бизнеса",
                        "description": "Оформите кредит до 10 млн ₽ на развитие бизнеса под льготные ставки.",
                        "src": "https://www.raiffeisen.ru/static/common/SME_Finance/Main_obj_OB.svg"
                    },
                    {
                        "title": "Валютные счета",
                        "description": "Удобная работа с валютой и международными переводами. Поддержка SWIFT/SEPA.",
                        "src": "https://www.raiffeisen.ru/static/common/SME_Finance/Benefit_ob_nalog_2025.svg"
                    }
                ]
            },
            {
                "id": 3,
                "title": "Инвестиционные решения",
                "elements": [
                    {
                        "title": "Брокерский счёт",
                        "description": "Инвестируйте в акции, облигации и фонды с минимальными комиссиями.",
                        "src": "https://www.raiffeisen.ru/static/common/Invest/funds/capital-pif-3-il-368x232.webp"
                    },
                    {
                        "title": "ПИФы от Райффайзен",
                        "description": "Готовые стратегии от профессиональных управляющих. Без налогов после 3 лет.",
                        "src": "https://www.raiffeisen.ru/static/common/special_offers/343x229_nal.webp"
                    },
                    {
                        "title": "ОФЗ и корпоративные облигации",
                        "description": "Надёжный пассивный доход с государственными гарантиями.",
                        "src": "https://www.raiffeisen.ru/static/common/deposit_investing/Safeboxes_1530_570.webp"
                    }
                ]
            },
            {
                "id": 4,
                "title": "Цифровые сервисы",
                "elements": [
                    {
                        "title": "Онлайн-банк",
                        "description": "Полный контроль над вашими финансами 24/7. Безопасно и удобно.",
                        "src": "https://www.raiffeisen.ru/static/common/sme/mainpage/4.webp"
                    },
                    {
                        "title": "Мобильное приложение",
                        "description": "Современное банковское приложение для управления счетами, картами и инвестициями.",
                        "src": "https://www.raiffeisen.ru/static/common/initial/Footer/LogotypeSme.svg"
                    },
                    {
                        "title": "Чат-бот в Telegram",
                        "description": "Быстрые ответы на вопросы и управление услугами через мессенджер.",
                        "src": "https://www.raiffeisen.ru/static/common/initial/Footer/Telegram.svg"
                    }
                ]
            }
        ]
        

		return (
			cards.find(card => card.id === Number(this.id)) ||
			cards[0]
		)
	}

	getHTML() {
		return `
    <div id="api-templates-page">
        <div class="main-container">
            <!-- Шапка -->
            <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

            <div class="header-center">
                <h4 class="header-title">${this.data.title}</h4>
            </div>

            <div class="carousel-container" id="carousel-container"></div>
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

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render(this.clickBack.bind(this))

		const carouselContainer = document.getElementById('carousel-container')
		const carousel = new CaruselComponent(carouselContainer)
		carousel.render(this.data)
	}
}
