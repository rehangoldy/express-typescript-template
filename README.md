# 🚀 Express.js TypeScript Starter with MySQL (Sequelize)

[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-orange.svg)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blueviolet.svg)](https://sequelize.org/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-brightgreen.svg)](https://swagger.io/)

Template boilerplate backend RESTful API modern berbasis **Express.js 5**, **TypeScript**, **MySQL** dengan ORM **Sequelize**, serta dokumentasi interaktif **Swagger (OpenAPI 3.0)**. 

Dirancang dengan pola arsitektur berlapis (*Layered Architecture: Route ➔ Controller ➔ Service ➔ Model*), penanganan error terpusat (*Centralized Error Handling*), *Health Check*, dan *Graceful Shutdown*.

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
  - [1. Clone / Siapkan Project](#1-clone--siapkan-project)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Konfigurasi Environment (.env)](#3-konfigurasi-environment-env)
  - [4. Siapkan Database MySQL](#4-siapkan-database-mysql)
  - [5. Menjalankan Aplikasi](#5-menjalankan-aplikasi)
- [Daftar Script NPM](#-daftar-script-npm)
- [Dokumentasi API & Endpoint](#-dokumentasi-api--endpoint)
  - [Akses Swagger UI](#akses-swagger-ui)
  - [Tabel Endpoint](#tabel-endpoint)
  - [Contoh Request & Response](#contoh-request--response)
- [Format Response Standar](#-format-response-standar)
- [FAQ & Troubleshooting](#-faq--troubleshooting)

---

## ✨ Fitur Utama

- **Express 5 + TypeScript**: Menggunakan TypeScript modern dengan strict type checking untuk kode yang aman dan mudah di-maintain.
- **Fast Hot Reloading**: Menggunakan `tsx watch` untuk mode development super cepat tanpa perlu setup compiler yang rumit.
- **Database MySQL & Sequelize ORM**: Manajemen koneksi pool database, relasi model, dan sinkronisasi otomatis (`sequelize.sync()`).
- **Interactive Swagger Documentation**: Dokumentasi OpenAPI 3.0 otomatis dan interaktif melalui antarmuka Swagger UI di `/api-docs`.
- **Clean Layered Architecture**:
  - `routes`: Definisi routing HTTP dan anotasi OpenAPI / Swagger.
  - `controllers`: Menangani request & response HTTP.
  - `services`: Menangani business logic dan manipulasi data.
  - `models`: Definisi skema tabel database dengan Sequelize.
  - `middlewares`: Error handler terpusat dan penanganan 404.
  - `config`: Konfigurasi database dan Swagger.
- **Health Check & Monitoring**: Endpoint `/api/health` untuk memantau status uptime, memory, dan koneksi MySQL secara berkala.
- **Graceful Shutdown**: Menutup koneksi database dan server HTTP dengan aman saat menerima sinyal `SIGINT` (Ctrl+C) atau `SIGTERM`.

---

## 📁 Struktur Folder

```text
express-js-mysql/
├── src/
│   ├── config/
│   │   ├── database.ts        # Konfigurasi koneksi Sequelize & MySQL Pool
│   │   └── swagger.ts         # Konfigurasi Swagger JSDoc & OpenAPI Schemas
│   ├── controllers/
│   │   ├── health.controller.ts # Handler endpoint health check
│   │   └── user.controller.ts   # Handler CRUD user
│   ├── middlewares/
│   │   ├── error.middleware.ts    # Centralized error handler
│   │   └── notFound.middleware.ts # 404 route not found handler
│   ├── models/
│   │   ├── index.ts           # Registry & asosiasi relasi model
│   │   └── user.model.ts      # Model User Sequelize & TypeScript interfaces
│   ├── routes/
│   │   ├── health.routes.ts   # Routing untuk health check
│   │   ├── index.ts           # Penggabung seluruh routes
│   │   └── user.routes.ts     # Routing & Swagger docs untuk Users
│   ├── services/
│   │   └── user.service.ts    # Logic query database & bisnis user
│   ├── app.ts                 # Inisialisasi Express & middleware
│   └── server.ts              # Entry point aplikasi & koneksi database
├── .env                       # File variabel lingkungan lokal (jangan commit credential asli)
├── .env.example               # Template variabel lingkungan
├── .gitignore                 # File yang diabaikan oleh Git
├── package.json               # Konfigurasi package & scripts
├── tsconfig.json              # Konfigurasi TypeScript compiler
└── README.md                  # Dokumentasi proyek
```

---

## 💻 Prasyarat Sistem

Sebelum menjalankan proyek ini, pastikan komputer Anda telah terpasang:
- **Node.js** v18.0.0 atau lebih baru ([Download Node.js](https://nodejs.org/))
- **NPM** v8.0.0 atau lebih baru (bawaan Node.js)
- **MySQL Server** v8.0+ atau MariaDB 10.3+ (bisa melalui XAMPP, Laragon, Docker, atau MySQL Server native)

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Clone / Siapkan Project
Buka terminal dan masuk ke direktori proyek:
```bash
cd c:\template\express-js-mysql
```

### 2. Install Dependencies
Jalankan perintah berikut untuk menginstal seluruh package yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi Environment (.env)
Salin file `.env.example` menjadi `.env` jika belum ada:
```bash
# Di Windows PowerShell:
cp .env.example .env

# Atau Command Prompt / CMD:
copy .env.example .env
```

Buka file `.env` dan sesuaikan dengan kredensial MySQL lokal Anda:
```env
# Konfigurasi Server
PORT=3000
NODE_ENV=development

# Konfigurasi Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=express_ts_db
DB_DIALECT=mysql
```

### 4. Siapkan Database MySQL
Pastikan service MySQL Anda sudah berjalan (misalnya melalui XAMPP Control Panel atau Laragon).
Buat database baru sesuai dengan nama `DB_NAME` di `.env`:
```sql
CREATE DATABASE IF NOT EXISTS express_ts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
*(Tabel `users` akan dibuat secara otomatis oleh Sequelize saat server pertama kali dijalankan)*.

### 5. Menjalankan Aplikasi

#### Mode Development (Disarankan)
Jalankan server dengan fitur auto-reload saat ada perubahan file:
```bash
npm run dev
```

Output di terminal akan menampilkan:
```text
✅ Berhasil terhubung ke database MySQL.
✅ Semua model Sequelize berhasil disinkronisasi.
================================================
🚀 Server berjalan di http://localhost:3000
📖 Swagger API Docs: http://localhost:3000/api-docs
🩺 Health Check: http://localhost:3000/api/health
================================================
```

#### Mode Production
Untuk kompilasi TypeScript ke JavaScript murni lalu menjalankannya:
```bash
# 1. Kompilasi TypeScript ke folder dist/
npm run build

# 2. Jalankan hasil build
npm start
```

---

## 📜 Daftar Script NPM

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server dalam mode development menggunakan `tsx watch` (auto-reload cepat). |
| `npm run build` | Melakukan compile kode TypeScript (`src/`) menjadi JavaScript (`dist/`) menggunakan `tsc`. |
| `npm start` | Menjalankan aplikasi hasil build produksi (`node dist/server.js`). |

> **Catatan untuk pengguna Nodemon:**  
> Jika Anda menginstal nodemon lokal (`npm install nodemon`), jangan menjalankan `nodemon` langsung di terminal karena belum terdaftar di PATH global. Gunakan `npm run dev` (bawaan template menggunakan `tsx watch` yang lebih cepat untuk TypeScript) atau jalankan melalui `npx nodemon`.

---

## 📖 Dokumentasi API & Endpoint

### Akses Swagger UI
Buka browser dan kunjungi:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Di Swagger UI Anda dapat menguji langsung (*Try it out*) semua endpoint yang tersedia secara interaktif.

### Tabel Endpoint

| Method | Endpoint | Deskripsi | Status Sukses |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Pesan selamat datang & petunjuk navigasi | `200 OK` |
| `GET` | `/api/health` | Status kesehatan server & status koneksi database | `200 OK` |
| `GET` | `/api/users` | Mengambil seluruh daftar user | `200 OK` |
| `GET` | `/api/users/:id` | Mengambil detail user berdasarkan ID | `200 OK` |
| `POST` | `/api/users` | Menambahkan user baru | `201 Created` |
| `PUT` | `/api/users/:id` | Memperbarui data user berdasarkan ID | `200 OK` |
| `DELETE` | `/api/users/:id` | Menghapus user berdasarkan ID | `200 OK` |

---

### Contoh Request & Response

#### 1. Health Check
- **Request**: `GET http://localhost:3000/api/health`
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-10-21T07:55:00.000Z",
  "uptime": 142.35,
  "database": "connected",
  "environment": "development"
}
```

#### 2. Tambah User Baru
- **Request**: `POST http://localhost:3000/api/users`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "role": "user"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User berhasil dibuat",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "role": "user",
    "createdAt": "2026-10-21T07:56:00.000Z",
    "updatedAt": "2026-10-21T07:56:00.000Z"
  }
}
```

#### 3. Ambil Semua User
- **Request**: `GET http://localhost:3000/api/users`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Daftar user berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "role": "user",
      "createdAt": "2026-10-21T07:56:00.000Z",
      "updatedAt": "2026-10-21T07:56:00.000Z"
    }
  ]
}
```

#### 4. Update User
- **Request**: `PUT http://localhost:3000/api/users/1`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "Budi Santoso Update",
  "role": "admin"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "User berhasil diperbarui",
  "data": {
    "id": 1,
    "name": "Budi Santoso Update",
    "email": "budi@example.com",
    "role": "admin",
    "createdAt": "2026-10-21T07:56:00.000Z",
    "updatedAt": "2026-10-21T07:58:00.000Z"
  }
}
```

#### 5. Hapus User
- **Request**: `DELETE http://localhost:3000/api/users/1`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "User dengan ID 1 berhasil dihapus"
}
```

---

## 📦 Format Response Standar

Semua endpoint mengembalikan struktur respons JSON yang konsisten:

### Sukses
```json
{
  "success": true,
  "message": "Keterangan pesan operasi",
  "data": {} // atau array []
}
```

### Error / Gagal
```json
{
  "success": false,
  "message": "Pesan deskripsi kesalahan",
  "error": "Detail error opsional (hanya di mode development)"
}
```

---

## 🛠️ FAQ & Troubleshooting

### 1. `nodemon : The term 'nodemon' is not recognized`
**Penyebab**: Perintah `nodemon` dijalankan langsung di PowerShell / terminal, padahal nodemon baru terpasang di folder lokal `./node_modules/.bin`.  
**Solusi**:
- Cukup jalankan script development bawaan template yang jauh lebih cepat dan terintegrasi dengan TypeScript:
  ```bash
  npm run dev
  ```
- Jika tetap ingin menjalankan nodemon lokal:
  ```bash
  npx nodemon
  ```
- Atau jika ingin nodemon bisa dipanggil di mana saja secara global:
  ```bash
  npm install -g nodemon
  ```

### 2. `ECONNREFUSED 127.0.0.1:3306`
**Penyebab**: Service database MySQL belum aktif.  
**Solusi**:
- Pastikan MySQL Server sudah dinyalakan (misal klik **Start** pada modul MySQL di XAMPP Control Panel atau jalankan service MySQL).
- Periksa nilai `DB_PORT` di `.env` (default port MySQL adalah `3306`).

### 3. `ER_BAD_DB_ERROR: Unknown database 'express_ts_db'`
**Penyebab**: Database dengan nama yang tertera di file `.env` belum dibuat di MySQL.  
**Solusi**:
- Buka phpMyAdmin / DBeaver / MySQL CLI dan jalankan:
  ```sql
  CREATE DATABASE express_ts_db;
  ```

### 4. `ER_ACCESS_DENIED_ERROR: Access denied for user`
**Penyebab**: Username atau password MySQL pada file `.env` tidak cocok.  
**Solusi**:
- Buka file `.env` dan periksa kembali `DB_USER` dan `DB_PASSWORD`. (Pada XAMPP default biasanya `DB_USER=root` dan `DB_PASSWORD=` kosong).

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi [ISC](LICENSE). Silakan gunakan dan modifikasi template ini sesuai kebutuhan proyek Anda.
