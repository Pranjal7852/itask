import { Injectable } from '@angular/core';

declare const process: any;

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  
  get apiUrl(): string {
    return process?.env?.['API_URL'] || 'http://localhost:3000/api';
  }
} 