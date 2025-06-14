import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TaskFormComponent implements OnChanges {
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();
  
  @Input() editingTask: Task | null = null;
  @Input() isEditMode: boolean = false;
  
  task: Partial<Task> = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aiNote: '',
    isGeneratingNote: false
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingTask'] && this.editingTask) {
      this.task = { ...this.editingTask };
    } else if (changes['isEditMode'] && !this.isEditMode) {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.task.title?.trim()) {
      if (this.isEditMode && this.editingTask) {
        this.taskUpdated.emit({ ...this.task } as Task);
      } else {
        this.taskCreated.emit({ ...this.task } as Task);
        this.resetForm();
      }
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }

  private resetForm() {
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