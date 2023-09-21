import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface PositionDTO {
  positionId: number;
  positionCode: string;
  positionNameTH: string;
  positionNameEN: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}DbPosition`

  getMaster() {
    return this.http.get<any>(this.apiUrl);
  }
  
  getDetail(Id: number) {
    const data = {positionId : Id}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }

  getSearch(Keyword: string) {
    const data = {Keyword : Keyword}
    return this.http.get<any>(this.apiUrl + "/Search",{params: data});
  }

  save(form: PositionDTO): Observable<any> {
    return this.http.post<void>(this.apiUrl + "/Create", form);
  }

  edit(form: PositionDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }

  delete(Id: number): Observable<any> {
    const data = { positionId: Id };
    return this.http.delete<any>(this.apiUrl + "/Delete", { params: data });
  }
}
