import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { validate as isValidUUID } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid task ID format');
    }

    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async generateAiNote(id: string): Promise<Task> {
    const task = await this.findOne(id);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate a simulated AI note based on task title and description
    const aiNotes = [
      `AI Analysis: This task appears to be ${task.status.toLowerCase().replace('_', ' ')}. Consider breaking it down into smaller subtasks for better productivity.`,
      `AI Suggestion: Based on the task description, estimated completion time is 2-4 hours. Prioritize this task if it's blocking other work.`,
      `AI Insight: This task relates to ${task.title.toLowerCase()}. Consider documenting the process for future reference.`,
      `AI Recommendation: For optimal results, tackle this task during your peak productivity hours. Set clear acceptance criteria before starting.`,
      `AI Note: This task might benefit from collaboration. Consider involving team members with relevant expertise.`,
    ];

    const randomNote = aiNotes[Math.floor(Math.random() * aiNotes.length)];

    task.aiNote = randomNote;
    return await this.taskRepository.save(task);
  }
}
