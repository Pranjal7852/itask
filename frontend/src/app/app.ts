import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule, MatSelectModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'

})
export class App {
  tasks: Task[] = [];
  isLoading = true;

  newTask = {
    title: '',
    description: '',
    status: TaskStatus.TODO
  };

  TaskStatus = TaskStatus;
  statusOptions = Object.values(TaskStatus);

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.isLoading = false;
      }
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) return;
    this.taskService.addTask(this.newTask).subscribe(task => {
      this.tasks.unshift(task);
      this.newTask = { title: '', description: '', status: TaskStatus.TODO };
    });
  }

  updateTask(task: Task) {
    task.isEditing = false;
    this.taskService.updateTask(task.id, task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  generateNote(task: Task) {
    task.isGeneratingNote = true;
    this.taskService.generateAiNote(task.id).subscribe({
      next: (updatedTask) => {
        task.aiNote = updatedTask.aiNote;
        task.updatedAt = updatedTask.updatedAt;
        task.isGeneratingNote = false;
      },
      error: () => {
        task.isGeneratingNote = false;
      }
    });
  }
}
