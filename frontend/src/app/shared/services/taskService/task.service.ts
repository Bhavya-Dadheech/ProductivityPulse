import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../../models/Task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = `${environment.REST_API_URL}`;
  constructor(private http: HttpClient) {}

  private currentIdSubject = new BehaviorSubject<any>(null);
  currentId$ = this.currentIdSubject.asObservable();

  saveTask(task: Task, id: any) {
    return this.http.post(`${this.apiUrl}/task/save_task/${id}`, task);
  }

  getTasks(id: any) {
    return this.http.get(`${this.apiUrl}/task/get_tasks/${id}`);
  }

  setCurrentID(id: any) {
    this.currentIdSubject.next(id);
  }

  getCurrentID() {
    return this.currentIdSubject.value;
  }

  updateTask(task: Task, id: any) {
    return this.http.put(`${this.apiUrl}/task/update_task/${id}`, task);
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.apiUrl}/task/delete_task/${id}`);
  }
}
