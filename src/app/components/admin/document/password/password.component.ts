import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PasswordListDTO, PasswordService } from './password.service';
import { StatusDTO } from '../../db/status/status.service';
import { ToastrService } from 'ngx-toastr';
import { PositionDTO } from '../../db/position/position.service';
import { DepartmentDTO } from '../../db/department/department.service';
import { map } from 'rxjs';
import { LoginService } from 'src/app/components/login/login/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements AfterViewInit{

  newDisplayedColumns: string[] = ['createDate','empcode', 'name', 'lastname', 'position','department','status','approve','delete'];
  newDataSource = new MatTableDataSource<PasswordListDTO>();
  completeDisplayedColumns: string[] = ['createDate','empcode', 'name', 'lastname', 'position','department','approveDate','approveBy','status'];
  completeDataSource = new MatTableDataSource<PasswordListDTO>();
  cancelDisplayedColumns: string[] = ['createDate','empcode', 'name', 'lastname', 'position','department','approveDate','approveBy','status'];
  cancelDataSource = new MatTableDataSource<PasswordListDTO>();
  status:Array<StatusDTO>;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  deletePasswordId: number;
  empCode : string;

  // @ViewChild(MatPaginator) paginator1!: MatPaginator;
  // @ViewChild(MatPaginator) paginator2!: MatPaginator;
  // @ViewChild(MatPaginator) paginator3!: MatPaginator;

  @ViewChild('paginator1', { static: true }) paginator1!: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;



  constructor(
    private serivce: PasswordService,
    private alert: ToastrService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.empCode = this.loginService.getLoginUser();

    this.serivce.getMasterStatus().subscribe(result =>{
      this.status = result;
    });

    this.serivce.getMasterPositions().subscribe(result =>{
      this.positions = result;
      this.updateMasterList();
    });
    this.serivce.getMasterDepartments().subscribe(result =>{
      this.departments = result;
      this.updateMasterList();
    });

    // this.search();
  }

  ngAfterViewInit() {
    this.newDataSource.paginator = this.paginator1;
    this.completeDataSource.paginator = this.paginator2;
    this.cancelDataSource.paginator = this.paginator3;
  }

  updateMasterList(){
    if(this.positions && this.departments){
      this.serivce.getList("NEW").pipe(
        map(result => {
          result.forEach((item : PasswordListDTO) => {
            const matchingPosition = this.positions.find(p => p.positionCode === item.positionCode);
            if (matchingPosition) {
              item.positionCode = matchingPosition.positionNameEN;
            }
            const matchingDepartment = this.departments.find(d => d.departmentCode === item.departmentCode);
            if (matchingDepartment) {
              item.departmentCode = matchingDepartment.departmentNameEN;
            }
          });
          return result;
        })
      ).subscribe(result => {
        this.newDataSource.data = result;
        this.newDataSource._updateChangeSubscription();
      });

      this.serivce.getList("COMPLETE").pipe(
        map(result => {
          result.forEach((item : PasswordListDTO) => {
            const matchingPosition = this.positions.find(p => p.positionCode === item.positionCode);
            if (matchingPosition) {
              item.positionCode = matchingPosition.positionNameEN;
            }
            const matchingDepartment = this.departments.find(d => d.departmentCode === item.departmentCode);
            if (matchingDepartment) {
              item.departmentCode = matchingDepartment.departmentNameEN;
            }
          });
          return result;
        })
      ).subscribe(result => {
        this.completeDataSource.data = result;
        this.completeDataSource._updateChangeSubscription();
      });

      this.serivce.getList("CANCEL").pipe(
        map(result => {
          result.forEach((item : PasswordListDTO) => {
            const matchingPosition = this.positions.find(p => p.positionCode === item.positionCode);
            if (matchingPosition) {
              item.positionCode = matchingPosition.positionNameEN;
            }
            const matchingDepartment = this.departments.find(d => d.departmentCode === item.departmentCode);
            if (matchingDepartment) {
              item.departmentCode = matchingDepartment.departmentNameEN;
            }
          });
          return result;
        })
      ).subscribe(result => {
        this.cancelDataSource.data = result;
        this.cancelDataSource._updateChangeSubscription();
      });
    }
  }

  approveDocument(id :number){
    this.serivce.changePassword(id).subscribe( result => {
      console.log(result.message);
        if(result == null){
          this.alert.error('ไม่พบข้อมูลเอกสาร', 'ข้อผิดพลาด');
        }
        if(result.message != "NotFound"){
          this.saveApproveDocument(id);
        }else{
          this.alert.error('ไม่พบข้อมูลใน Active Directory', 'ข้อผิดพลาด');
        }
    });
  }

  saveApproveDocument(id :number){
    this.serivce.approveDocument(id,this.empCode).subscribe(result =>{
      this.updateMasterList();
      this.alert.success('อนุมัติเอกสารเรียบร้อย', 'อนุมัติ');
    });
  }

  cancelId(id : number){
    this.deletePasswordId = id;
  }

  cancelPassword(){
    this.serivce.cancelDocument(this.deletePasswordId,this.empCode).subscribe(result =>{
      this.updateMasterList();
      this.alert.success('ลบเอกสารเรียบร้อย', 'ลบ');
    });
  }
}