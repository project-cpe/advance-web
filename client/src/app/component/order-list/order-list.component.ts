import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderStatusService } from '../../service/order-status.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  sts: number = 1;
  allData: any;
  bt: number = 0;
  status: any;

  constructor(
    private router: Router,
    private orderStatusService: OrderStatusService
  ) {}

  ngOnInit(): void {
    status = this.orderStatusService.getAllStatusType();
    console.log(this.bt);
  }

  getAllStatus() {
    return this.orderStatusService.getAllStatusType();
  }

  getAllData() {
    if (this.sts == 1) {
      this.orderStatusService.findOrderAll().subscribe(
        (response) => {
          this.allData = response;
          console.log(this.allData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.sts = 0;
    return this.allData;
  }

  checkButtonAndStatus(status) {
    if (this.bt == 0) {
      if (
        status == 'รอการยืนยัน' ||
        status == 'กำลังจัดส่ง' ||
        status == 'ที่ต้องได้รับ' ||
        status == 'ยกเลิกการสั่งซื้อ'
      ) {
        return true;
      } else {
        return false;
      }
    } else if (this.bt == 1) {
      if (status == 'รอการยืนยัน') {
        return true;
      } else {
        return false;
      }
    } else if (this.bt == 2) {
      if (status == 'กำลังจัดส่ง') {
        return true;
      } else {
        return false;
      }
    } else if (this.bt == 3) {
      if (status == 'ที่ต้องได้รับ') {
        return true;
      } else {
        return false;
      }
    } else if (this.bt == 4) {
      if (status == 'ยกเลิกการสั่งซื้อ') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
