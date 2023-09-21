import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../position.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent {

  formPosition : FormGroup;
  positionId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: PositionService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.positionId =  params['positionId'];
      }
    )
    if(this.positionId){
      this.serivce.getDetail(this.positionId).subscribe(result =>{
        this.formPosition.patchValue(result);
        this.formPosition.controls['positionId'].setValue(this.positionId)
      });
      this.formPosition.controls['positionCode'].disable();
    }
  }

  creatForm(){
    this.formPosition = this.fb.group({
      positionId : [null],
      positionCode : [null,Validators.required],
      positionNameTH : [null,Validators.required],
      positionNameEN : [null,Validators.required],
      active : [true,Validators.required],
    })
  }

  Save(){
    if (this.formPosition.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if(this.positionId){
      this.serivce.edit(this.formPosition.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formPosition.getRawValue()).subscribe(result => {
        if(result.positionId){
          this.positionId = result.positionId;
          this.formPosition.patchValue(result);
          this.formPosition.controls['positionCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }

}
