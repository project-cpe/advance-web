import { Component, OnInit } from '@angular/core';
import { AddListService } from 'src/app/service/add-list.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  dataList = new FormGroup({
    nameCargo: new FormControl(''),
    type: new FormControl(''),
    codeCargo: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    img: new FormControl(''),
    file: new FormControl(''),
    detail: new FormGroup({ 
      produceDate:new FormControl(''),
      typeOS: new FormControl(''),
      size: new FormControl(''),
      display: new FormControl(''),
      cpu: new FormControl(''),
      ram: new FormControl(''),
      rom: new FormControl(''),
      externalDrive: new FormControl(''),
      camFace: new FormControl(''),
      camBack: new FormControl(''),
      batt: new FormControl(''),
      twoSim: new FormControl('')
    })
  });
  previewLoaded: boolean = false;
  

  constructor(private addListService: AddListService,private router: Router, public local: LocalStorageService) { }

  submitted = false;
  image: File;

  ngOnInit(): void {
  }

  getAllProType(){
    //console.log(this.addListService.getAllProType());
    return this.addListService.getAllProType();
  }

  getAllProOS(){
    return this.addListService.getAllProOS();
  }

  saveDataList() {
    const data = {
      nameCargo: this.dataList.value.nameCargo,
      type: this.dataList.value.type,
      codeCargo: this.dataList.value.codeCargo,
      quantity: this.dataList.value.quantity,
      price: this.dataList.value.price,
      img: this.dataList.value.img,
      file: this.dataList.value.file,
      produceDate: this.dataList.value.detail.produceDate,
      typeOS: this.dataList.value.detail.typeOS,
      size: this.dataList.value.detail.size,
      display: this.dataList.value.detail.display,
      cpu: this.dataList.value.detail.cpu,
      ram: this.dataList.value.detail.ram,
      rom: this.dataList.value.detail.rom,
      externalDrive: this.dataList.value.detail.externalDrive,
      camFace: this.dataList.value.detail.camFace,
      camBack: this.dataList.value.detail.camBack,
      batt: this.dataList.value.detail.batt,
      twoSim: this.dataList.value.detail.twoSim,
    };
    console.log(data);
    this.addListService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert("เพิ่มสำเร็จ !");
          //window.location.reload();
          //this.dataList.reset();
        },
        error => {
          console.log(error);
        });
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


  onChangeImg(e: any){
    if(e.target.files.length > 0){
      this.image = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!this.image.type.match(pattern)){
        alert('invalid format');
        this.dataList.reset();
      }else{
        reader.readAsDataURL(this.image);
        reader.onload = () => {
          this.previewLoaded = true;
          this.dataList.patchValue({
            img: reader.result
          });
        }
      }
    }
  }

  resetForm(){
    this.dataList.reset();
    this.previewLoaded = false;
  }
}
