import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.test';
import { Observable } from 'rxjs';

export interface EmployeeDTO {
  employeeCode: string;
  positionCode: string;
  departmentCode: string;
  teamcode: string;
  name: string;
  lastName: string;
  mobilePhoneNo: string;
  email: string;
  password: string;
  passwordConfirm: string;
}


@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}DbEmployee`

  getMasterPositions() {
    return this.http.get<any>(this.apiUrl + "/Master/Positions");
  }

  getMasterDepartments() {
    return this.http.get<any>(this.apiUrl + "/Master/Departments");
  }

  getMasterTeams() {
    return this.http.get<any>(this.apiUrl + "/Master/Teams");
  }

  save(form: EmployeeDTO): Observable<any> {
    return this.http.post<void>(this.apiUrl + "/Create", form);
  }

  edit(form: EmployeeDTO){
    return this.http.put<any>(this.apiUrl + "/Create/Edit", form);
  }
}
