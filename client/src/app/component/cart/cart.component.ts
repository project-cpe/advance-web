import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrderStatusService } from 'src/app/service/order-status.service'
import { Router,ActivatedRoute} from '@angular/router';
import { LocalStorageService, AngularWebStorageModule } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  alldata: any;
  sts:number = 1;
  cartTotal:number;
  submitted = false;
  length:number = 0;

  constructor(private router: Router, public local: LocalStorageService, private cartService: CartService,
    private route: ActivatedRoute, private orderStatus: OrderStatusService ) { }

  ngOnInit(): void {
  }

  getUsername(){
    let user = this.local.get('customer').result.username;
    return user;
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
          window.location.reload();
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
      status: "รอดำเนินการ"
    };
    this.length = this.getProductData().length;
    for(let item of this.getProductData()){
      data.nameCargo = item.nameCargo;
      data.quantity = item.quantity;
      data.price = item.price;
      data.img = item.img;
      data.file = item.file;
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
          alert("Nani");
        });
      this.deleteProductInCart(item._id)
    }
    if(this.length == 0){
      alert("กรุณาตรวจสอบสินค้าในตระกร้า");
    }else{
      alert("สั่งสินค้าเสร็จสิ้น! สามารถตรวจสอบได้ที่สถานะคำสั่งซื้อ");
      this.router.navigate(['/orderstatus']);
    }
  }

  backToMain(){
    this.router.navigate(['/productlist']);
  }  
  Logout(){
    this.local.remove('customer');
    this.router.navigate(['/home']);
  }
}
