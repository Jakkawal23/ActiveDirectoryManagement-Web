import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements AfterViewInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','symbol1','symbol2','symbol3','symbol4'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using "!" to assert non-null

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  symbol1: string;
  symbol2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'MFEC-12345', name: 'Patcharawarin', weight: 'Jinklang', symbol: 'Security Specialist', symbol1: 'Information Security', symbol2: 'H'},
  {position: 'MFEC-12344', name: 'Somechar', weight: 'Jaidee', symbol: 'Project Manager', symbol1: 'Project Manager', symbol2: 'Information Technology'},
  {position: 'MFEC-12340', name: 'Somesri', weight: 'Meebun', symbol: 'SoftwareEngineer', symbol1: 'SoftwareEngineer', symbol2: 'SoftwareEngineer'},
]