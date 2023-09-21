import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface EmployeeListDTO {
  employeeId: number;
  employeeCode: string;
  positionCode: string;
  departmentCode: string;
  profileCode: string;
  name: string;
  lastName: string;
  active: boolean;
}

export interface EmployeeSaveDTO {
  //Employee
  employeeId: number;
  employeeCode: string;
  positionCode: string;
  departmentCode: string;
  teamCode: string;
  name: string;
  lastName: string;
  //User
  userName: string;
  password: string;
  passwordConfirm: string;
  mobilePhoneNo: string;
  email: string;
  pofileCode: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeesService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}DbEmployeeManagement`

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

  getMaster() {
    return this.http.get<any>(this.apiUrl);
  }

  getSearch(Keyword: string) {
    const data = {Keyword : Keyword}
    return this.http.get<any>(this.apiUrl + "/Search",{params: data});
  }

  getDetail(Id: number) {
    const data = {employeeId : Id}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }

  edit(form: EmployeeSaveDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }

  delete(Id: number): Observable<any> {
    const data = { employeeId: Id };
    return this.http.delete<any>(this.apiUrl + "/Delete", { params: data });
  }

}
