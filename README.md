# Tugas 1 Praktikum PPL - Task Manager API

## 1. Deskripsi Project
Task Manager API adalah sebuah RESTful API sederhana yang dibangun menggunakan Node.js dan Express untuk fungsionalitas Manajemen Daftar Tugas (To-Do List). API ini memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) terkait tugas harian. Penyimpanan data saat ini menggunakan mode In-Memory Array.

## 2. Dokumentasi API

Base URL: `http://localhost:3000`

### a. GET /api/tasks
- **Fungsi**: Mendapatkan semua daftar tugas.
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "Mengerjakan Tugas PPL",
        "completed": false
      }
    ]
  }
  ```

### b. GET /api/tasks/:id
- **Fungsi**: Mendapatkan rincian sebuah tugas berdasarkan ID.
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Mengerjakan Tugas PPL",
      "completed": false
    }
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "status": "error",
    "message": "Task not found"
  }
  ```

### c. POST /api/tasks
- **Fungsi**: Menambahkan tugas baru.
- **Request Body**:
  ```json
  {
    "title": "Beberes Rumah"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "title": "Beberes Rumah",
      "completed": false
    }
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "status": "error",
    "message": "Title is required"
  }
  ```

### d. PUT /api/tasks/:id
- **Fungsi**: Memperbarui tugas berdasarkan ID.
- **Request Body**:
  ```json
  {
    "title": "Beberes Kamar",
    "completed": true
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "title": "Beberes Kamar",
      "completed": true
    }
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "status": "error",
    "message": "Task not found"
  }
  ```

### e. DELETE /api/tasks/:id
- **Fungsi**: Menghapus tugas berdasarkan ID.
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Deleted"
  }
  ```
- **Error Response (404 Not Found)**:
  ```json
  {
    "status": "error",
    "message": "Task not found"
  }
  ```

## 3. Panduan Instalasi (Docker)

Aplikasi API ini telah dikontainerisasi menggunakan Docker. Anda dapat dengan mudah menjalankan *environment* pengembangan ini secara langsung tanpa instalasi Node.js pada lokal mesin.

Langkah-langkah menjalankan aplikasi:
1. Pastikan Anda berada pada direktori utama proyek tempat `docker-compose.yml` berada.
2. Jalankan perintah berikut untuk *build image* sekaligus menjalankan kontainernya (tanpa emoji):
   ```bash
   docker-compose up --build
   ```
   *Atau jalankan `docker-compose up -d --build` untuk menjalankan container pada background mode (detached).*

**Informasi Port Port yang Digunakan**:
- **Container Port**: 3000 (Sesuai dengan `EXPOSE 3000` pada Dockerfile)
- **Host Port**: 3000 (Aplikasi berjalan lokal di `localhost:3000` hasil mapping dari Docker Compose `3000:3000`)

## 4. Alur Kerja Git

Repositori ini menerapkan strategi percabangan (*branching strategy*) serta aturan *commit* terstandarisasi untuk mempermudah identifikasi *history* perubahan.
- **Main Branch (`main`)**: Berisi kode sumber yang stabil (*production-ready*).
- **Develop Branch (`develop`)**: Berisi kode sumber dengan tahap percobaan (*staging*) yang nantinya digabungkan (*merge*) ke main.
- **Feature Branches (`feature/*`)**: Berisi pengerjaan fitur baru dengan prefix `feature/buat-api`.

**Bukti Penggunaan Conventional Commits**:
Setiap komit harus dimulai dengan parameter tipe seperti `feat`, `fix`, `docs`, `test`, `chore`.
Berdasarkan log yang biasa dibangun pada projek ini, berikut simulasinya:
- `feat: menambahkan endpoint post task`
- `fix: memperbaiki error handle task not found`
- `docs: dokumentasi instalasi pada readme`
- `test: penambahan unit test crud operasional supersest`

## 5. Status Automasi (GitHub Actions)

![CI Status](https://github.com/ikanhiusukamakanikan/Tugas1PraktikumPPL/actions/workflows/node.js.yml/badge.svg)

Proyek ini telah dikonfigurasi menggunakan layanan pipelinr CI/CD pada GitHub Actions:
- **CI (Continuous Integration) untuk Tes**: Workflow berjalan saat ada proses Push maupun Pull Request guna mendeteksi kecacatan kode baru. Proses utama berupa instalasi dependensi, setup *Node.js version*, lalu diakhiri pemanggilan `npm test` menggunakan `Jest`.
- **CS (*Code Scanning*/Analisis Statis)**: (Opsional jika diterapkan nanti) Memeriksa celah keamanan atau pengecekan kerentanan ketergantungan *libraries*.