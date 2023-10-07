import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManageDocumentService } from '../manage-document.service';
import { PositionDTO } from '../../db/position/position.service';
import { DepartmentDTO } from '../../db/department/department.service';
import { TeamDTO } from '../../db/team/team.service';
import { ProfileDTO } from '../../su/profile/profile.service';

@Component({
  selector: 'app-manage-document-detail',
  templateUrl: './manage-document-detail.component.html',
  styleUrls: ['./manage-document-detail.component.scss']
})
export class ManageDocumentDetailComponent {

  formEmployee : FormGroup;
  formDocument : FormGroup;
  employeeId: number;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  teams:Array<TeamDTO>;
  profiles:Array<ProfileDTO>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: ManageDocumentService,
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
    );
    if(this.employeeId){
      this.serivce.getEmployeeDetail(this.employeeId).subscribe(result =>{
        this.formEmployee.patchValue(result);
        this.formDocument.controls['empCode'].setValue(result.employeeCode);

        this.serivce.getDocumentDetail(result.employeeCode).subscribe(result =>{
          this.formDocument.patchValue(result);
        });
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
      employeeCode : [null,Validators.required],
      positionCode : [null,Validators.required],
      departmentCode : [null,Validators.required],
      teamCode : [null,Validators.required],
      name : [null,Validators.required],
      lastName : [null,Validators.required],
      //User
      userName : [null,Validators.required],
      mobilePhoneNo : [null,Validators.required],
      email : [null,Validators.required],
      profileCode : [null,Validators.required],
      active : [null,Validators.required]
    });

    this.formDocument = this.fb.group({
      // managementId : [null],
      empCode : [null,Validators.required],
      password : [false],
    });

    this.formEmployee.disable();
  }

  Save(){
    if (this.formDocument.invalid) {
      this.alert.info('ข้อมูลผู้ใช้งานผิดพลาด', 'แจ้งเตือน');
      return;
    }
    this.serivce.edit(this.formDocument.getRawValue()).subscribe(result => {
      this.formDocument.patchValue(result);
      this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
    });
  }

}
