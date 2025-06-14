import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/tasks.service';
import { HeaderComponent } from './components/header/header.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TaskFormComponent,
    TaskListComponent,
    LoadingSpinnerComponent
  ]
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  statusOptions = Object.values(TaskStatus);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
    });
  }

  onTaskCreated(task: Task) {
    this.taskService.addTask({
      title: task.title,
      description: task.description,
      status: task.status
    }).subscribe({
      next: (newTask: Task) => {
        this.tasks = [...this.tasks, newTask];
      },
      error: (error: Error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  onTaskStatusChange(task: Task) {
    this.taskService.updateTask(task.id, {
      title: task.title,
      description: task.description,
      status: task.status
    }).subscribe({
      next: (updatedTask: Task) => {
        this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      },
      error: (error: Error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  onTaskDelete(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      },
      error: (error: Error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  onGenerateNote(task: Task) {
    this.taskService.generateAiNote(task.id).subscribe({
      next: (updatedTask: Task) => {
        this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      },
      error: (error: Error) => {
        console.error('Error generating note:', error);
      }
    });
  }
}
