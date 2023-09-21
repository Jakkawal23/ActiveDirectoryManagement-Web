import { Component, HostListener  } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  empCode : string;
  empName : string;
  private isFirstClick = true;

  constructor(
    private loginService: LoginService,
    private router: Router
  )
  {}

  ngOnInit(){
    this.empCode = this.loginService.getLoginUser();
    if(this.empCode == ''){
      setInterval(() => {
        this.empCode = this.loginService.getLoginUser();

          location.reload();
      }, 5000);
    }
    if(this.empCode != ''){
      this.loginService.getEmployeeName(this.empCode).subscribe((result: any) => {
        this.empName = result.employeeName;
      });
    }
  }

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   if (this.isFirstClick) {
  //     this.empCode = this.loginService.getLoginUser();
  //     if (this.empCode!='') {
  //       this.loginService.getEmployeeName(this.empCode).subscribe((result: any) => {
  //         this.empName = result.employeeName;
  //       });
  //       this.isFirstClick = false;
  //       // this.router.navigate(['/employeeProfile']);
  //     }
  //   }
  // }

  logout(){
    this.loginService.logout();
  }
}
