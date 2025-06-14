import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto } from './dto/task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksService.findAll();
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.tasksService.findOne(id);
    return this.mapToResponseDto(task);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.create(createTaskDto);
    return this.mapToResponseDto(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.tasksService.update(id, updateTaskDto);
    return this.mapToResponseDto(task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
  }

  @Post(':id/generate-note')
  async generateAiNote(@Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.tasksService.generateAiNote(id);
    return this.mapToResponseDto(task);
  }

  private mapToResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      aiNote: task.aiNote,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
