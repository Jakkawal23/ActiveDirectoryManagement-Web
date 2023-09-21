import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.test';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}EmployeeProfile`

  getMasterPositions() {
    return this.http.get<any>(this.apiUrl + "/Master/Positions");
  }

  getMasterDepartments() {
    return this.http.get<any>(this.apiUrl + "/Master/Departments");
  }

  getMasterTeams() {
    return this.http.get<any>(this.apiUrl + "/Master/Teams");
  }

  getMasterProfile() {
    return this.http.get<any>(this.apiUrl + "/Master/Profiles");
  }

  getDetail(empCode: string) {
    const data = {employeeCode : empCode}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }
}
