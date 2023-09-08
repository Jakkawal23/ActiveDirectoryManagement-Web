import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { ManageEmployeesComponent } from './components/admin/manage-employees/manage-employees.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeProfileComponent } from './components/employee/employee-profile/employee-profile.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ChangePasswordComponent } from './components/employee/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    NotificationComponent,
    ManageEmployeesComponent,
    EmployeeProfileComponent,
    EditEmployeeComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
