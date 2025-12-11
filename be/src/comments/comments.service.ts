import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  // Sample comment data
  private comments: Comment[] = [
    { id: 1, postId: 1, userId: 2, userName: 'Trần Thị Bình', content: 'Bài viết rất hữu ích! Cảm ơn tác giả đã chia sẻ.', createdAt: '2025-12-01T10:30:00Z' },
    { id: 2, postId: 1, userId: 3, userName: 'Lê Hoàng Cường', content: 'Có thể giải thích rõ hơn về closure không ạ?', createdAt: '2025-12-01T11:15:00Z' },
    { id: 3, postId: 2, userId: 1, userName: 'Nguyễn Văn An', content: 'Mình thích React hơn vì ecosystem phong phú.', createdAt: '2025-12-02T15:00:00Z' },
    { id: 4, postId: 2, userId: 4, userName: 'Phạm Thị Dung', content: 'Vue dễ học hơn cho người mới bắt đầu theo mình.', createdAt: '2025-12-02T16:20:00Z' },
    { id: 5, postId: 3, userId: 5, userName: 'Hoàng Văn Em', content: 'Hướng dẫn rất chi tiết, đã cài đặt thành công!', createdAt: '2025-12-03T10:00:00Z' },
    { id: 6, postId: 3, userId: 6, userName: 'Vũ Thị Phượng', content: 'Có cách nào cài nhiều version Node.js không?', createdAt: '2025-12-03T10:45:00Z' },
    { id: 7, postId: 4, userId: 7, userName: 'Đặng Văn Giang', content: 'TypeScript thật sự giúp code chất lượng hơn nhiều!', createdAt: '2025-12-03T17:10:00Z' },
    { id: 8, postId: 5, userId: 8, userName: 'Bùi Thị Hương', content: 'Nên dùng HTTP status code 200 hay 201 cho POST?', createdAt: '2025-12-04T12:00:00Z' },
    { id: 9, postId: 5, userId: 2, userName: 'Trần Thị Bình', content: 'POST thành công nên trả về 201 Created nhé!', createdAt: '2025-12-04T12:30:00Z' },
    { id: 10, postId: 6, userId: 9, userName: 'Ngô Văn Khoa', content: 'Grid tốt cho layout 2D, Flexbox cho 1D.', createdAt: '2025-12-04T14:00:00Z' },
    { id: 11, postId: 7, userId: 10, userName: 'Trịnh Thị Lan', content: 'MongoDB phù hợp cho dữ liệu không có cấu trúc cố định.', createdAt: '2025-12-05T09:15:00Z' },
    { id: 12, postId: 7, userId: 1, userName: 'Nguyễn Văn An', content: 'PostgreSQL tốt cho dữ liệu có quan hệ phức tạp.', createdAt: '2025-12-05T10:00:00Z' },
    { id: 13, postId: 8, userId: 3, userName: 'Lê Hoàng Cường', content: 'Docker giúp triển khai app dễ dàng hơn rất nhiều!', createdAt: '2025-12-05T16:00:00Z' },
    { id: 14, postId: 9, userId: 4, userName: 'Phạm Thị Dung', content: 'Team mình đang dùng GitHub Flow, khá đơn giản.', createdAt: '2025-12-05T18:00:00Z' },
    { id: 15, postId: 10, userId: 5, userName: 'Hoàng Văn Em', content: 'JWT có bị lộ thì phải làm sao ạ?', createdAt: '2025-12-06T09:30:00Z' },
    { id: 16, postId: 10, userId: 6, userName: 'Vũ Thị Phượng', content: 'Nên set expiration time ngắn và dùng refresh token.', createdAt: '2025-12-06T10:00:00Z' },
  ];

  private nextId = 17;

  create(createCommentDto: CreateCommentDto) {
    const newComment: Comment = {
      id: this.nextId++,
      ...createCommentDto,
      createdAt: new Date().toISOString(),
    } as Comment;
    this.comments.push(newComment);
    return newComment;
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    return this.comments.find(comment => comment.id === id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentIndex = this.comments.findIndex(comment => comment.id === id);
    if (commentIndex === -1) return null;
    
    this.comments[commentIndex] = { ...this.comments[commentIndex], ...updateCommentDto };
    return this.comments[commentIndex];
  }

  remove(id: number) {
    const commentIndex = this.comments.findIndex(comment => comment.id === id);
    if (commentIndex === -1) return null;
    
    const removed = this.comments[commentIndex];
    this.comments.splice(commentIndex, 1);
    return removed;
  }

  searchByContent(content: string) {
    if (!content) return [];
    return this.comments.filter(comment => 
      comment.content.toLowerCase().includes(content.toLowerCase())
    );
  }

  filterByPost(postId: number) {
    return this.comments.filter(comment => comment.postId === postId);
  }

  filterByUser(userId: number) {
    return this.comments.filter(comment => comment.userId === userId);
  }

  filterByUsername(username: string) {
    if (!username) return this.comments;
    return this.comments.filter(comment => 
      comment.userName.toLowerCase().includes(username.toLowerCase())
    );
  }

  getRecent(limit: number = 10) {
    return [...this.comments]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getRecentByPost(postId: number, limit: number = 10) {
    return this.comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getStatistics() {
    const uniqueUsers = new Set(this.comments.map(c => c.userId)).size;
    const uniquePosts = new Set(this.comments.map(c => c.postId)).size;
    
    return {
      total: this.comments.length,
      uniqueUsers,
      uniquePosts,
      averageCommentsPerPost: this.comments.length / uniquePosts,
      averageCommentsPerUser: this.comments.length / uniqueUsers,
    };
  }

  getStatsByPost() {
    const postStats = this.comments.reduce((acc, comment) => {
      if (!acc[comment.postId]) {
        acc[comment.postId] = { count: 0, users: new Set() };
      }
      acc[comment.postId].count++;
      acc[comment.postId].users.add(comment.userId);
      return acc;
    }, {} as Record<number, { count: number; users: Set<number> }>);

    const result = {} as Record<number, { count: number; uniqueUsers: number }>;
    Object.keys(postStats).forEach(postId => {
      result[+postId] = {
        count: postStats[+postId].count,
        uniqueUsers: postStats[+postId].users.size,
      };
    });

    return result;
  }

  getStatsByUser() {
    const userStats = this.comments.reduce((acc, comment) => {
      if (!acc[comment.userId]) {
        acc[comment.userId] = {
          userName: comment.userName,
          count: 0,
          posts: new Set(),
        };
      }
      acc[comment.userId].count++;
      acc[comment.userId].posts.add(comment.postId);
      return acc;
    }, {} as Record<number, { userName: string; count: number; posts: Set<number> }>);

    const result = {} as Record<number, { userName: string; count: number; uniquePosts: number }>;
    Object.keys(userStats).forEach(userId => {
      result[+userId] = {
        userName: userStats[+userId].userName,
        count: userStats[+userId].count,
        uniquePosts: userStats[+userId].posts.size,
      };
    });

    return result;
  }

  getMostActiveUsers(limit: number = 10) {
    const userComments = this.comments.reduce((acc, comment) => {
      if (!acc[comment.userId]) {
        acc[comment.userId] = {
          userId: comment.userId,
          userName: comment.userName,
          count: 0,
        };
      }
      acc[comment.userId].count++;
      return acc;
    }, {} as Record<number, { userId: number; userName: string; count: number }>);

    return Object.values(userComments)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  createBulk(createCommentDtos: CreateCommentDto[]) {
    const newComments = createCommentDtos.map(dto => ({
      id: this.nextId++,
      ...dto,
      createdAt: new Date().toISOString(),
    } as Comment));
    this.comments.push(...newComments);
    return newComments;
  }

  removeByPost(postId: number) {
    const toRemove = this.comments.filter(comment => comment.postId === postId);
    this.comments = this.comments.filter(comment => comment.postId !== postId);
    return { removed: toRemove.length, comments: toRemove };
  }
}
