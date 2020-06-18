import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://209.97.163.81:3000/api/orderStatus';
const baseUrlget = 'http://209.97.163.81:3000/api/orderStatus/get';
@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  t_id: number
  t_name: string

  status_type: any = [
    {t_id: 1,t_name:"รอการยืนยัน"},
    {t_id: 2,t_name:"กำลังจัดส่ง"},
    {t_id: 3,t_name:"ที่ต้องได้รับ"},
    {t_id: 4,t_name:"เสร็จสิ้น"},
    {t_id: 5,t_name:"ยกเลิกการสั่งซื้อ"}
  ]

  constructor(private http: HttpClient) { }

  getAllStatusType(){
    return this.status_type;
  }
  //save items from cart
  create(data) {
    return this.http.post(baseUrl, data);
  }

  findOrderUser(usernameco) {
    return this.http.get(`${baseUrl}/${usernameco}`);
  }

  findOrder(id) {
    return this.http.get(`${baseUrlget}/${id}`);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  findOrderAll() {
    return this.http.get(`${baseUrl}/`);
  }

  deleteOrder(idProduct) {
    return this.http.delete(`${baseUrl}/${idProduct}`);
  }
}
