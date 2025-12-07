import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search/by-name')
  searchByName(@Query('name') name: string) {
    return this.usersService.searchByName(name);
  }

  @Get('filter/by-role')
  filterByRole(@Query('role') role: string) {
    return this.usersService.filterByRole(role);
  }

  @Get('filter/by-city')
  filterByCity(@Query('city') city: string) {
    return this.usersService.filterByCity(city);
  }

  @Get('filter/by-age-range')
  filterByAgeRange(@Query('min') min: string, @Query('max') max: string) {
    return this.usersService.filterByAgeRange(+min, +max);
  }

  @Get('stats/overview')
  getStatistics() {
    return this.usersService.getStatistics();
  }

  @Get('stats/by-city')
  getStatsByCity() {
    return this.usersService.getStatsByCity();
  }

  @Post('bulk')
  createBulk(@Body() createUserDtos: CreateUserDto[]) {
    return this.usersService.createBulk(createUserDtos);
  }

  @Delete('bulk')
  removeBulk(@Body('ids') ids: number[]) {
    return this.usersService.removeBulk(ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.updateRole(+id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
