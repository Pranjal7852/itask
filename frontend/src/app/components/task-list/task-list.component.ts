import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskPaginationComponent } from '../task-pagination/task-pagination.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TaskCardComponent, TaskPaginationComponent]
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Input() statusOptions: TaskStatus[] = [];
  
  @Output() taskStatusChange = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<string>();
  @Output() generateNote = new EventEmitter<Task>();

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedTasks: Task[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.updatePaginatedTasks();
    }
  }

  onTaskStatusChange(task: Task) {
    this.taskStatusChange.emit(task);
  }

  onTaskDelete(taskId: string) {
    this.taskDelete.emit(taskId);
  }

  onGenerateNote(task: Task) {
    this.generateNote.emit(task);
  }

  // Pagination methods
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedTasks();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedTasks();
  }

  private updatePaginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  getTaskNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
} 