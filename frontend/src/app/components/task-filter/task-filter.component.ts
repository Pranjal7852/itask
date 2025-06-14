import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskStatus } from '../../models/task.model';

export type FilterType = 'ALL' | TaskStatus;

export interface TaskCounts {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class TaskFilterComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() selectedFilter: FilterType = 'ALL';
  
  @Output() filterChange = new EventEmitter<FilterType>();
  @Output() filteredTasks = new EventEmitter<Task[]>();
  
  taskCounts: TaskCounts | null = null;
  
  // Make enum values available in template
  TaskStatus = TaskStatus;

  ngOnInit() {
    this.updateTaskCounts();
    this.applyFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.updateTaskCounts();
      this.applyFilter();
    }
  }

  onFilterChange(filter: FilterType) {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
    this.applyFilter();
  }

  private updateTaskCounts() {
    if (!this.tasks) {
      this.taskCounts = null;
      return;
    }

    this.taskCounts = {
      total: this.tasks.length,
      todo: this.tasks.filter(task => task.status === TaskStatus.TODO).length,
      inProgress: this.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length,
      done: this.tasks.filter(task => task.status === TaskStatus.DONE).length
    };
  }

  private applyFilter() {
    if (!this.tasks) {
      this.filteredTasks.emit([]);
      return;
    }

    let filtered: Task[];
    
    switch (this.selectedFilter) {
      case TaskStatus.TODO:
        filtered = this.tasks.filter(task => task.status === TaskStatus.TODO);
        break;
      case TaskStatus.IN_PROGRESS:
        filtered = this.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
        break;
      case TaskStatus.DONE:
        filtered = this.tasks.filter(task => task.status === TaskStatus.DONE);
        break;
      case 'ALL':
      default:
        filtered = this.tasks;
        break;
    }

    this.filteredTasks.emit(filtered);
  }
} 