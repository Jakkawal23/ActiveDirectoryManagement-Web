import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {

  formProfile : FormGroup;
  profileId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: ProfileService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.profileId =  params['profileId'];
      }
    )
    if(this.profileId){
      this.serivce.getDetail(this.profileId).subscribe(result =>{
        this.formProfile.patchValue(result);
        this.formProfile.controls['profileId'].setValue(this.profileId)
      });
      this.formProfile.controls['profileCode'].disable();
    }
  }

  creatForm(){
    this.formProfile = this.fb.group({
      profileId : [null],
      profileCode : [null,Validators.required],
      profileNameTH : [null,Validators.required],
      profileNameEN : [null,Validators.required],
      active : [true,Validators.required],
    })
  }

  Save(){
    if (this.formProfile.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if(this.profileId){
      this.serivce.edit(this.formProfile.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formProfile.getRawValue()).subscribe(result => {
        if(result.profileId){
          this.profileId = result.profileId;
          this.formProfile.patchValue(result);
          this.formProfile.controls['profileCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }

}
