import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PasswordListDTO, PasswordService } from './password.service';
import { StatusDTO } from '../../db/status/status.service';
import { ToastrService } from 'ngx-toastr';
import { PositionDTO } from '../../db/position/position.service';
import { DepartmentDTO } from '../../db/department/department.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements AfterViewInit{

  displayedColumns: string[] = ['createDate','empcode', 'name', 'lastname', 'position','department','status','approve','delete'];
  dataSource = new MatTableDataSource<PasswordListDTO>();
  status:Array<StatusDTO>;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  selectedStatusCode: string;
  deletePasswordId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null


  constructor(
    private serivce: PasswordService,
    private alert: ToastrService
  ){}

  ngOnInit(): void {
    this.selectedStatusCode = 'NEW';
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
    this.dataSource.paginator = this.paginator;
  }

  updateMasterList(){
    if(this.positions && this.departments){
      this.serivce.getList(this.selectedStatusCode).pipe(
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
        this.dataSource.data = result;
        this.dataSource._updateChangeSubscription();
      });
    }
  }

  // search(){
    // this.serivce.getList(this.selectedStatusCode).subscribe(result =>{
    //   this.dataSource.data = result;
    //   this.dataSource._updateChangeSubscription();
    // });
  // }

  approveDocument(id :number){
    console.log("IDDD => ",id);
    this.serivce.approveDocument(id).subscribe(result =>{
      this.updateMasterList();
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

  cancleId(id : number){
    this.deletePasswordId = id;
  }

  canclePassword(){
    console.log("IDDD => ",this.deletePasswordId);
    this.serivce.cancleDocument(this.deletePasswordId).subscribe(result =>{
      this.updateMasterList();
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }
}