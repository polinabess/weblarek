import './scss/styles.scss';

// main.ts — только проверка, без повторной декларации классов

import { API_URL } from './utils/constants';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/services/WebLarekApi';

import { apiProducts } from './utils/data';

console.log('ПРОВЕРКА МОДЕЛЕЙ\n');

const catalog = new Catalog();

console.log('Пустой каталог:', catalog.getProducts());

const idP1 = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9';
const idP2 = '412bcf81-7e75-4e70-bdb9-d3c73c9803b7';
const idP3 = '854cef69-976d-4c2a-a18c-2aa45046c390';

catalog.saveProducts(apiProducts.items);
console.log('Каталог товаров, сохранённый в модель:', catalog.getProducts());
console.log('Поиск существующего товара по ID:', catalog.getProductById(idP1));

const item = catalog.getProductById(idP3);
if (item) {
  catalog.saveSelectedProduct(item);
  console.log('Выбор товара:', catalog.getSelectedProduct()?.title);
}

const cart = new Cart();

const p1 = catalog.getProductById(idP1)!;
const p2 = catalog.getProductById(idP2)!;

cart.addProduct(p1);
cart.addProduct(p2);
console.log('В корзине:', cart.getItems().map(i => i.title));
console.log('Сумма:', cart.calculateTotal());

cart.removeProduct(idP1);
console.log('После удаления количество товаров в корзине:', cart.getQuantity());
console.log('Проверка наличия товара в корзине', cart.hasProduct(idP2))

const buyer = new Buyer();
console.log('Начальное состояние:', buyer.getData());

console.log('Установка данных покупателя');
buyer.setEmail('test@example.com');
buyer.setPhone('+7999000000');
buyer.setAddress('Москва, ул. Учебная');
console.log('Получение данных после установки через сеттеры:', buyer.getData());

console.log('Валидация ДО оплаты:', buyer.validate());


buyer.setPayment('card');
console.log('Оплата установлена');

console.log('Валидация ПОСЛЕ оплаты:', buyer.validate());
buyer.clearData();
console.log('Данные очищены:', buyer.getData);

console.log('\nЗАВЕРШЕНО');


console.log('ЗАПРОС К СЕРВЕРУ\n');

const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

webLarekApi
  .getProducts()
  .then((response) => {
    const products = response.items;
    catalog.saveProducts(products);
    console.log('Товары с сервера получены и сохранены в каталог');
    console.log('Каталог теперь содержит:', catalog.getProducts().length, 'товаров');
    console.log(
      'Первые 3 товара:',
      catalog.getProducts().slice(0, 3).map((p) => p.title)
    );
  })
  .catch((error) => {
    console.error('Ошибка при запросе к серверу:', error);
  });

