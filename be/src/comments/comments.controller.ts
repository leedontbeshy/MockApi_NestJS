import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('search/by-content')
  searchByContent(@Query('content') content: string) {
    return this.commentsService.searchByContent(content);
  }

  @Get('filter/by-post/:postId')
  filterByPost(@Param('postId') postId: string) {
    return this.commentsService.filterByPost(+postId);
  }

  @Get('filter/by-user/:userId')
  filterByUser(@Param('userId') userId: string) {
    return this.commentsService.filterByUser(+userId);
  }

  @Get('filter/by-username')
  filterByUsername(@Query('username') username: string) {
    return this.commentsService.filterByUsername(username);
  }

  @Get('trending/recent')
  getRecent(@Query('limit') limit?: string) {
    return this.commentsService.getRecent(limit ? +limit : 10);
  }

  @Get('trending/recent-by-post/:postId')
  getRecentByPost(@Param('postId') postId: string, @Query('limit') limit?: string) {
    return this.commentsService.getRecentByPost(+postId, limit ? +limit : 10);
  }

  @Get('stats/overview')
  getStatistics() {
    return this.commentsService.getStatistics();
  }

  @Get('stats/by-post')
  getStatsByPost() {
    return this.commentsService.getStatsByPost();
  }

  @Get('stats/by-user')
  getStatsByUser() {
    return this.commentsService.getStatsByUser();
  }

  @Get('stats/most-active-users')
  getMostActiveUsers(@Query('limit') limit?: string) {
    return this.commentsService.getMostActiveUsers(limit ? +limit : 10);
  }

  @Post('bulk')
  createBulk(@Body() createCommentDtos: CreateCommentDto[]) {
    return this.commentsService.createBulk(createCommentDtos);
  }

  @Delete('bulk/by-post/:postId')
  removeByPost(@Param('postId') postId: string) {
    return this.commentsService.removeByPost(+postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
