import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from '../status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.scss']
})
export class StatusDetailComponent {

  formStatus : FormGroup;
  statusId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: StatusService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.statusId =  params['statusId'];
      }
    )
    if(this.statusId){
      this.serivce.getDetail(this.statusId).subscribe(result =>{
        this.formStatus.patchValue(result);
        this.formStatus.controls['statusId'].setValue(this.statusId)
      });
      this.formStatus.controls['statusCode'].disable();
    }
  }

  creatForm(){
    this.formStatus = this.fb.group({
      statusId : [null],
      statusCode : [null,Validators.required],
      statusNameTH : [null,Validators.required],
      statusNameEN : [null,Validators.required],
      active : [true,Validators.required],
    })
  }

  Save(){
    if (this.formStatus.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if(this.statusId){
      this.serivce.edit(this.formStatus.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formStatus.getRawValue()).subscribe(result => {
        if(result.statusId){
          this.statusId = result.statusId;
          this.formStatus.patchValue(result);
          this.formStatus.controls['statusCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }

}
