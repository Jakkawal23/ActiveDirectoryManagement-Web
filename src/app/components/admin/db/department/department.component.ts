import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DepartmentDTO, DepartmentService } from './department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements AfterViewInit{
  displayedColumns: string[] = ['departmentCode', 'departmentNameTH', 'departmentNameEN', 'active','detail','delete'];
  dataSource = new MatTableDataSource<DepartmentDTO>();
  searchKeyword: string = '';
  deleteDepartmentId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: DepartmentService,
    private alert: ToastrService
  ){}

  ngOnInit(): void {
    this.serivce.getMaster().subscribe(result =>{
      this.dataSource.data = result;
      this.dataSource._updateChangeSubscription();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  search(keyword: string){
    if(keyword){
      this.serivce.getSearch(keyword).subscribe(result =>{
        this.dataSource.data = result;
        this.dataSource._updateChangeSubscription();
      });
    }else{
      this.serivce.getMaster().subscribe(result =>{
        this.dataSource.data = result;
        this.dataSource._updateChangeSubscription();
      });
    }
  }

  deleteId(Id : number){
    this.deleteDepartmentId = Id;
  }

  deleteDepartment(){
    this.serivce.delete(this.deleteDepartmentId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

}