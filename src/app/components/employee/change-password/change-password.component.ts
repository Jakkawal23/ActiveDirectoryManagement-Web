import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';
import { LoginService } from '../../login/login/login.service';
import { PasswordListDTO, PasswordService } from '../../admin/document/password/password.service';
import { MatTableDataSource } from '@angular/material/table';
import { ManageDocumentService } from '../../admin/manage-document/manage-document.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements AfterViewInit{

  displayedColumns: string[] = ['createDate','empcode', 'name', 'lastname', 'approveDate','approveBy','status'];
  dataSource = new MatTableDataSource<PasswordListDTO>();

  formPassword : FormGroup;
  userName : string;
  empCode : string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private serivce: ChangePasswordService,
    private docSerivce: ManageDocumentService,
    private passSerivce: PasswordService,
    private alert: ToastrService,
    private loginService: LoginService,
  ){
    this.creatForm();
  }

  ngOnInit(){
    this.userName = this.loginService.getUserName();
    this.empCode = this.loginService.getLoginUser();
    this.formPassword.controls['empCode'].setValue(this.empCode);

    this.docSerivce.getDocumentDetail(this.empCode).subscribe(result =>{
      if(result.password == true){
        this.formPassword.controls['statusCode'].setValue("COMPLETE");
      }
    });

    this.getDocumentData();
  }

  getDocumentData(){
    this.serivce.getDocument(this.empCode).subscribe(result => {
      this.dataSource.data = result;
      this.dataSource._updateChangeSubscription();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  creatForm(){
    this.formPassword = this.fb.group({
      empCode : [null,Validators.required],
      statusCode : 'NEW',
      password : [null,[Validators.required,Validators.minLength(8)]],
      passwordConfirm : [null,[Validators.required,Validators.minLength(8)]],
    });
  }

  save(){
    if (this.formPassword.invalid) {
      this.alert.info('กรุณากรอกข้อมูลให้ครบ', 'แจ้งเตือน');
      return;
    }
    if (this.formPassword.controls['password'].value != this.formPassword.controls['passwordConfirm'].value) {
      this.alert.info('กรุณากรอกรหัสผ่านให้ถูกต้อง', 'แจ้งเตือน');
      return;
    }
    this.serivce.save(this.formPassword.getRawValue()).subscribe(resultSave => {
      if(resultSave){
        if(resultSave.statusCode == "COMPLETE"){
          this.passSerivce.changePassword(resultSave.passwordId).subscribe( resultChange => {
            if(resultChange == null){
              this.serivce.delete(resultSave.passwordId).subscribe(result =>{
                this.alert.error('ไม่พบข้อมูลเอกสาร', 'ข้อผิดพลาด');
                this.getDocumentData();
              });
            }else if(resultChange.message == "NotFound"){
              this.serivce.delete(resultSave.passwordId).subscribe(result =>{
                this.alert.error('ไม่พบข้อมูลใน Active Directory', 'ข้อผิดพลาด');
                this.getDocumentData();
              });

            }else {
              this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
              this.getDocumentData();
            }
          });
        }else{
          this.alert.success('บันทึกข้อมูลเรียบร้อย', 'บันทึก');
          this.getDocumentData();
        }
        
        this.formPassword.controls['password'].reset(null);
        this.formPassword.controls['passwordConfirm'].reset(null);
        
      }else{
        this.alert.error('ตรวจสอบรหัสผ่านให้ถูกต้อง', 'ข้อผิดพลาด');
      }
    });
  }
}
