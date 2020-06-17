import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AddListService } from 'src/app/service/add-list.service';
import { LocalStorageService } from 'angular-web-storage';
import { CartService } from 'src/app/service/cart.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  sts:number = 1;
  product: any;
  id: string;
  submitted = false;

  dataList = new FormGroup({
    usernameco: new FormControl(this.getUsername()),
    quantity: new FormControl('1'),
  });

  constructor(private route: ActivatedRoute,private addListService: AddListService,private router: Router,public local: LocalStorageService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getProductData()  
  }

  getProductData(){
    const productId = this.route.snapshot.paramMap.get('id');
    this.addListService.get(productId)
    .subscribe(
      response => {
        console.log(response);
        this.product = response;
      },
      error => {
        console.log(error);
      });
  }
  Logout(){
    this.router.navigate(['/home']);
  }
  getUsername(){
    //let user = localStorage.getItem("Emusername");
    let user = this.local.get('customer').result.username;
    return user;
  }

  saveDataList() {
    const data = {
      usernameco: this.dataList.value.usernameco,
      nameCargo: this.product.nameCargo,
      quantity: this.dataList.value.quantity,
      price: this.product.price,
      img: this.product.img,
      file: this.product.file,
      productId: this.product._id
    };
    console.log(data);
    this.cartService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มสินค้าลงในตระกร้าสำเร็จ!',
            showConfirmButton: false,
            timer: 1500
          })
          //window.location.reload();
          this.dataList.reset();
          this.router.navigate(['/productlist']);
        },
        error => {
          console.log(error);
        });
  }

}
