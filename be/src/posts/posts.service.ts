import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'Học JavaScript cơ bản', content: 'JavaScript là ngôn ngữ lập trình phổ biến nhất hiện nay. Nó được sử dụng để phát triển web, mobile app, và cả backend.', userId: 1, category: 'Lập trình', createdAt: '2025-12-01T10:00:00Z', likes: 120 },
    { id: 2, title: 'React vs Vue - So sánh chi tiết', content: 'React và Vue đều là những framework tuyệt vời. Bài viết này sẽ so sánh chi tiết ưu nhược điểm của từng framework.', userId: 2, category: 'Lập trình', createdAt: '2025-12-02T14:30:00Z', likes: 85 },
    { id: 3, title: 'Hướng dẫn cài đặt Node.js', content: 'Node.js là runtime environment cho JavaScript. Hướng dẫn chi tiết cách cài đặt và cấu hình Node.js trên Windows, Mac và Linux.', userId: 3, category: 'Công nghệ', createdAt: '2025-12-03T09:15:00Z', likes: 95 },
    { id: 4, title: 'TypeScript cho người mới bắt đầu', content: 'TypeScript giúp code JavaScript của bạn an toàn hơn với type checking. Bắt đầu học TypeScript ngay hôm nay!', userId: 1, category: 'Lập trình', createdAt: '2025-12-03T16:45:00Z', likes: 110 },
    { id: 5, title: 'Thiết kế API RESTful tốt nhất', content: 'Các nguyên tắc và best practices khi thiết kế RESTful API. Tìm hiểu về HTTP methods, status codes, và cấu trúc endpoint.', userId: 4, category: 'Backend', createdAt: '2025-12-04T11:20:00Z', likes: 75 },
    { id: 6, title: 'CSS Grid vs Flexbox', content: 'Grid và Flexbox là hai công cụ mạnh mẽ cho layout trong CSS. Khi nào nên dùng Grid, khi nào nên dùng Flexbox?', userId: 2, category: 'Frontend', createdAt: '2025-12-04T13:00:00Z', likes: 88 },
    { id: 7, title: 'MongoDB vs PostgreSQL', content: 'So sánh chi tiết giữa NoSQL (MongoDB) và SQL (PostgreSQL). Lựa chọn database phù hợp cho dự án của bạn.', userId: 5, category: 'Database', createdAt: '2025-12-05T08:30:00Z', likes: 92 },
    { id: 8, title: 'Docker cho developers', content: 'Docker giúp đóng gói ứng dụng và dependencies. Tìm hiểu cách sử dụng Docker trong quá trình phát triển phần mềm.', userId: 3, category: 'DevOps', createdAt: '2025-12-05T15:10:00Z', likes: 105 },
    { id: 9, title: 'Git workflow cho team', content: 'Các Git workflow phổ biến: Git Flow, GitHub Flow, GitLab Flow. Chọn workflow phù hợp với team của bạn.', userId: 6, category: 'Công cụ', createdAt: '2025-12-05T17:25:00Z', likes: 67 },
    { id: 10, title: 'Authentication với JWT', content: 'JSON Web Token (JWT) là phương pháp xác thực phổ biến. Hướng dẫn implement JWT authentication trong Node.js.', userId: 4, category: 'Security', createdAt: '2025-12-06T09:00:00Z', likes: 130 },
  ];

  private nextId = 11;

  create(createPostDto: CreatePostDto) {
    const newPost: Post = {
      id: this.nextId++,
      ...createPostDto,
      createdAt: new Date().toISOString(),
    } as Post;
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find(post => post.id === id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;
    
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    return this.posts[postIndex];
  }

  remove(id: number) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;
    
    const removed = this.posts[postIndex];
    this.posts.splice(postIndex, 1);
    return removed;
  }

  searchByTitle(title: string) {
    if (!title) return [];
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  searchByContent(content: string) {
    if (!content) return [];
    return this.posts.filter(post => 
      post.content.toLowerCase().includes(content.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    if (!category) return this.posts;
    return this.posts.filter(post => post.category === category);
  }

  filterByUser(userId: number) {
    return this.posts.filter(post => post.userId === userId);
  }

  getMostLiked(limit: number = 10) {
    return [...this.posts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  }

  getRecent(limit: number = 10) {
    return [...this.posts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getStatistics() {
    return {
      total: this.posts.length,
      totalLikes: this.posts.reduce((sum, post) => sum + post.likes, 0),
      averageLikes: this.posts.reduce((sum, post) => sum + post.likes, 0) / this.posts.length,
      categoriesCount: new Set(this.posts.map(post => post.category)).size,
      categoryDistribution: this.posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  getStatsByCategory() {
    const categoryStats = this.posts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = { count: 0, totalLikes: 0, averageLikes: 0 };
      }
      acc[post.category].count++;
      acc[post.category].totalLikes += post.likes;
      return acc;
    }, {} as Record<string, { count: number; totalLikes: number; averageLikes: number }>);

    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].averageLikes = 
        categoryStats[category].totalLikes / categoryStats[category].count;
    });

    return categoryStats;
  }

  likePost(id: number) {
    const post = this.posts.find(post => post.id === id);
    if (!post) return null;
    post.likes++;
    return post;
  }

  unlikePost(id: number) {
    const post = this.posts.find(post => post.id === id);
    if (!post) return null;
    if (post.likes > 0) post.likes--;
    return post;
  }
}
