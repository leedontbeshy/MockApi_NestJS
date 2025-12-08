import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro Max', description: 'Smartphone cao cấp từ Apple với chip A17 Pro, camera 48MP', price: 29990000, category: 'Điện thoại', stock: 50, imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+15', rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', description: 'Flagship Android với bút S-Pen, màn hình Dynamic AMOLED 2X', price: 27990000, category: 'Điện thoại', stock: 35, imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+S24', rating: 4.7 },
    { id: 3, name: 'MacBook Pro M3', description: 'Laptop chuyên nghiệp với chip M3, 16GB RAM, 512GB SSD', price: 45990000, category: 'Laptop', stock: 20, imageUrl: 'https://via.placeholder.com/300x300?text=MacBook+M3', rating: 4.9 },
    { id: 4, name: 'Dell XPS 13', description: 'Laptop mỏng nhẹ với Intel Core i7 Gen 13, màn hình 13.3 inch', price: 35990000, category: 'Laptop', stock: 25, imageUrl: 'https://via.placeholder.com/300x300?text=Dell+XPS', rating: 4.6 },
    { id: 5, name: 'Sony WH-1000XM5', description: 'Tai nghe chống ồn hàng đầu, pin 30 giờ, âm thanh Hi-Res', price: 7990000, category: 'Phụ kiện âm thanh', stock: 100, imageUrl: 'https://via.placeholder.com/300x300?text=Sony+WH', rating: 4.8 },
    { id: 6, name: 'AirPods Pro 2', description: 'Tai nghe không dây với chống ồn chủ động, âm thanh không gian', price: 6490000, category: 'Phụ kiện âm thanh', stock: 80, imageUrl: 'https://via.placeholder.com/300x300?text=AirPods', rating: 4.7 },
    { id: 7, name: 'iPad Air M2', description: 'Máy tính bảng với chip M2, màn hình Liquid Retina 10.9 inch', price: 16990000, category: 'Tablet', stock: 40, imageUrl: 'https://via.placeholder.com/300x300?text=iPad+Air', rating: 4.8 },
    { id: 8, name: 'Samsung Galaxy Tab S9', description: 'Tablet Android cao cấp với bút S-Pen, màn hình AMOLED', price: 18990000, category: 'Tablet', stock: 30, imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+Tab', rating: 4.6 },
    { id: 9, name: 'Apple Watch Series 9', description: 'Smartwatch với GPS, màn hình Always-On, theo dõi sức khỏe', price: 10990000, category: 'Đồng hồ thông minh', stock: 60, imageUrl: 'https://via.placeholder.com/300x300?text=Apple+Watch', rating: 4.7 },
    { id: 10, name: 'Samsung Galaxy Watch 6', description: 'Smartwatch Android với Wear OS, theo dõi giấc ngủ nâng cao', price: 7990000, category: 'Đồng hồ thông minh', stock: 45, imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+Watch', rating: 4.5 },
    { id: 11, name: 'Logitech MX Master 3S', description: 'Chuột không dây cao cấp cho công việc, 8K DPI, pin 70 ngày', price: 2490000, category: 'Phụ kiện máy tính', stock: 120, imageUrl: 'https://via.placeholder.com/300x300?text=MX+Master', rating: 4.9 },
    { id: 12, name: 'Keychron K8 Pro', description: 'Bàn phím cơ wireless QMK/VIA, hot-swap switch, RGB', price: 3290000, category: 'Phụ kiện máy tính', stock: 75, imageUrl: 'https://via.placeholder.com/300x300?text=Keychron', rating: 4.7 },
    { id: 13, name: 'LG UltraGear 27"', description: 'Màn hình gaming 4K 144Hz, IPS, G-Sync Compatible', price: 12990000, category: 'Màn hình', stock: 28, imageUrl: 'https://via.placeholder.com/300x300?text=LG+Monitor', rating: 4.6 },
    { id: 14, name: 'Nintendo Switch OLED', description: 'Máy chơi game cầm tay với màn hình OLED 7 inch sống động', price: 8990000, category: 'Gaming', stock: 55, imageUrl: 'https://via.placeholder.com/300x300?text=Switch', rating: 4.8 },
    { id: 15, name: 'PlayStation 5', description: 'Console game thế hệ mới với SSD tốc độ cao, ray tracing', price: 13990000, category: 'Gaming', stock: 15, imageUrl: 'https://via.placeholder.com/300x300?text=PS5', rating: 4.9 },
  ];

  private nextId = 16;

  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
    } as Product;
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;
    
    this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
    return this.products[productIndex];
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;
    
    const removed = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return removed;
  }

  searchByName(name: string) {
    if (!name) return [];
    return this.products.filter(product => 
      product.name.toLowerCase().includes(name.toLowerCase()) ||
      product.description.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    if (!category) return this.products;
    return this.products.filter(product => product.category === category);
  }

  filterByPriceRange(min: number, max: number) {
    if (!min || !max) return this.products;
    return this.products.filter(product => product.price >= min && product.price <= max);
  }

  getInStock(minStock: number = 1) {
    return this.products.filter(product => product.stock >= minStock);
  }

  getLowStock(threshold: number = 20) {
    return this.products.filter(product => product.stock > 0 && product.stock <= threshold);
  }

  getTopRated(limit: number = 10) {
    return [...this.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  getMostExpensive(limit: number = 10) {
    return [...this.products]
      .sort((a, b) => b.price - a.price)
      .slice(0, limit);
  }

  getBestDeals(limit: number = 10) {
    // Sort by rating-to-price ratio (best value)
    return [...this.products]
      .sort((a, b) => (b.rating / b.price * 1000000) - (a.rating / a.price * 1000000))
      .slice(0, limit);
  }

  getStatistics() {
    return {
      total: this.products.length,
      totalValue: this.products.reduce((sum, product) => sum + (product.price * product.stock), 0),
      averagePrice: this.products.reduce((sum, product) => sum + product.price, 0) / this.products.length,
      averageRating: this.products.reduce((sum, product) => sum + product.rating, 0) / this.products.length,
      totalStock: this.products.reduce((sum, product) => sum + product.stock, 0),
      inStockCount: this.products.filter(p => p.stock > 0).length,
      outOfStockCount: this.products.filter(p => p.stock === 0).length,
      categoriesCount: new Set(this.products.map(p => p.category)).size,
    };
  }

  getStatsByCategory() {
    const categoryStats = this.products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          count: 0,
          totalValue: 0,
          averagePrice: 0,
          averageRating: 0,
          totalRating: 0,
          totalStock: 0,
        };
      }
      acc[product.category].count++;
      acc[product.category].totalValue += product.price * product.stock;
      acc[product.category].totalRating += product.rating;
      acc[product.category].totalStock += product.stock;
      return acc;
    }, {} as Record<string, any>);

    Object.keys(categoryStats).forEach(category => {
      const stats = categoryStats[category];
      stats.averagePrice = stats.totalValue / stats.totalStock;
      stats.averageRating = stats.totalRating / stats.count;
      delete stats.totalRating;
    });

    return categoryStats;
  }

  updateStock(id: number, stock: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) return null;
    product.stock = stock;
    return product;
  }

  updatePrice(id: number, price: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) return null;
    product.price = price;
    return product;
  }

  applyDiscount(id: number, percentage: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) return null;
    const originalPrice = product.price;
    product.price = Math.round(product.price * (1 - percentage / 100));
    return {
      ...product,
      originalPrice,
      discount: percentage,
      saved: originalPrice - product.price,
    };
  }
}
