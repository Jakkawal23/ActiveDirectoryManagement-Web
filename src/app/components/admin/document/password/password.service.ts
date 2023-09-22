import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface PasswordListDTO {
  passwordId: number;
  empCode: string;
  name: string;
  lastName: string;
  positionCode: string;
  departmentCode: string;
  statusCode: string;
  approveEmpCode: string;
  createDate: Date;
  approveDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}PasswordDocument`

  getList(Status: string) {
    const data = {Status : Status}
    return this.http.get<any>(this.apiUrl + "/List",{params: data});
  }

  getMasterStatus() {
    return this.http.get<any>(this.apiUrl + "/Master/Status");
  }

  getMasterPositions() {
    return this.http.get<any>(this.apiUrl + "/Master/Positions");
  }

  getMasterDepartments() {
    return this.http.get<any>(this.apiUrl + "/Master/Departments");
  }

  approveDocument(Id: number) {
    const data = {documentId : Id}
    return this.http.get<any>(this.apiUrl + "/Approve",{params: data});
  }

  cancleDocument(Id: number) {
    const data = {documentId : Id}
    console.log("cancle password service => ",data)
    return this.http.get<any>(this.apiUrl + "/Cancle",{params: data});
  }
}
