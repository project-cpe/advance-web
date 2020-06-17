import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { RegisterService } from 'src/app/service/register.service';
import { Router,ActivatedRoute} from '@angular/router';
import { LocalStorageService, AngularWebStorageModule } from 'angular-web-storage';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  address: any;
  alldata: any;
  sts:number = 1;
  cartTotal:number;
  submitted = false;
  length:number = 0;
  count:number=0;

  constructor(private router: Router, public local: LocalStorageService, private cartService: CartService,
    private route: ActivatedRoute, private orderStatus: OrderStatusService,private registerService :RegisterService) { }

  ngOnInit(): void {
    this.getAddress1()
    console.log(this.getAddress2())
  }

  getUsername(){
    let user = this.local.get('customer').result.username;
    return user;
  }
  getUserId(){
    let id = this.local.get('customer').result.id;
    return id;
  }
  

  getAddress2() :any{
    let Hnum = this.local.get('customer').result.Hnum;
    let province = this.local.get('customer').result.province;
    let district = this.local.get('customer').result.district;
    let parish = this.local.get('customer').result.parish;
    let zip = this.local.get('customer').result.zip;
    let email = this.local.get('customer').result.email;
    let tel = this.local.get('customer').result.tel;
    return Hnum+" ต."+parish+" อ."+district+" จ."+province+" รหัสไปรษณีย์ "+zip+ " เบอร์โทร: "+tel+ ", Email: "+email; 
  }

  getAddress1(){
    const cusId = this.getUserId();
    this.registerService.getAddressCustomer(cusId)
    .subscribe(
      response => {
        console.log(response);
        this.address = response;
      },
      error => {
        console.log(error);
      });
    return this.address;
  }

  

  getProductData(){
    if(this.sts == 1){
    this.cartService.findCartUser(this.getUsername())
      .subscribe(
        response => {
          //console.log(response);
          this.alldata = response;
          //console.log(this.alldata);
        },
        error => {
          console.log(error);
        });
    }
    this.sts = 0;
    return this.alldata;
  } 

  getTotal(){
    this.cartTotal=0;
    for(let item of this.getProductData()){
      this.cartTotal += (item.price*item.quantity); 
    }
    return this.cartTotal;
  }

  deleteProductInCart(id: any){
    this.cartService.delete(id)
      .subscribe(
        response =>{
          console.log(response);
          // window.location.reload();
          this.sts=1;
          this.getProductData();
        },
        error => {
          console.log(error);
        }
      );
  }

  saveToOderStatus(){
    const data = {
      usernameco: this.getUsername(),
      nameCargo: String,
      quantity: Number,
      price: Number,
      img: String,
      file: String,
      status: "รอการยืนยัน",
      productId: String,
      address: String,
    };
    this.length = this.getProductData().length;
    for(let item of this.getProductData()){
      data.nameCargo = item.nameCargo;
      data.quantity = item.quantity;
      data.price = item.price;
      data.img = item.img;
      data.file = item.file;
      data.productId = item.productId;
      data.address = this.getAddress2();
      this.orderStatus.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          //window.location.reload();
          //this.router.navigate(['/orderstatus']);
        },
        error => {
          console.log(error);
          // alert("Nani");
        });
      this.deleteProductInCart(item._id)
      Swal.fire({
        icon: 'success',
        title: 'ยืนยันเสร็จสิ้น !',
        text: 'สามารถตรวจสอบสินค้าได้ที่ยืนยันคำสั่งซื้อ !',
        showConfirmButton: true,
      })
      // this.count=1;
      this.router.navigate(['/orderstatus']);
    }
    if(this.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถยืนยันคำสั่งซื้อได้',
        text: 'กรุณาตรวจสอบสินค้าในตระกร้า !',
      })
    }
    // else if(this.count==1){
    //   this.router.navigate(['/orderstatus']);
    //   this.count=0;
    // }
  }

  backToMain(){
    this.router.navigate(['/productlist']);
  }  
  Logout(){
    this.local.remove('customer');
    this.router.navigate(['/home']);
  }
}
