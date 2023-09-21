import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface EmployeeDTO {
  employeeCode: string;
  positionCode: string;
  departmentCode: string;
  teamcode: string;
  name: string;
  lastName: string;
  userName: string;
  mobilePhoneNo: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditEmployeeService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}EditEmployee`

  getDetail(empCode: string) {
    const data = {employeeCode : empCode}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }

  getMasterPositions() {
    return this.http.get<any>(this.apiUrl + "/Master/Positions");
  }

  getMasterDepartments() {
    return this.http.get<any>(this.apiUrl + "/Master/Departments");
  }

  getMasterTeams() {
    return this.http.get<any>(this.apiUrl + "/Master/Teams");
  }

  save(form: EmployeeDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }
}
