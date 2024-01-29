import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserList } from '../../models/UserList';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  apiUrl = `${environment.REST_API_URL}`;
  constructor(private http: HttpClient) {}

  saveUserList(UserList: UserList,id: any) {
    return this.http.post(`${this.apiUrl}/lists/save_list/${id}`, UserList);
  }

  getUserLists(id: any) {
    return this.http.get(`${this.apiUrl}/lists/get_lists/${id}`);
  }

  deleteList(id: any) {
    return this.http.delete(`${this.apiUrl}/lists/delete_list/${id}`);
  }

  updateList(UserList: UserList,id: any){
    return this.http.put(`${this.apiUrl}/lists/update_list/${id}`, UserList);
  }
}
