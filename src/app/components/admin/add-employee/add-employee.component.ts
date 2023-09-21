import { Component } from '@angular/core';
import { AddEmployeeService } from './add-employee.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDTO } from '../db/department/department.service';
import { TeamDTO } from '../db/team/team.service';
import { PositionDTO } from '../db/position/position.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  formEmployee : FormGroup;
  employeeId: number;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  teams:Array<TeamDTO>;

  constructor(
    private fb: FormBuilder,
    private serivce: AddEmployeeService,
    private alert: ToastrService
  ){
    this.creatForm();
  }

  ngOnInit(): void {
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
      // employeeId : [null],
      employeeCode : [null,Validators.required],
      positionCode : [null,Validators.required],
      departmentCode : [null,Validators.required],
      teamCode : [null,Validators.required],
      name : [null,Validators.required],
      lastName : [null,Validators.required],
      // fullName : [null,Validators.required],
      mobilePhoneNo : [null,Validators.required],
      email : [null,Validators.required],
      password : [null,[Validators.required,Validators.minLength(8)]],
      passwordConfirm : [null,[Validators.required,Validators.minLength(8)]],
    })
  }

  Save(){
    if (this.formEmployee.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if (this.formEmployee.controls['password'].value != this.formEmployee.controls['passwordConfirm'].value) {
      this.alert.info('กรุณากรอกรหัสผ่านให้ถูกต้อง', 'แจ้งเตือน');
      return;
    }
    if(this.employeeId){
      this.serivce.edit(this.formEmployee.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formEmployee.getRawValue()).subscribe(result => {
        if(result.employeeId){
          this.employeeId = result.employeeId;
          this.formEmployee.patchValue(result);
          this.formEmployee.controls['employeeCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }
 
}