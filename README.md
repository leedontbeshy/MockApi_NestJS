<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Mock Data JSON API server được xây dựng bằng NestJS để phục vụ việc học và thực hành Fetch API. Server cung cấp các REST API endpoints với mock data phong phú về users, posts, products, và comments.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Server sẽ chạy tại: **http://localhost:3000**

---

## 📚 API Endpoints

### Base URL
```
http://localhost:3000
```

### 👥 Users API

**GET** `/users` - Lấy danh sách tất cả users
```javascript
fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(data => console.log(data));
```

**GET** `/users/:id` - Lấy thông tin 1 user theo ID
```javascript
fetch('http://localhost:3000/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

**POST** `/users` - Tạo user mới
```javascript
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Nguyễn Văn A',
    email: 'a.nguyen@example.com',
    username: 'anguyen',
    age: 25,
    city: 'Hà Nội',
    role: 'user'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**PATCH** `/users/:id` - Cập nhật thông tin user
```javascript
fetch('http://localhost:3000/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    age: 26,
    city: 'TP. Hồ Chí Minh'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**DELETE** `/users/:id` - Xóa user
```javascript
fetch('http://localhost:3000/users/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Sample User Data:**
```json
{
  "id": 1,
  "name": "Nguyễn Văn An",
  "email": "an.nguyen@example.com",
  "username": "annguyen",
  "age": 25,
  "city": "Hà Nội",
  "role": "admin"
}
```

---

### 📝 Posts API

**GET** `/posts` - Lấy danh sách tất cả bài viết
```javascript
fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => console.log(data));
```

**GET** `/posts/:id` - Lấy thông tin 1 bài viết theo ID

**POST** `/posts` - Tạo bài viết mới
```javascript
fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Tiêu đề bài viết',
    content: 'Nội dung bài viết...',
    userId: 1,
    category: 'Lập trình',
    likes: 0
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**PATCH** `/posts/:id` - Cập nhật bài viết

**DELETE** `/posts/:id` - Xóa bài viết

**Sample Post Data:**
```json
{
  "id": 1,
  "title": "Học JavaScript cơ bản",
  "content": "JavaScript là ngôn ngữ lập trình phổ biến nhất hiện nay...",
  "userId": 1,
  "category": "Lập trình",
  "createdAt": "2025-12-01T10:00:00Z",
  "likes": 120
}
```

---

### 🛍️ Products API

**GET** `/products` - Lấy danh sách tất cả sản phẩm
```javascript
fetch('http://localhost:3000/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

**GET** `/products/:id` - Lấy thông tin 1 sản phẩm theo ID

**POST** `/products` - Tạo sản phẩm mới
```javascript
fetch('http://localhost:3000/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Tên sản phẩm',
    description: 'Mô tả sản phẩm',
    price: 1000000,
    category: 'Điện tử',
    stock: 50,
    imageUrl: 'https://example.com/image.jpg',
    rating: 4.5
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**PATCH** `/products/:id` - Cập nhật sản phẩm

**DELETE** `/products/:id` - Xóa sản phẩm

**Sample Product Data:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro Max",
  "description": "Smartphone cao cấp từ Apple với chip A17 Pro, camera 48MP",
  "price": 29990000,
  "category": "Điện thoại",
  "stock": 50,
  "imageUrl": "https://via.placeholder.com/300x300?text=iPhone+15",
  "rating": 4.8
}
```

---

### 💬 Comments API

**GET** `/comments` - Lấy danh sách tất cả comments
```javascript
fetch('http://localhost:3000/comments')
  .then(res => res.json())
  .then(data => console.log(data));
```

**GET** `/comments/:id` - Lấy thông tin 1 comment theo ID

**POST** `/comments` - Tạo comment mới
```javascript
fetch('http://localhost:3000/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    postId: 1,
    userId: 2,
    userName: 'Trần Văn B',
    content: 'Bình luận của tôi...'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**PATCH** `/comments/:id` - Cập nhật comment

**DELETE** `/comments/:id` - Xóa comment

**Sample Comment Data:**
```json
{
  "id": 1,
  "postId": 1,
  "userId": 2,
  "userName": "Trần Thị Bình",
  "content": "Bài viết rất hữu ích! Cảm ơn tác giả đã chia sẻ.",
  "createdAt": "2025-12-01T10:30:00Z"
}
```

---

## 🎯 Ví dụ sử dụng với Async/Await

```javascript
// Lấy danh sách users
async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Tạo sản phẩm mới
async function createProduct() {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Laptop Dell',
        description: 'Laptop gaming cao cấp',
        price: 25000000,
        category: 'Laptop',
        stock: 10,
        imageUrl: 'https://example.com/laptop.jpg',
        rating: 4.6
      })
    });
    const newProduct = await response.json();
    console.log('Sản phẩm mới:', newProduct);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Cập nhật post
async function updatePost(postId) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        likes: 150
      })
    });
    const updatedPost = await response.json();
    console.log('Post đã cập nhật:', updatedPost);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📊 Mock Data Statistics

- **Users**: 10 records
- **Posts**: 10 records  
- **Products**: 15 records
- **Comments**: 16 records

**Lưu ý**: Dữ liệu được lưu trữ in-memory, sẽ reset về trạng thái ban đầu khi restart server.

---

## 🔧 Features

- ✅ RESTful API với đầy đủ CRUD operations
- ✅ CORS enabled - truy cập từ mọi origin
- ✅ Mock data phong phú bằng tiếng Việt
- ✅ Response nhanh chóng với in-memory storage
- ✅ Hot reload trong development mode
- ✅ TypeScript type safety

---

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
