import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageEmployeesService } from '../manage-employees.service';
import { ToastrService } from 'ngx-toastr';
import { PositionDTO } from '../../db/position/position.service';
import { DepartmentDTO } from '../../db/department/department.service';
import { TeamDTO } from '../../db/team/team.service';
import { ProfileDTO } from '../../su/profile/profile.service';

@Component({
  selector: 'app-manage-employee-detail',
  templateUrl: './manage-employee-detail.component.html',
  styleUrls: ['./manage-employee-detail.component.scss']
})
export class ManageEmployeeDetailComponent {

  formEmployee : FormGroup;
  employeeId: number;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  teams:Array<TeamDTO>;
  profiles:Array<ProfileDTO>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: ManageEmployeesService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.employeeId =  params['employeeId'];
      }
    )
    if(this.employeeId){
      this.serivce.getDetail(this.employeeId).subscribe(result =>{
        this.formEmployee.patchValue(result);
        this.formEmployee.controls['employeeId'].setValue(this.employeeId);
        this.formEmployee.controls['passwordConfirm'].setValue(this.formEmployee.controls['password'].value);
      });
      this.formEmployee.controls['employeeCode'].disable();
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
    this.serivce.getMasterProfile().subscribe(result =>{
      this.profiles = result;
    });
  }

  creatForm(){
    this.formEmployee = this.fb.group({
      //Employee
      employeeId : [null],
      employeeCode : [null,Validators.required],
      positionCode : [null,Validators.required],
      departmentCode : [null,Validators.required],
      teamCode : [null,Validators.required],
      name : [null,Validators.required],
      lastName : [null,Validators.required],
      //User
      userName : [null,Validators.required],
      password : [null,[Validators.required]],
      passwordConfirm : [null,[Validators.required]],
      mobilePhoneNo : [null,Validators.required],
      email : [null,Validators.required],
      profileCode : [null,Validators.required],
      active : [null,Validators.required]
    });
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
    this.serivce.edit(this.formEmployee.getRawValue()).subscribe(result => {
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
