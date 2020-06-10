import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  unamePattern = "^[A-Za-z0-9_-]{8,15}$";

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('',[Validators.required, Validators.pattern(this.unamePattern)]),
    sex: new FormControl(''),
    check: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    tel: new FormControl('',[Validators.required, Validators.min(10)]),
    address: new FormGroup({ 
      Hnum:new FormControl(''),
      province: new FormControl(''),
      parish: new FormControl(''),
      district: new FormControl(''),
      zip: new FormControl('')
    })
  });

  get email(){ return this.registerForm.get('email'); }
  get password(){ return this.registerForm.get('password'); }

  constructor(private registerService: RegisterService) { }

  submitted = false;

  ngOnInit(): void { }

  saveRegister() {
    if(this.registerForm.value.check == true){
    const data = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
      sex: this.registerForm.value.sex,
      check: this.registerForm.value.check,
      email: this.registerForm.value.email,
      tel: this.registerForm.value.tel,
      Hnum: this.registerForm.value.address.Hnum,
      district: this.registerForm.value.address.district,
      province: this.registerForm.value.address.province,
      parish: this.registerForm.value.address.parish,
      zip: this.registerForm.value.address.zip,
    };
    console.log(data);
    this.registerService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert("Save Success!")
          this.registerForm.reset();
        },
        error => {
          console.log(error);
        });
      }else {
        alert("No Confrim");
      }
  } 

  // newTutorial() {
  //   this.submitted = false;
  //   this.tutorial = {
  //     title: '',
  //     description: '',
  //     published: false
  //   };
  // }

}
