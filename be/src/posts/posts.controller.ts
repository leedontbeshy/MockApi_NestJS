import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('search/by-title')
  searchByTitle(@Query('title') title: string) {
    return this.postsService.searchByTitle(title);
  }

  @Get('search/by-content')
  searchByContent(@Query('content') content: string) {
    return this.postsService.searchByContent(content);
  }

  @Get('filter/by-category')
  filterByCategory(@Query('category') category: string) {
    return this.postsService.filterByCategory(category);
  }

  @Get('filter/by-user/:userId')
  filterByUser(@Param('userId') userId: string) {
    return this.postsService.filterByUser(+userId);
  }

  @Get('trending/most-liked')
  getMostLiked(@Query('limit') limit?: string) {
    return this.postsService.getMostLiked(limit ? +limit : 10);
  }

  @Get('trending/recent')
  getRecent(@Query('limit') limit?: string) {
    return this.postsService.getRecent(limit ? +limit : 10);
  }

  @Get('stats/overview')
  getStatistics() {
    return this.postsService.getStatistics();
  }

  @Get('stats/by-category')
  getStatsByCategory() {
    return this.postsService.getStatsByCategory();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post(':id/like')
  likePost(@Param('id') id: string) {
    return this.postsService.likePost(+id);
  }

  @Post(':id/unlike')
  unlikePost(@Param('id') id: string) {
    return this.postsService.unlikePost(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
