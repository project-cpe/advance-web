import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/register';
const baseUrLogin = 'http://localhost:3000/api/register/login';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByUser(username, password) {
    console.log(username+", "+password);
    return this.http.get(`${baseUrl}/${username}/${password}`);
  }

  // findByUser(data) {
  //   //console.log(username+", "+password);
  //   console.log(data);
  //   return this.http.get(baseUrLogin, data);
  // }
}
