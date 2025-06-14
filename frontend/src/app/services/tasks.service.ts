import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { catchError } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient, private env: EnvironmentService) {
    this.apiBaseUrl = this.env.apiUrl;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiBaseUrl}/tasks`).pipe(
      catchError(this.handleError)
    );
  }

  addTask(taskData: { title: string; description: string; status: TaskStatus }): Observable<Task> {
    return this.http.post<Task>(`${this.apiBaseUrl}/tasks`, taskData).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(id: string, taskData: Partial<Task>): Observable<Task> {
    const { title, description, status } = taskData;
    return this.http.put<Task>(`${this.apiBaseUrl}/tasks/${id}`, { title, description, status }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: string): Observable<{}> {
    return this.http.delete(`${this.apiBaseUrl}/tasks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  generateAiNote(id: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiBaseUrl}/tasks/${id}/generate-note`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An API error occurred', error);
    throw new Error('Something bad happened; please try again later.');
  }
}