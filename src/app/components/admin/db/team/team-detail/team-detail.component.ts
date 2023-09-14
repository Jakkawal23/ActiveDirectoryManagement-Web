import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent {

  formTeam : FormGroup;
  teamId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private serivce: TeamService,
    private alert: ToastrService
  )
  {
    this.creatForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.teamId =  params['teamId'];
      }
    )
    if(this.teamId){
      this.serivce.getDetail(this.teamId).subscribe(result =>{
        this.formTeam.patchValue(result);
        this.formTeam.controls['teamId'].setValue(this.teamId)
      });
      this.formTeam.controls['teamCode'].disable();
    }
  }

  creatForm(){
    this.formTeam = this.fb.group({
      teamId : [null],
      teamCode : [null,Validators.required],
      teamNameTH : [null,Validators.required],
      teamNameEN : [null,Validators.required],
      active : [true,Validators.required],
    })
  }

  Save(){
    if (this.formTeam.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if(this.teamId){
      this.serivce.edit(this.formTeam.getRawValue()).subscribe(result =>{
        this.alert.success('แก้ไขข้อมูลเรียบร้อย', 'แก้ไข');
      });
    }else{
      this.serivce.save(this.formTeam.getRawValue()).subscribe(result => {
        if(result.teamId){
          this.teamId = result.teamId;
          this.formTeam.patchValue(result);
          this.formTeam.controls['teamCode'].disable();
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
        }else{
          this.alert.error('ข้อมูลซ้ำ', 'ข้อผิดพลาด');
        }
      });
    }
  }

}