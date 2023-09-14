import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileDTO, ProfileService } from './profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit{
  displayedColumns: string[] = ['profileCode', 'profileNameTH', 'profileNameEN', 'active','detail','delete'];
  dataSource = new MatTableDataSource<ProfileDTO>();
  searchKeyword: string = '';
  deleteProfileId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: ProfileService,
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
    this.deleteProfileId = Id;
  }

  deleteProfile(){
    this.serivce.delete(this.deleteProfileId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

}
