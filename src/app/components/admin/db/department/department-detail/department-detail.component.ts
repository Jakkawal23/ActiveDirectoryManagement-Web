import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss'],
})
export class DepartmentDetailComponent{

  formDepartment : FormGroup;
  departmentId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: DepartmentService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.departmentId =  params['departmentId'];
      }
    )
    if(this.departmentId){
      this.serivce.getDetail(this.departmentId).subscribe(result =>{
        this.formDepartment.patchValue(result);
        this.formDepartment.controls['departmentId'].setValue(this.departmentId)
      });
      this.formDepartment.controls['departmentCode'].disable();
    }
  }

  creatForm(){
    this.formDepartment = this.fb.group({
      departmentId : [null],
      departmentCode : [null,Validators.required],
      departmentNameTH : [null,Validators.required],
      departmentNameEN : [null,Validators.required],
      active : [true,Validators.required],
    })
  }

  Save(){
    if (this.formDepartment.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if(this.departmentId){
      this.serivce.edit(this.formDepartment.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formDepartment.getRawValue()).subscribe(result => {
        if(result.departmentId){
          this.departmentId = result.departmentId;
          this.formDepartment.patchValue(result);
          this.formDepartment.controls['departmentCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }

}