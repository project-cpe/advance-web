import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../service/order-status.service';
import { AddListService } from 'src/app/service/add-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
})
export class OrderConfirmComponent implements OnInit {

  product: any;
  order: any;
  sts: number = 1;

  realQuantity: number;

  address: string;
  date: Date;
  file: string;
  image: File;
  nameCargo: string;
  price: number;
  quantity: number;
  status: string;
  user: String;
  orId: String;
  total: number;
  productId: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private addListService: AddListService,
    private orderStatusService: OrderStatusService
    ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    const orderId = this.route.snapshot.paramMap.get('id');
    //console.log(orderId)
    this.orderStatusService.findOrder(orderId)
    .subscribe(
      response => {
        console.log(response);
        this.order = response;
        this.orId = this.order._id;
        this.address = this.order.address;
        this.date = this.order.date;
        this.file = this.order.file;
        this.image = this.order.img;
        this.nameCargo = this.order.nameCargo;
        this.price = this.order.price;
        this.quantity = this.order.quantity;
        this.status = this.order.status;
        this.user = this.order.usernameco;
        this.total = this.order.quantity*this.order.price;
        this.productId = this.order.productId;
      },
      error => {
        console.log(error);
      });
  }

  getProductData(){
    const productIdTtemp = this.productId;
    this.addListService.get(productIdTtemp)
    .subscribe(
      response => {
        this.product = response;
        this.realQuantity = this.product.quantity;
        console.log(this.realQuantity);
        this.updateQuantity()
      },
      error => {
        console.log(error);
      });
  }

  updateProduct1(){
    const data = {
      status: "กำลังจัดส่ง"
    };
    this.orderStatusService.update(this.orId, data)
      .subscribe(
        response =>{
          // alert('คุณได้ยกเลิกการสั่งซื้อแล้ว')
          Swal.fire(
            'กำลังจัดส่งสินค้า!',
            'Your file has been update.',
            'success'
          )
          this.getProductData()
        },
        error => {
          console.log(error);
        }
      );
  }

  updateQuantity(){
    const data = {
      quantity: this.realQuantity-this.quantity
    };
    console.log(this.realQuantity)
    console.log(this.quantity)
    console.log(data.quantity)
    this.addListService.update(this.productId, data)
      .subscribe(
        response =>{
          this.router.navigate(['/orderlist']);
        },
        error => {
          console.log(error);
        }
      );
  }

  checkWaitConfirm(status){
    if(status == 'รอการยืนยัน'){
      return true;
    }
  }

  checkPakage(status){
    if(status == 'กำลังจัดส่ง'){
      return true;
    }
  }

  updateProduct2(){
    const data = {
      status: "ที่ต้องได้รับ"
    };
    this.orderStatusService.update(this.orId, data)
      .subscribe(
        response =>{
          Swal.fire(
            'กำลังจัดส่งสินค้า!',
            'อัพเดตสถานะเป็น "ที่ต้องได้รับ"',
            'success'
          )
          this.router.navigate(['/orderlist']);
        },
        error => {
          console.log(error);
        }
      );
  }
  
}
