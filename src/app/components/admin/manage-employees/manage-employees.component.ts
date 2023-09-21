import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeListDTO, ManageEmployeesService } from './manage-employees.service';
import { ToastrService } from 'ngx-toastr';
import { PositionDTO } from '../db/position/position.service';
import { DepartmentDTO } from '../db/department/department.service';
import { ProfileDTO } from '../su/profile/profile.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements AfterViewInit {
  displayedColumns: string[] = ['empCode', 'name', 'lastName','position', 'department','profile','active','detail','delete'];
  dataSource = new MatTableDataSource<EmployeeListDTO>();
  searchKeyword: string = '';
  deleteEmployeeId: number;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  profiles:Array<ProfileDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: ManageEmployeesService,
    private alert: ToastrService
  ){}

  ngOnInit(): void {
    this.serivce.getMasterPositions().subscribe(result =>{
      this.positions = result;
      this.updateMasterList();
      
    });
    this.serivce.getMasterDepartments().subscribe(result =>{
      this.departments = result;
      this.updateMasterList();
    });
    this.serivce.getMasterProfile().subscribe(result =>{
      this.profiles = result;
      this.updateMasterList();
    });

    
  }

  updateMasterList(){
    if(this.positions && this.departments && this.profiles){
      this.serivce.getMaster().pipe(
        map(result => {
          result.forEach((item : EmployeeListDTO) => {
            const matchingPosition = this.positions.find(p => p.positionCode === item.positionCode);
            if (matchingPosition) {
              item.positionCode = matchingPosition.positionNameEN;
            }
            const matchingDepartment = this.departments.find(d => d.departmentCode === item.departmentCode);
            if (matchingDepartment) {
              item.departmentCode = matchingDepartment.departmentNameEN;
            }
            const matchingProfile = this.profiles.find(p => p.profileCode === item.profileCode);
            if (matchingProfile) {
              item.profileCode = matchingProfile.profileNameEN;
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

  updateSearchList(keyword: string){
    if(this.positions && this.departments && this.profiles){
      this.serivce.getSearch(keyword).pipe(
        map(result => {
          result.forEach((item : EmployeeListDTO) => {
            const matchingPosition = this.positions.find(p => p.positionCode === item.positionCode);
            if (matchingPosition) {
              item.positionCode = matchingPosition.positionNameEN;
            }
            const matchingDepartment = this.departments.find(d => d.departmentCode === item.departmentCode);
            if (matchingDepartment) {
              item.departmentCode = matchingDepartment.departmentNameEN;
            }
            const matchingProfile = this.profiles.find(p => p.profileCode === item.profileCode);
            if (matchingProfile) {
              item.profileCode = matchingProfile.profileNameEN;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(keyword: string){
    if(keyword){
      this.updateSearchList(keyword);
    }else{
      this.updateMasterList();
    }
  }

  deleteId(Id : number){
    this.deleteEmployeeId = Id;
  }

  deleteEmployee(){
    this.serivce.delete(this.deleteEmployeeId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }
}