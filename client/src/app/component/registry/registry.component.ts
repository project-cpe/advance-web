import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  unamePattern = "^[A-Za-z0-9_-]{8,15}$";

  registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.pattern(this.unamePattern)]),
    sex: new FormControl('',[Validators.required]),
    check: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    tel: new FormControl('',[Validators.required]),
    address: new FormGroup({ 
      Hnum:new FormControl('',[Validators.required]),
      province: new FormControl('',[Validators.required]),
      parish: new FormControl('',[Validators.required]),
      district: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required])
    })
  });
  get username(){ return this.registerForm.get('username'); }
  get email(){ return this.registerForm.get('email'); }
  get password(){ return this.registerForm.get('password'); }
  get firstName(){ return this.registerForm.get('firstName'); }
  get lastName(){ return this.registerForm.get('lastName'); }
  get sex(){ return this.registerForm.get('sex'); }
  get check(){ return this.registerForm.get('check'); }
  get tel(){ return this.registerForm.get('tel'); }
  get Hnum(){ return this.registerForm.get('address').get('Hnum'); }
  get parish(){ return this.registerForm.get('address').get('parish'); }
  get province(){ return this.registerForm.get('address').get('province'); }
  get district(){ return this.registerForm.get('address').get('district'); }
  get zip(){ return this.registerForm.get('address').get('zip'); }

  constructor(private registerService: RegisterService, private router: Router) { }

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
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        });
      }else {
        alert("No Confrim");
      }
  } 
reset(){
  this.registerForm.reset();
}

}
