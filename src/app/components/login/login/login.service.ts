import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.test';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogin:boolean = false;
  private loginUser:string;
  private userName:string;
  private userProfile: string;
  apiUrl : string = `${environment.apiUrl}Login`

  constructor(
      private http:HttpClient) 
  { 
    this.isLogin = localStorage.getItem('isLogin') === 'true';
    this.loginUser = localStorage.getItem('loginUser') || ''; 
    this.userName = localStorage.getItem('userName') || ''; 
    this.userProfile = localStorage.getItem('userProfile') || ''; 
  }

  isUser(username: string, password: string): Observable<boolean> {
    const loginRequest = { UserName: username, Password: password };
    return this.http.post<boolean>(this.apiUrl + "/IsUser", loginRequest);
  }

  getEmployeeCode(username: string): Observable<string> {
    const data = { userName: username };
    return this.http.get<string>(this.apiUrl + "/EmployeeCode", { params: data });
  }

  getEmployeeProfile(username: string): Observable<string> {
    const data = { userName: username };
    return this.http.get<string>(this.apiUrl + "/EmployeeProfile", { params: data });
  }

  getEmployeeName(empCode: string): Observable<string> {
    const data = { employeeCode: empCode };
    return this.http.get<string>(this.apiUrl + "/EmployeeName", { params: data });
  }

  setEmployeeCode(username: string){
    this.getEmployeeCode(username).subscribe((result:any)=>{
      this.loginUser = result.employeeCode;
      localStorage.setItem('loginUser', result.employeeCode);
    });
  }

  setEmployeeProfile(username: string){
    this.getEmployeeProfile(username).subscribe((result:any)=>{
      this.loginUser = result.profileCode;
      localStorage.setItem('userProfile', result.profileCode);
    });
  }

  public login(obj: { username: string, password: string }): Observable<boolean> {
    return this.isUser(obj.username, obj.password).pipe(
      map((result) => {
        this.isLogin = result;
        localStorage.setItem('isLogin', this.isLogin ? 'true' : 'false');
        if(this.isLogin){
          this.setEmployeeCode(obj.username);
          this.setEmployeeProfile(obj.username);
          localStorage.setItem('userName', obj.username);
        }
        return this.isLogin;
      })
    );
  }

  public getLoginUser(){
    return this.loginUser;
  }

  public loginStatus(){
    return this.isLogin;
  }

  public getUserName(){
    return this.userName;
  }

  public getUserProfile(){
    return this.userProfile;
  }

  public logout() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
    this.loginUser = '';
    this.userName = '';
    this.userProfile = '';
    this.isLogin = false;
  }
}