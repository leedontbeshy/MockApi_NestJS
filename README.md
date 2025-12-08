# 🌐 Web Linh Tinh

Monorepo project tổng hợp các tính năng linh tinh với NestJS backend và Vue.js frontend.

## 📁 Cấu trúc Project

```
WebLinhTinh/
├── be/          # NestJS Backend
│   ├── src/
│   │   ├── users/
│   │   ├── posts/
│   │   ├── products/
│   │   ├── comments/
│   │   └── main.ts
│   └── package.json
├── fe/          # Vue.js Frontend
│   ├── src/
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
└── package.json # Root workspace
```

## 🚀 Quick Start

### Cài đặt dependencies

```bash
npm install
```

### Chạy cả Backend và Frontend cùng lúc

```bash
npm run dev
```

### Chạy riêng từng phần

```bash
# Chỉ Backend (port 3000)
npm run dev:be

# Chỉ Frontend (port 5173)
npm run dev:fe
```

## 🔧 Tính năng hiện có

### Backend APIs (http://localhost:3000)
- **Users API**: `/users` - Quản lý người dùng
- **Posts API**: `/posts` - Quản lý bài viết
- **Products API**: `/products` - Quản lý sản phẩm
- **Comments API**: `/comments` - Quản lý bình luận

### Frontend (http://localhost:5173)
- Dashboard hiển thị dữ liệu từ các API
- Tab switching giữa Users, Posts, Products, Comments
- Giao diện đẹp với Vue.js 3

## 📦 Build Production

```bash
# Build cả hai
npm run build

# Build riêng
npm run build:be
npm run build:fe
```

## 🛠️ Tech Stack

- **Backend**: NestJS, TypeScript
- **Frontend**: Vue.js 3, Vite
- **Package Manager**: npm workspaces (monorepo)

## 📝 Development

Backend sẽ chạy trên port 3000 và Frontend trên port 5173. CORS đã được enable để Frontend có thể gọi API từ Backend.
