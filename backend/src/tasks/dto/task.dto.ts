import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  aiNote?: string;
}

export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  aiNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}
