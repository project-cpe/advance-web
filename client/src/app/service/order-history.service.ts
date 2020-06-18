import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://209.97.163.81:3000/api/orderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private http: HttpClient) { }
  create(data) {
    return this.http.post(baseUrl, data);
  }

  findOrderUser(usernameco) {
    return this.http.get(`${baseUrl}/${usernameco}`);
  }

  findOrder(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
