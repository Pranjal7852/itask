import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  
  task: Partial<Task> = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aiNote: '',
    isGeneratingNote: false
  };

  onSubmit() {
    if (this.task.title?.trim()) {
      this.taskCreated.emit({ ...this.task } as Task);
      this.task = {
        title: '',
        description: '',
        status: TaskStatus.TODO,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        aiNote: '',
        isGeneratingNote: false
      };
    }
  }
} 