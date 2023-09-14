import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface ProfileDTO {
  profileId: number;
  profileCode: string;
  profileNameTH: string;
  profileNameEN: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}SuProfile`

  getMaster() {
    return this.http.get<any>(this.apiUrl);
  }
  
  getDetail(Id: number) {
    const data = {profileId : Id}
    return this.http.get<any>(this.apiUrl + "/Detail",{params: data});
  }

  getSearch(Keyword: string) {
    const data = {Keyword : Keyword}
    return this.http.get<any>(this.apiUrl + "/Search",{params: data});
  }

  save(form: ProfileDTO): Observable<any> {
    return this.http.post<void>(this.apiUrl + "/Create", form);
  }

  edit(form: ProfileDTO){
    return this.http.put<any>(this.apiUrl + "/Edit", form);
  }

  delete(Id: number): Observable<any> {
    const data = { profileId: Id };
    return this.http.delete<any>(this.apiUrl + "/Delete", { params: data });
  }

}
