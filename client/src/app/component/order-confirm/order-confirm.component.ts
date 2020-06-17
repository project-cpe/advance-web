import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../service/order-status.service';
import { AddListService } from 'src/app/service/add-list.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
})
export class OrderConfirmComponent implements OnInit {

  order: any;
  sts: number = 1;

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
      },
      error => {
        console.log(error);
      });
  }
}
