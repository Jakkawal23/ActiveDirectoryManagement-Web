import { AfterViewInit, Component ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EmployeeListDTO, ManageDocumentService } from './manage-document.service';
import { PositionDTO } from '../db/position/position.service';
import { DepartmentDTO } from '../db/department/department.service';
import { ProfileDTO } from '../su/profile/profile.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-document',
  templateUrl: './manage-document.component.html',
  styleUrls: ['./manage-document.component.scss']
})
export class ManageDocumentComponent implements AfterViewInit {
  displayedColumns: string[] = ['empCode', 'name', 'lastName','position', 'department','profile','active','detail'];
  dataSource = new MatTableDataSource<EmployeeListDTO>();
  searchKeyword: string = '';
  deleteEmployeeId: number;
  positions:Array<PositionDTO>;
  departments:Array<DepartmentDTO>;
  profiles:Array<ProfileDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private serivce: ManageDocumentService,
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

}
