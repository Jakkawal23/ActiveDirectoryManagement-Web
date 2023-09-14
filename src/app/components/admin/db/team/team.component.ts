import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TeamDTO, TeamService } from './team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements AfterViewInit{
  displayedColumns: string[] = ['teamCode', 'teamNameTH', 'teamNameEN', 'active','detail','delete'];
  dataSource = new MatTableDataSource<TeamDTO>();
  searchKeyword: string = '';
  deleteTeamId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  constructor(
    private serivce: TeamService,
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
    this.deleteTeamId = Id;
  }

  deleteTeam(){
    this.serivce.delete(this.deleteTeamId).subscribe(result =>{
      this.search(this.searchKeyword);
      this.alert.success('ลบข้อมูลเรียบร้อย', 'ลบ');
    });
  }

}