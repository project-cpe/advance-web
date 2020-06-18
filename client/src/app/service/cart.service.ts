import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




const baseUrl = 'http://209.97.163.81:3000/api/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  //add item to cart
  create(data) {
    return this.http.post(baseUrl, data);
  }

  findCartUser(usernameco) {
    return this.http.get(`${baseUrl}/${usernameco}`);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}

