# News API

API for a news platform built with Node.js, Express, TypeScript, and MySQL.

## Tech stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Getting started

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Fill in your database credentials and a JWT secret in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=news_db
JWT_SECRET=your_secret_key
PORT=3000
```

4. Import the database schema:

```bash
mysql -u root -p < Database.sql
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start dev server              |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start`     | Run compiled build            |

## API endpoints

### Auth

| Method | Endpoint         | Auth | Description                    |
| ------ | ---------------- | ---- | ------------------------------ |
| POST   | `/auth/register` | No   | Register a new user            |
| POST   | `/auth/login`    | No   | Log in and receive a JWT token |

#### POST /auth/register

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

#### POST /auth/login

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

Returns:

```json
{
  "message": "Login successful",
  "user": { "id": 1, "email": "user@example.com" },
  "token": "<jwt>"
}
```

### Articles

| Method | Endpoint    | Auth | Description          |
| ------ | ----------- | ---- | -------------------- |
| GET    | `/articles` | No   | Get all articles     |
| POST   | `/articles` | Yes  | Create a new article |

#### POST /articles

Requires `Authorization: Bearer <token>` header.

```json
{
  "title": "My article",
  "body": "Article content here.",
  "category": "Sport"
}
```

## Database schema

**users**

- `id` — auto increment primary key
- `email` — unique
- `password_hash` — bcrypt hashed
- `created_at`

**articles**

- `id` — auto increment primary key
- `title`
- `body`
- `category`
- `submitted_by` — user id of the author
- `created_at`
