import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/orderHistory';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {

  t_id: number
  t_name: string

  status_type: any = [
    {t_id: 1,t_name:"เสร็จสิ้น"},
    {t_id: 2,t_name:"ยกเลิกการสั่งซื้อ"}
  ]

  constructor(private http: HttpClient) {}

  getAllStatusType(){
    return this.status_type;
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  findOrderUser(usernameco) {
    return this.http.get(`${baseUrl}/${usernameco}`);
  }

  findOrder(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  findOrderAll() {
    return this.http.get(`${baseUrl}/`);
  }
}
