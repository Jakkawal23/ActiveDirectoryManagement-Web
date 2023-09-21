import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionDTO } from '../../admin/db/position/position.service';
import { DepartmentDTO } from '../../admin/db/department/department.service';
import { TeamDTO } from '../../admin/db/team/team.service';
import { ProfileDTO } from '../../admin/su/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeProfileService } from './employee-profile.service';
import { LoginService } from '../../login/login/login.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent {

  formEmployee : FormGroup;
  employeeCode: string;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  teams:Array<TeamDTO>;
  profiles:Array<ProfileDTO>;

  constructor(
    private fb: FormBuilder,
    private serivce: EmployeeProfileService,
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
    this.serivce.getMasterProfile().subscribe(result =>{
      this.profiles = result;
    });
  }

  creatForm(){
    this.formEmployee = this.fb.group({
      //Employee
      employeeId : [null],
      employeeCode : [null],
      positionCode : [null],
      departmentCode : [null],
      teamCode : [null],
      name : [null],
      lastName : [null],
      //User
      userName : [null],
      // password : [null],
      // passwordConfirm : [null],
      mobilePhoneNo : [null],
      email : [null],
      profileCode : [null],
      active : [null]
    });
    this.formEmployee.disable();
  }
}
