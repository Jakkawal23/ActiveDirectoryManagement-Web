import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { StatusDTO, StatusService } from './status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements AfterViewInit{
  displayedColumns: string[] = ['statusCode', 'statusNameTH', 'statusNameEN', 'active','detail','delete'];
  dataSource = new MatTableDataSource<StatusDTO>();
  searchKeyword: string = '';
  deleteStatusId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: StatusService,
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
    this.deleteStatusId = Id;
  }

  deleteStatus(){
    this.serivce.delete(this.deleteStatusId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

}