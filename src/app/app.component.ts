import { Component } from '@angular/core';
import { LoginService } from './components/login/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  )
  {}

  ngOnInit() {
  }

  public visulizarManu():boolean{
    return this.loginService.loginStatus();
  }
}
