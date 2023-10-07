import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

export interface DocumentDTO {
  // managementId: number;
  empCode: string;
  password: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ManageDocumentService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}ManagementDocument`

  getMasterPositions() {
    return this.http.get<any>(this.apiUrl + "/Master/Positions");
  }

  getMasterDepartments() {
    return this.http.get<any>(this.apiUrl + "/Master/Departments");
  }

  getMasterProfile() {
    return this.http.get<any>(this.apiUrl + "/Master/Profiles");
  }

  getMasterTeams() {
    return this.http.get<any>(this.apiUrl + "/Master/Teams");
  }

  getMaster() {
    return this.http.get<any>(this.apiUrl);
  }

  getSearch(Keyword: string) {
    const data = {Keyword : Keyword}
    return this.http.get<any>(this.apiUrl + "/Search",{params: data});
  }

  getEmployeeDetail(Id: number) {
    const data = {employeeId : Id}
    return this.http.get<any>(this.apiUrl + "/EmployeeDetail",{params: data});
  }

  getDocumentDetail(empCode: string) {
    const data = {employeeCode : empCode}
    return this.http.get<any>(this.apiUrl + "/DocumentDetail",{params: data});
  }
  
  edit(form: DocumentDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }
}
