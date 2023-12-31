import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EditEmployeeService } from './edit-employee.service';
import { LoginService } from '../../login/login/login.service';
import { PositionDTO } from '../../admin/db/position/position.service';
import { DepartmentDTO } from '../../admin/db/department/department.service';
import { TeamDTO } from '../../admin/db/team/team.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {

  formEmployee : FormGroup;
  employeeCode: string;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  teams:Array<TeamDTO>;

  constructor(
    private fb: FormBuilder,
    private serivce: EditEmployeeService,
    private loginService: LoginService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.employeeCode = this.loginService.getLoginUser();
    if(this.employeeCode != ''){
      this.serivce.getDetail(this.employeeCode).subscribe(result =>{
        this.formEmployee.patchValue(result);
        this.formEmployee.controls['passwordConfirm'].setValue(this.formEmployee.controls['password'].value);
      });
    }

    this.serivce.getMasterPositions().subscribe(result =>{
      this.positions = result;
    });
    this.serivce.getMasterDepartments().subscribe(result =>{
      this.departments = result;
    });
    this.serivce.getMasterTeams().subscribe(result =>{
      this.teams = result;
    });
  }

  creatForm(){
    this.formEmployee = this.fb.group({
      //Employee
      employeeCode : [null],
      positionCode : [null],
      departmentCode : [null],
      teamCode : [null],
      name : [null],
      lastName : [null],
      userName : [null],
      password : [null,[Validators.required,Validators.minLength(8)]],
      passwordConfirm : [null,[Validators.required,Validators.minLength(8)]],
      mobilePhoneNo : [null],
      email : [null, [Validators.required, this.emailValidator]],
    });
    this.formEmployee.controls['employeeCode'].disable();
    this.formEmployee.controls['positionCode'].disable();
    this.formEmployee.controls['departmentCode'].disable();
    this.formEmployee.controls['teamCode'].disable();
    this.formEmployee.controls['userName'].disable();
  }

  save(){
    const requiredFields = ['employeeCode', 'name', 'lastName', 'mobilePhoneNo', 'email', 'userName'];
    const isAnyRequiredFieldEmpty = requiredFields.some(field => !this.formEmployee?.get(field)?.value);

    if (this.formEmployee.controls['email'].hasError('invalidEmail')) {
      this.alert.info('กรุณากรอก อีเมล์ ให้ถูกต้อง', 'แจ้งเตือน');
      return; 
    }

    if (isAnyRequiredFieldEmpty) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if (this.formEmployee.controls['password'].value != this.formEmployee.controls['passwordConfirm'].value) {
      this.alert.info('กรุณากรอกรหัสผ่านให้ถูกต้อง', 'แจ้งเตือน');
      return;
    }
    this.serivce.save(this.formEmployee.getRawValue()).subscribe(result => {
      if(result.userName){
        this.formEmployee.patchValue(result);
        this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
      }else{
        this.alert.error('ชื่อผู้ใช้งานซ้ำ', 'ข้อผิดพลาด');
      }
    });
  }

  validateNumberInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/\D/g, ''); // Remove non-numeric characters
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

}
