import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.test';

export interface PasswordDTO {
  empCode: string;
  password: string;
  passwordConfirm: string;
  statusCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http:HttpClient) { }

  apiUrl : string = `${environment.apiUrl}PasswordDocument`

  save(form: PasswordDTO): Observable<any> {
    return this.http.post<void>(this.apiUrl + "/Change", form);
  }
}
