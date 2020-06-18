import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://209.97.163.81:3000/api/addlist';

@Injectable({
  providedIn: 'root'
})
export class AddListService {


  t_id: number
  t_name: string
  os_id: number
  os_name: string

  type_pro: any = [
    {t_id: 1,t_name:"Smart Phone"},
    {t_id: 2,t_name:"Tablet"}
  ]

  os_pro: any = [
    {os_id: 1,os_name:"IOS 11"},
    {os_id: 2,os_name:"IOS 12"},
    {os_id: 3,os_name:"IOS 13"},
    {os_id: 4,os_name:"Android Ver-5.0"},
    {os_id: 5,os_name:"Android Ver-6.0"},
    {os_id: 6,os_name:"Android Ver-7.0"},
    {os_id: 7,os_name:"Android Ver-8.0"},
    {os_id: 8,os_name:"Android Ver-9.0"},
    {os_id: 9,os_name:"Android Ver-10.0"},
    {os_id: 10,os_name:"Android Ver-11.0"},
  ]

  constructor(private http: HttpClient) { }

  getAllProType(){
    return this.type_pro;
  }
  getAllProOS(){
    return this.os_pro;
  }

  getAll(token: any) {
    //console.log(token);
    const headers = {'Authorization': token}
    return this.http.get(baseUrl ,{headers});
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

  delete(nameProduct) {
    return this.http.delete(`${baseUrl}/${nameProduct}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByUser(username, password) {
    //console.log(username+", "+password);
    return this.http.get(`${baseUrl}/${username}/${password}`);
  }

}
