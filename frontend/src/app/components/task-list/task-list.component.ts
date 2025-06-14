import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TaskCardComponent]
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() statusOptions: TaskStatus[] = [];
  
  @Output() taskStatusChange = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<string>();
  @Output() generateNote = new EventEmitter<Task>();

  onTaskStatusChange(task: Task) {
    this.taskStatusChange.emit(task);
  }

  onTaskDelete(taskId: string) {
    this.taskDelete.emit(taskId);
  }

  onGenerateNote(task: Task) {
    this.generateNote.emit(task);
  }
} 