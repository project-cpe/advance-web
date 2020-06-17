import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  findByUser(username, password) {
    //console.log(username+", "+password);
    return this.http.get(`${baseUrl}/${username}/${password}`);
  }

  getUser(username) {
    //console.log(username+", "+password);
    return this.http.get(`${baseUrl}/${username}`);
  }

  getAddressCustomer(id){
    return this.http.get(`${baseUrl}/${id}`);
  }

}
