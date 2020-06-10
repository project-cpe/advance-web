import { Component, OnInit,PipeTransform } from '@angular/core';
import { AddListService } from 'src/app/service/add-list.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  sts:number = 1;
  product: any;
  term: string;
  image: File;
  token: string;
  alldata: any
  previewLoaded: boolean = false;

  dataLists = new FormGroup({
    nameCargo: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    img: new FormControl(''),
    file: new FormControl(''),
    detail: new FormGroup({ 
      typeOS: new FormControl(''),
      display: new FormControl(''),
      rom: new FormControl(''),
      externalDrive: new FormControl(''),
      batt: new FormControl('')
    })
  });
  ;

  constructor(private addListService: AddListService,private router: Router, public local: LocalStorageService) {}


  getAllProType(){
    return this.addListService.getAllProType();
  }

  getAllProOS(){
    return this.addListService.getAllProOS();
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getUsername(){
    //let user = localStorage.getItem("Emusername");
    let user = this.local.get('employee').result.username;
    return user;
  }
  Logout(){
    // localStorage.removeItem("Emusername");
    // localStorage.removeItem("Empassword");
    this.local.remove('employee');
    this.router.navigate(['/loginem']);
  }

  getAllData(){
    this.token = this.local.get('employee').token;
    if(this.sts == 1){
    this.addListService.getAll(this.token)
      .subscribe(
        response => {
          console.log(response);
          this.alldata = response;
          console.log(this.alldata[0]._id);
          this.getSomeData(this.alldata[0]._id);
        },
        error => {
          console.log(error);
        });
  }
  this.sts = 0;
  return this.alldata;
}



deleteProduct(nameProduct: any){
  console.log(nameProduct);
  this.addListService.delete(nameProduct)
    .subscribe(
      response =>{
        alert('delete successful')
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
}

getSomeData(productId: any){
  //console.log(productId);
  this.addListService.get(productId)
  .subscribe(
    response => {
      console.log(response);
      this.product = response;
    },
    error => {
      console.log(error);
    });
  this.dataLists.reset();
}

updateProduct(productId: any){
  console.log(productId);
  const data = {
    nameCargo: this.dataLists.value.nameCargo,
    quantity: this.dataLists.value.quantity,
    price: this.dataLists.value.price,
    img: this.dataLists.value.img,
    file: this.dataLists.value.file,
    typeOS: this.dataLists.value.detail.typeOS,
    display: this.dataLists.value.detail.display,
    rom: this.dataLists.value.detail.rom,
    externalDrive: this.dataLists.value.detail.externalDrive,
    batt: this.dataLists.value.detail.batt,
  };
  this.addListService.update(productId, data)
    .subscribe(
      response =>{
        alert('update successful')
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
}

onChangeImg(e: any){
  if(e.target.files.length > 0){
    this.image = e.target.files[0];
    var pattern = /image-*/;
    const reader = new FileReader();
    if(!this.image.type.match(pattern)){
      alert('invalid format');
      this.dataLists.reset();
    }else{
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.previewLoaded = true;
        this.dataLists.patchValue({
          img: reader.result
        });
      }
    }
  }
}

}
