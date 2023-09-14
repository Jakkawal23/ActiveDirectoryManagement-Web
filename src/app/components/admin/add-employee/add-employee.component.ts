import { Component } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  public departments:Array<PeriodicElement> = [
    {position: 1, departmentCode: 'Hydrogen', weight: 1.0079, departmentNameEN: 'H'},
    {position: 2, departmentCode: 'Helium', weight: 4.0026, departmentNameEN: 'He'},
    {position: 3, departmentCode: 'Lithium', weight: 6.941, departmentNameEN: 'Li'},
    {position: 4, departmentCode: 'Beryllium', weight: 9.0122, departmentNameEN: 'Be'},
    {position: 5, departmentCode: 'Boron', weight: 10.811, departmentNameEN: 'B'},
    {position: 6, departmentCode: 'Carbon', weight: 12.0107, departmentNameEN: 'C'},
    {position: 7, departmentCode: 'Nitrogen', weight: 14.0067, departmentNameEN: 'N'},
    {position: 8, departmentCode: 'Oxygen', weight: 15.9994, departmentNameEN: 'O'},
    {position: 9, departmentCode: 'Fluorine', weight: 18.9984, departmentNameEN: 'F'},
    {position: 10, departmentCode: 'Neon', weight: 20.1797, departmentNameEN: 'Ne'},
  ];
  
  
}

export interface PeriodicElement {
  departmentCode: string;
  position: number;
  weight: number;
  departmentNameEN: string;
}