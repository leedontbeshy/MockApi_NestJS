import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@example.com', username: 'annguyen', age: 25, city: 'Hà Nội', role: 'admin' },
    { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@example.com', username: 'binhtran', age: 30, city: 'TP. Hồ Chí Minh', role: 'user' },
    { id: 3, name: 'Lê Hoàng Cường', email: 'cuong.le@example.com', username: 'cuongle', age: 28, city: 'Đà Nẵng', role: 'user' },
    { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@example.com', username: 'dungpham', age: 22, city: 'Hải Phòng', role: 'user' },
    { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@example.com', username: 'emhoang', age: 35, city: 'Cần Thơ', role: 'moderator' },
    { id: 6, name: 'Vũ Thị Phượng', email: 'phuong.vu@example.com', username: 'phuongvu', age: 27, city: 'Huế', role: 'user' },
    { id: 7, name: 'Đặng Văn Giang', email: 'giang.dang@example.com', username: 'giangdang', age: 31, city: 'Nha Trang', role: 'user' },
    { id: 8, name: 'Bùi Thị Hương', email: 'huong.bui@example.com', username: 'huongbui', age: 24, city: 'Vũng Tàu', role: 'user' },
    { id: 9, name: 'Ngô Văn Khoa', email: 'khoa.ngo@example.com', username: 'khoango', age: 29, city: 'Hà Nội', role: 'user' },
    { id: 10, name: 'Trịnh Thị Lan', email: 'lan.trinh@example.com', username: 'lantrinh', age: 26, city: 'TP. Hồ Chí Minh', role: 'user' },
  ];

  private nextId = 11;

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}
