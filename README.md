# Flora Backend API

Backend REST API для проєкту квіткового магазину **Flora**.

## 📋 Опис

Серверний застосунок на Node.js (Express), що обслуговує REST API для фронтенд-частини проєкту Flora. Використовує **PostgreSQL** базу даних через **Prisma ORM** для зберігання та управління колекцією букетів. Підтримує повний CRUD, пошук, сортування, пагінацію та управління статусом "обране".

## 🛠 Технології

- **Node.js** — середовище виконання
- **Express** — веб-фреймворк
- **Prisma ORM** — ORM для роботи з PostgreSQL
- **PostgreSQL** — реляційна база даних (Render Cloud)
- **Joi** — валідація запитів
- **Morgan** — HTTP-логування
- **CORS** — підтримка крос-доменних запитів
- **Swagger UI** — інтерактивна документація API
- **Nodemon** — авто-перезапуск сервера при розробці

## 🚀 Встановлення та запуск

### Передумови

- Node.js v18+ встановлено
- npm v9+ встановлено

### Встановлення

```bash
# Клонувати репозиторій
git clone https://github.com/W33nDen/flora_backend.git
cd flora_backend

# Встановити залежності (автоматично генерує Prisma Client)
npm install
```

### Налаштування середовища

Створіть файл `.env` у кореневій директорії:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Налаштування бази даних

```bash
# Синхронізувати схему Prisma з базою даних
npx prisma db push

# Заповнити базу початковими даними
npm run seed
```

### Запуск

```bash
# Режим розробки (з авто-перезапуском)
npm run dev

# Продакшн-режим
npm start
```

Сервер запуститься на `http://localhost:3000`

При успішному підключенні до БД у консолі з'явиться:
```
Database connection successful
Server is running. Use our API on port: 3000
```

## 📡 API Ендпоінти

### Букети (CRUD)

| Метод | Шлях | Опис |
|-------|------|------|
| `GET` | `/api/bouquets` | Отримати список букетів |
| `GET` | `/api/bouquets/:id` | Отримати букет за ID |
| `POST` | `/api/bouquets` | Створити новий букет |
| `PUT` | `/api/bouquets/:id` | Оновити букет |
| `DELETE` | `/api/bouquets/:id` | Видалити букет |
| `PATCH` | `/api/bouquets/:bouquetId/favorite` | Оновити статус "обране" |

#### Параметри запиту для `GET /api/bouquets`

| Параметр | Тип | Опис |
|----------|-----|------|
| `q` | `string` | Пошук за назвою та описом |
| `favorite` | `boolean` | Фільтр за статусом "обране" |
| `_sort` | `string` | Сортування: `title`, `-title`, `createdAt`, `-createdAt` |
| `_page` | `number` | Номер сторінки |
| `_per_page` | `number` | Кількість елементів на сторінці |

#### Приклад відповіді (з пагінацією)

```json
{
  "data": [...],
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 5,
  "pages": 5,
  "items": 20
}
```

#### Тіло запиту `PATCH /api/bouquets/:bouquetId/favorite`

```json
{
  "favorite": true
}
```

### Категорії

| Метод | Шлях | Опис |
|-------|------|------|
| `GET` | `/api/categories` | Отримати список категорій |

### Замовлення

| Метод | Шлях | Опис |
|-------|------|------|
| `GET` | `/api/orders` | Отримати всі замовлення |
| `POST` | `/api/orders` | Створити замовлення |

### Документація

| Шлях | Опис |
|------|------|
| `/api-docs` | Swagger UI інтерактивна документація |

## 📂 Структура проєкту

```
flora_backend/
├── prisma/
│   └── schema.prisma       # Prisma-схема (модель Bouquet)
├── db/
│   └── prismaClient.js     # Singleton PrismaClient
├── constants/               # Константи проєкту
├── controllers/             # Бізнес-логіка API (CRUD)
├── decorators/              # Обгортки для контролерів (ctrlWrapper)
├── helpers/                 # Утиліти (валідація, помилки, роутер)
├── middlewares/              # Проміжні обробники
├── models/                  # Моделі даних (Flower — legacy)
├── routes/api/              # HTTP-маршрути
├── schemas/                 # Joi-схеми валідації
├── scripts/
│   └── seed.js              # Скрипт заповнення БД
├── public/                  # Статичні файли (зображення)
├── .env                     # Змінні оточення (не в репозиторії)
├── prisma.config.ts         # Конфігурація Prisma (підключення до БД)
├── app.js                   # Ініціалізація Express-додатку
├── server.js                # Точка запуску сервера
├── envConfigs.js            # Конфігурація середовища
├── db.json                  # Початкові дані для seed
├── swagger.json             # OpenAPI документація
└── package.json             # Залежності та скрипти
```

## 👤 Автор

Ужвенко Денис — UMT
