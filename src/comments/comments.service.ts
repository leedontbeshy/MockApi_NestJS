import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
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
    
    const removedComment = this.comments[commentIndex];
    this.comments.splice(commentIndex, 1);
    return removedComment;
  }
}
