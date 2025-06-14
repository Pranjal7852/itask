import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() statusOptions: TaskStatus[] = [];
  @Input() taskNumber: number = 0;
  
  @Output() statusChange = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() generateNote = new EventEmitter<Task>();

  onStatusChange() {
    this.statusChange.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onGenerateNote() {
    this.generateNote.emit(this.task);
  }

  getCardClasses() {
    const statusClass = 'status-' + this.task.status.toLowerCase().replace('_', '-');
    const classes = [statusClass];
    
    if (this.task.isGeneratingNote) {
      classes.push('generating');
    }
    
    return classes.join(' ');
  }
} 