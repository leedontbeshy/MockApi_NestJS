import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('search/by-name')
  searchByName(@Query('name') name: string) {
    return this.productsService.searchByName(name);
  }

  @Get('filter/by-category')
  filterByCategory(@Query('category') category: string) {
    return this.productsService.filterByCategory(category);
  }

  @Get('filter/by-price-range')
  filterByPriceRange(@Query('min') min: string, @Query('max') max: string) {
    return this.productsService.filterByPriceRange(+min, +max);
  }

  @Get('filter/in-stock')
  getInStock(@Query('minStock') minStock?: string) {
    return this.productsService.getInStock(minStock ? +minStock : 1);
  }

  @Get('filter/low-stock')
  getLowStock(@Query('threshold') threshold?: string) {
    return this.productsService.getLowStock(threshold ? +threshold : 20);
  }

  @Get('trending/top-rated')
  getTopRated(@Query('limit') limit?: string) {
    return this.productsService.getTopRated(limit ? +limit : 10);
  }

  @Get('trending/most-expensive')
  getMostExpensive(@Query('limit') limit?: string) {
    return this.productsService.getMostExpensive(limit ? +limit : 10);
  }

  @Get('trending/best-deals')
  getBestDeals(@Query('limit') limit?: string) {
    return this.productsService.getBestDeals(limit ? +limit : 10);
  }

  @Get('stats/overview')
  getStatistics() {
    return this.productsService.getStatistics();
  }

  @Get('stats/by-category')
  getStatsByCategory() {
    return this.productsService.getStatsByCategory();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('stock') stock: number) {
    return this.productsService.updateStock(+id, stock);
  }

  @Patch(':id/price')
  updatePrice(@Param('id') id: string, @Body('price') price: number) {
    return this.productsService.updatePrice(+id, price);
  }

  @Post(':id/discount')
  applyDiscount(@Param('id') id: string, @Body('percentage') percentage: number) {
    return this.productsService.applyDiscount(+id, percentage);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
