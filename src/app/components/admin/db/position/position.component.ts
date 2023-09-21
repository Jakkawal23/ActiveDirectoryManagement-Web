import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PositionDTO, PositionService } from './position.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements AfterViewInit{
  displayedColumns: string[] = ['positionCode', 'positionNameTH', 'positionNameEN', 'active','detail','delete'];
  dataSource = new MatTableDataSource<PositionDTO>();
  searchKeyword: string = '';
  deletePositionId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: PositionService,
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
    this.deletePositionId = Id;
  }

  deletePosition(){
    this.serivce.delete(this.deletePositionId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

}
