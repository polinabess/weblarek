import './scss/styles.scss';

// main.ts — только проверка, без повторной декларации классов

import { Catalog } from './components/base/Models/Catalog';
import { Cart } from './components/base/Models/Cart';
import { Buyer } from './components/base/Models/Buyer';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/base/WebLarekApi';

import { apiProducts } from './utils/data';

console.log('ПРОВЕРКА МОДЕЛЕЙ\n');

const catalog = new Catalog();
catalog.saveProducts(apiProducts.items);
console.log('Товары загружены:', catalog.getProducts().length);

const item = catalog.getProductById('854cef69-976d-4c2a-a18c-2aa45046c390');
if (item) {
  catalog.saveSelectedProduct(item);
  console.log('Выбран товар:', catalog.getSelectedProduct()?.title);
}

const cart = new Cart();
const p1 = catalog.getProductById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')!;
const p2 = catalog.getProductById('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')!;

cart.addProduct(p1);
cart.addProduct(p2);
console.log('В корзине:', cart.getItems().map(i => i.title));
console.log('Сумма:', cart.calculateTotal());

cart.removeProduct(p1);
console.log('После удаления:', cart.getQuantity());

const buyer = new Buyer();
buyer.setEmail('test@example.com');
buyer.setPhone('+7999000000');
buyer.setAddress('Москва, ул. Учебная');

console.log('Валидация ДО оплаты:', buyer.validate());


buyer.setPayment('card');
console.log('Оплата установлена');

console.log('Валидация ПОСЛЕ оплаты:', buyer.validate());
buyer.clearData();
console.log('Данные очищены\n');

console.log('ЗАВЕРШЕНО');


console.log('ЗАПРОС К СЕРВЕРУ\n');

const baseApi = new Api(import.meta.env.VITE_API_ORIGIN);
const webLarekApi = new WebLarekApi(baseApi);

webLarekApi
  .getProducts()
  .then((products) => {
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