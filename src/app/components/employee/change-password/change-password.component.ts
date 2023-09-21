import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';
import { LoginService } from '../../login/login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  formPassword : FormGroup;
  userName : string;
  empCode : string;

  constructor(
    private fb: FormBuilder,
    private serivce: ChangePasswordService,
    private alert: ToastrService,
    private loginService: LoginService,
  ){
    this.creatForm();
  }

  ngOnInit(){
    this.userName = this.loginService.getUserName();
    this.empCode = this.loginService.getLoginUser();
    this.formPassword.controls['empCode'].setValue(this.empCode);
  }

  creatForm(){
    this.formPassword = this.fb.group({
      empCode : [null,Validators.required],
      statusCode : 'NEW',
      password : [null,[Validators.required,Validators.minLength(8)]],
      passwordConfirm : [null,[Validators.required,Validators.minLength(8)]],
    });
  }

  save(){
    console.log(this.formPassword.getRawValue());
    if (this.formPassword.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if (this.formPassword.controls['password'].value != this.formPassword.controls['passwordConfirm'].value) {
      this.alert.info('กรุณากรอกรหัสผ่านให้ถูกต้อง', 'แจ้งเตือน');
      return;
    }
    this.serivce.save(this.formPassword.getRawValue()).subscribe(result => {
      if(result){
        this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
      }else{
        this.alert.error('ตรวจสอบรหัสผ่านให้ถูกต้อง', 'ข้อผิดพลาด');
      }
    });

  }
}
