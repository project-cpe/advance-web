import { Component, OnInit } from '@angular/core';
import { AddListService } from 'src/app/service/add-list.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  
  previewLoaded: boolean = false;

  dataList = new FormGroup({
    nameCargo: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    codeCargo: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required,Validators.min(1)]),
    price: new FormControl('',[Validators.required,Validators.min(1)]),
    img: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    detail: new FormGroup({ 
      produceDate:new FormControl('',[Validators.required]),
      typeOS: new FormControl('',[Validators.required]),
      size: new FormControl('',[Validators.required]),
      display: new FormControl('',[Validators.required]),
      cpu: new FormControl('',[Validators.required]),
      ram: new FormControl('',[Validators.required]),
      rom: new FormControl('',[Validators.required]),
      externalDrive: new FormControl('',[Validators.required]),
      camFace: new FormControl('',[Validators.required]),
      camBack: new FormControl('',[Validators.required]),
      batt: new FormControl('',[Validators.required]),
      twoSim: new FormControl('',[Validators.required])
    })
  });
  
  get nameCargo(){ return this.dataList.get('nameCargo'); }
  get type(){ return this.dataList.get('type'); }
  get codeCargo(){ return this.dataList.get('codeCargo'); }
  get quantity(){ return this.dataList.get('quantity'); }
  get price(){ return this.dataList.get('price'); }
  get img(){ return this.dataList.get('img'); }
  get file(){ return this.dataList.get('file'); }
  get produceDate(){ return this.dataList.get('detail').get('produceDate'); }
  get typeOS(){ return this.dataList.get('detail').get('typeOS'); }
  get size(){ return this.dataList.get('detail').get('size'); }
  get display(){ return this.dataList.get('detail').get('display'); }
  get cpu(){ return this.dataList.get('detail').get('cpu'); }
  get ram(){ return this.dataList.get('detail').get('ram'); }
  get rom(){ return this.dataList.get('detail').get('rom'); }
  get externalDrive(){ return this.dataList.get('detail').get('externalDrive'); }
  get camFace(){ return this.dataList.get('detail').get('camFace'); }
  get camBack(){ return this.dataList.get('detail').get('camBack'); }
  get batt(){ return this.dataList.get('detail').get('batt'); }
  get twoSim(){ return this.dataList.get('detail').get('twoSim'); }

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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          //alert("เพิ่มสำเร็จ !");
          //window.location.reload();
          this.dataList.reset();
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
