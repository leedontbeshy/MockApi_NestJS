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

#### Basic CRUD Operations

**GET** `/users` - Lấy danh sách tất cả users

**GET** `/users/:id` - Lấy thông tin 1 user theo ID

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
```

**PATCH** `/users/:id` - Cập nhật thông tin user

**DELETE** `/users/:id` - Xóa user

#### Search & Filter

**GET** `/users/search/by-name?name={name}` - Tìm kiếm user theo tên
```javascript
fetch('http://localhost:3000/users/search/by-name?name=Nguyễn')
```

**GET** `/users/filter/by-role?role={role}` - Lọc users theo vai trò (admin, user, moderator)
```javascript
fetch('http://localhost:3000/users/filter/by-role?role=admin')
```

**GET** `/users/filter/by-city?city={city}` - Lọc users theo thành phố
```javascript
fetch('http://localhost:3000/users/filter/by-city?city=Hà Nội')
```

**GET** `/users/filter/by-age-range?min={min}&max={max}` - Lọc users theo độ tuổi
```javascript
fetch('http://localhost:3000/users/filter/by-age-range?min=25&max=30')
```

#### Statistics

**GET** `/users/stats/overview` - Thống kê tổng quan (tổng số, tuổi trung bình, phân bố theo role/city)

**GET** `/users/stats/by-city` - Thống kê chi tiết theo từng thành phố

#### Bulk Operations

**POST** `/users/bulk` - Tạo nhiều users cùng lúc
```javascript
fetch('http://localhost:3000/users/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify([
    { name: 'User 1', email: 'user1@example.com', username: 'user1', age: 25, city: 'Hà Nội', role: 'user' },
    { name: 'User 2', email: 'user2@example.com', username: 'user2', age: 30, city: 'Đà Nẵng', role: 'user' }
  ])
})
```

**DELETE** `/users/bulk` - Xóa nhiều users
```javascript
fetch('http://localhost:3000/users/bulk', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ids: [1, 2, 3] })
})
```

#### Update Operations

**PATCH** `/users/:id/role` - Cập nhật vai trò của user
```javascript
fetch('http://localhost:3000/users/1/role', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ role: 'admin' })
})
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

#### Basic CRUD Operations

**GET** `/posts` - Lấy danh sách tất cả bài viết

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
```

**PATCH** `/posts/:id` - Cập nhật bài viết

**DELETE** `/posts/:id` - Xóa bài viết

#### Search & Filter

**GET** `/posts/search/by-title?title={title}` - Tìm kiếm bài viết theo tiêu đề
```javascript
fetch('http://localhost:3000/posts/search/by-title?title=JavaScript')
```

**GET** `/posts/search/by-content?content={content}` - Tìm kiếm bài viết theo nội dung
```javascript
fetch('http://localhost:3000/posts/search/by-content?content=React')
```

**GET** `/posts/filter/by-category?category={category}` - Lọc bài viết theo danh mục
```javascript
fetch('http://localhost:3000/posts/filter/by-category?category=Lập trình')
```

**GET** `/posts/filter/by-user/:userId` - Lọc bài viết theo user
```javascript
fetch('http://localhost:3000/posts/filter/by-user/1')
```

#### Trending & Popular

**GET** `/posts/trending/most-liked?limit={limit}` - Bài viết được thích nhiều nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/posts/trending/most-liked?limit=5')
```

**GET** `/posts/trending/recent?limit={limit}` - Bài viết mới nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/posts/trending/recent?limit=5')
```

#### Statistics

**GET** `/posts/stats/overview` - Thống kê tổng quan (tổng số bài viết, tổng likes, trung bình likes, phân bố danh mục)

**GET** `/posts/stats/by-category` - Thống kê chi tiết theo từng danh mục

#### Like Operations

**POST** `/posts/:id/like` - Thích bài viết (tăng số likes)
```javascript
fetch('http://localhost:3000/posts/1/like', {
  method: 'POST'
})
```

**POST** `/posts/:id/unlike` - Bỏ thích bài viết (giảm số likes)
```javascript
fetch('http://localhost:3000/posts/1/unlike', {
  method: 'POST'
})
```

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

#### Basic CRUD Operations

**GET** `/products` - Lấy danh sách tất cả sản phẩm

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
```

**PATCH** `/products/:id` - Cập nhật sản phẩm

**DELETE** `/products/:id` - Xóa sản phẩm

#### Search & Filter

**GET** `/products/search/by-name?name={name}` - Tìm kiếm sản phẩm theo tên hoặc mô tả
```javascript
fetch('http://localhost:3000/products/search/by-name?name=iPhone')
```

**GET** `/products/filter/by-category?category={category}` - Lọc sản phẩm theo danh mục
```javascript
fetch('http://localhost:3000/products/filter/by-category?category=Điện thoại')
```

**GET** `/products/filter/by-price-range?min={min}&max={max}` - Lọc sản phẩm theo khoảng giá
```javascript
fetch('http://localhost:3000/products/filter/by-price-range?min=10000000&max=30000000')
```

**GET** `/products/filter/in-stock?minStock={minStock}` - Lấy sản phẩm còn hàng (mặc định: minStock=1)
```javascript
fetch('http://localhost:3000/products/filter/in-stock?minStock=10')
```

**GET** `/products/filter/low-stock?threshold={threshold}` - Lấy sản phẩm sắp hết hàng (mặc định: threshold=20)
```javascript
fetch('http://localhost:3000/products/filter/low-stock?threshold=15')
```

#### Trending & Popular

**GET** `/products/trending/top-rated?limit={limit}` - Sản phẩm đánh giá cao nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/products/trending/top-rated?limit=5')
```

**GET** `/products/trending/most-expensive?limit={limit}` - Sản phẩm giá cao nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/products/trending/most-expensive?limit=5')
```

**GET** `/products/trending/best-deals?limit={limit}` - Sản phẩm có giá trị tốt nhất (rating/price ratio) (mặc định: 10)
```javascript
fetch('http://localhost:3000/products/trending/best-deals?limit=5')
```

#### Statistics

**GET** `/products/stats/overview` - Thống kê tổng quan (tổng số, giá trung bình, rating trung bình, tồn kho, v.v.)

**GET** `/products/stats/by-category` - Thống kê chi tiết theo từng danh mục

#### Update Operations

**PATCH** `/products/:id/stock` - Cập nhật số lượng tồn kho
```javascript
fetch('http://localhost:3000/products/1/stock', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ stock: 100 })
})
```

**PATCH** `/products/:id/price` - Cập nhật giá sản phẩm
```javascript
fetch('http://localhost:3000/products/1/price', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 25990000 })
})
```

**POST** `/products/:id/discount` - Áp dụng giảm giá (phần trăm)
```javascript
fetch('http://localhost:3000/products/1/discount', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ percentage: 10 })
})
// Response includes originalPrice, discount, saved amount
```

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

#### Basic CRUD Operations

**GET** `/comments` - Lấy danh sách tất cả comments

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
```

**PATCH** `/comments/:id` - Cập nhật comment

**DELETE** `/comments/:id` - Xóa comment

#### Search & Filter

**GET** `/comments/search/by-content?content={content}` - Tìm kiếm comment theo nội dung
```javascript
fetch('http://localhost:3000/comments/search/by-content?content=hữu ích')
```

**GET** `/comments/filter/by-post/:postId` - Lấy tất cả comments của 1 bài viết
```javascript
fetch('http://localhost:3000/comments/filter/by-post/1')
```

**GET** `/comments/filter/by-user/:userId` - Lấy tất cả comments của 1 user
```javascript
fetch('http://localhost:3000/comments/filter/by-user/2')
```

**GET** `/comments/filter/by-username?username={username}` - Lọc comments theo tên user
```javascript
fetch('http://localhost:3000/comments/filter/by-username?username=Nguyễn')
```

#### Recent Comments

**GET** `/comments/trending/recent?limit={limit}` - Lấy comments mới nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/comments/trending/recent?limit=5')
```

**GET** `/comments/trending/recent-by-post/:postId?limit={limit}` - Lấy comments mới nhất của 1 bài viết (mặc định: 10)
```javascript
fetch('http://localhost:3000/comments/trending/recent-by-post/1?limit=5')
```

#### Statistics

**GET** `/comments/stats/overview` - Thống kê tổng quan (tổng số comments, unique users, unique posts, trung bình comments/post, v.v.)

**GET** `/comments/stats/by-post` - Thống kê số lượng comments theo từng bài viết

**GET** `/comments/stats/by-user` - Thống kê số lượng comments theo từng user

**GET** `/comments/stats/most-active-users?limit={limit}` - Lấy danh sách users hoạt động nhiều nhất (mặc định: 10)
```javascript
fetch('http://localhost:3000/comments/stats/most-active-users?limit=5')
```

#### Bulk Operations

**POST** `/comments/bulk` - Tạo nhiều comments cùng lúc
```javascript
fetch('http://localhost:3000/comments/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify([
    { postId: 1, userId: 2, userName: 'User 1', content: 'Comment 1' },
    { postId: 1, userId: 3, userName: 'User 2', content: 'Comment 2' }
  ])
})
```

**DELETE** `/comments/bulk/by-post/:postId` - Xóa tất cả comments của 1 bài viết
```javascript
fetch('http://localhost:3000/comments/bulk/by-post/1', {
  method: 'DELETE'
})
```

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
- ✅ Advanced search & filter endpoints
- ✅ Statistics & analytics endpoints
- ✅ Bulk operations support
- ✅ Trending & popular content endpoints
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
