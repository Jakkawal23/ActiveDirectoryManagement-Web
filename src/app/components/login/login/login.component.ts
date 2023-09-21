import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin : FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private alert: ToastrService,
    private router: Router
  )
  {
    this.creatForm();
  }

  creatForm(){
    this.formLogin = this.fb.group({
      username : [null,Validators.required],
      password : [null,Validators.required]
    });

  }

  submit(){
    if(this.formLogin.invalid){
      Object.values(this.formLogin.controls).forEach(control =>{
        control.markAllAsTouched();
      });
      this.alert.info('กรอกข้อมูลให้ถูกต้อง', 'แจ้งเตือน');
      return;
    }

    this.loginService.login(this.formLogin.value).subscribe(result =>{
      if(result){
        this.alert.success('เข้าสู่ระบบสำเร็จ','Active Directory Management');
        // this.router.navigate(['/navbar']);
      }else{
        this.alert.error('ข้อมูลไม่ถูกต้อง', 'แจ้งเตือน');
      }
    });
  }

  public get form(){
    return this.formLogin.controls;
  }
}