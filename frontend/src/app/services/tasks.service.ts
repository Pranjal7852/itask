import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl = 'http://localhost:3000/api'; // Your backend URL

  constructor(private http: HttpClient) { }

  // GET /tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiBaseUrl}/tasks`).pipe(
      catchError(this.handleError)
    );
  }

  // POST /tasks
  addTask(taskData: { title: string; description: string; status: TaskStatus }): Observable<Task> {
    return this.http.post<Task>(`${this.apiBaseUrl}/tasks`, taskData).pipe(
      catchError(this.handleError)
    );
  }

  // PUT /tasks/:id
  updateTask(id: string, taskData: Partial<Task>): Observable<Task> {
    // We only send fields that can be updated
    const { title, description, status } = taskData;
    return this.http.put<Task>(`${this.apiBaseUrl}/tasks/${id}`, { title, description, status }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE /tasks/:id
  deleteTask(id: string): Observable<{}> {
    return this.http.delete(`${this.apiBaseUrl}/tasks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST /tasks/:id/generate-note
  generateAiNote(id: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiBaseUrl}/tasks/${id}/generate-note`, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Basic error handling
  private handleError(error: any): Observable<never> {
    console.error('An API error occurred', error);
    // In a real app, you might use a more robust error handling strategy
    throw new Error('Something bad happened; please try again later.');
  }
}