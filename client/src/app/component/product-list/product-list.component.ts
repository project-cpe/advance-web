import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AddListService } from 'src/app/service/add-list.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  sts:number = 1;
  alldata: any;
  term: string;
  token: string;

  constructor(private router: Router,private addListService: AddListService, public local: LocalStorageService) { }

  ngOnInit(): void {
  }

  getAllData(){
    this.token = this.local.get('customer').token;
    if(this.sts == 1){
    this.addListService.getAll(this.token)
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

  Logout(){
    this.local.remove('customer');
    this.router.navigate(['/home']);
  }
  
  getUsername(){
    //let user = localStorage.getItem("Emusername");
    let user = this.local.get('customer').result.username;
    return user;
  }
  
}
