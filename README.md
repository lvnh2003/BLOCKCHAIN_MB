# Blockchain Certificate Management System

## Giới Thiệu
Dự án này là một hệ thống blockchain quản lý chứng chỉ để xác thực với 4 vai trò chính:
- **Admin**: Quản lý người dùng, chứng chỉ, và toàn bộ hệ thống.
- **Teacher**: Cấp và xác nhận chứng chỉ cho sinh viên.
- **Student**: Kiểm tra chứng chỉ của mình.
- **Company**: Xem thông tin sinh viên thông qua chứng chỉ.

Dự án gồm 3 thành phần chính:
1. **Backend (NestJS)**: API xử lý dữ liệu và giao tiếp với blockchain.
2. **Mobile App (React Native + Expo)**: Ứng dụng di động để người dùng tương tác.
3. **Web App (Next.js)**: Giao diện web để quản lý và sử dụng hệ thống.

---

## Cài Đặt

### 1. Clone Repository
```sh
git clone https://github.com/lvnh2003/BLOCKCHAIN_MB
cd BLOCKCHAIN_MB
```

### 2. Cài Đặt Backend (NestJS)
```sh
git clone https://github.com/Giang-st1-00/BLOCKCHAIN_BE
cd BLOCKCHAIN_BE
npm ci
docker compose -f ./docker-compose.local.yml up --build -d
```

#### Cấu hình môi trường
Tạo file `.env` trong thư mục `backend` với nội dung:
```
DATABASE_URL=your_database_url
BLOCKCHAIN_RPC_URL=your_blockchain_rpc
JWT_SECRET=your_jwt_secret
```

#### Chạy Backend
```sh
npm run start:dev
```

---

### 3. Cài Đặt Mobile App (React Native + Expo)
```sh
cd ../mobile
npm install
```
#### Chạy Ứng Dụng Mobile
```sh
npx expo start
```

---

### 4. Cài Đặt Web App (Next.js)
```sh
cd ../web
npm install
```

#### Chạy Web App
```sh
npm run dev
```

---

## Sử Dụng
1. **Admin** đăng nhập trên web để quản lý hệ thống.
2. **Teacher** sử dụng web hoặc mobile app để cấp và xác nhận chứng chỉ.
3. **Student** đăng nhập để xem chứng chỉ của mình trên web hoặc mobile app.
4. **Company** tra cứu thông tin sinh viên thông qua chứng chỉ.

---

## Công Nghệ Sử Dụng
- **Backend**: NestJS, PostgreSQL, Blockchain (Ethereum/Solana,...)
- **Mobile**: React Native (Expo)
- **Web**: Next.js (React)
