import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { TodoFilter } from './dto/to-do-filter.dto';

@Controller('to-do')
@ApiTags('TO-DO')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  create(@Body()dto: CreateToDoDto) {
    return this.toDoService.create(dto);
  }

  @Get()
  findAll(@Query() query: TodoFilter) {
    return this.toDoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Query() query: TodoFilter) {
    return this.toDoService.update(+id, query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(+id);
  }
}
