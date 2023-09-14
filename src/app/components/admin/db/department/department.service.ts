import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface DepartmentDTO {
  departmentId: number;
  departmentCode: string;
  departmentNameTH: string;
  departmentNameEN: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}DbDepartment`

  getMaster() {
    return this.http.get<any>(this.apiUrl);
  }
  
  getDetail(Id: number) {
    const data = {departmentId : Id}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }

  getSearch(Keyword: string) {
    const data = {Keyword : Keyword}
    return this.http.get<any>(this.apiUrl + "/Search",{params: data});
  }

  save(form: DepartmentDTO): Observable<any> {
    return this.http.post<void>(this.apiUrl + "/Create", form);
  }

  edit(form: DepartmentDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }

  delete(Id: number): Observable<any> {
    const data = { departmentId: Id };
    return this.http.delete<any>(this.apiUrl + "/Delete", { params: data });
  }

}
