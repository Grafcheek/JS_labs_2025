import { MainPage } from './pages/main/index.js';

// Находим корневой элемент, куда будет рендериться страница
const root = document.getElementById('root');

// Создаем экземпляр класса MainPage
const mainPage = new MainPage(root);

// Рендерим страницу
mainPage.render();