import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




const baseUrl = 'http://localhost:3000/api/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  findCartUser(usernameco) {
    return this.http.get(`${baseUrl}/${usernameco}`);
  }
}

