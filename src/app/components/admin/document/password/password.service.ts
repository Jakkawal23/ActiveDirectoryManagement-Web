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
  changePassUrl : string = `${environment.apiUrl}ChangePasswordByAdmin`

  getList(status: string) {
    const data = {status : status}
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

  approveDocument(Id: number,empCode: string) {
    const data = {
      documentId : Id,
      empCode: empCode
    }
    return this.http.get<any>(this.apiUrl + "/Approve",{params: data});
  }

  cancelDocument(Id: number,empCode: string) {
    const data = {
      documentId : Id,
      empCode: empCode
    }
    console.log("cancle password service => ",data)
    return this.http.get<any>(this.apiUrl + "/Cancle",{params: data});
  }

  changePassword(Id: number) {
    const data = {documentId : Id}
    return this.http.get<any>(this.changePassUrl + "/changepassword",{params: data});
  }
}
