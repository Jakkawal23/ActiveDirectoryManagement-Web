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
import { DepartmentComponent } from './components/admin/db/department/department.component';
import { TeamComponent } from './components/admin/db/team/team.component';
import { StatusComponent } from './components/admin/db/status/status.component';
import { StatusDetailComponent } from './components/admin/db/status/status-detail/status-detail.component';
import { DepartmentDetailComponent } from './components/admin/db/department/department-detail/department-detail.component';
import { TeamDetailComponent } from './components/admin/db/team/team-detail/team-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/admin/su/profile/profile.component';
import { ProfileDetailComponent } from './components/admin/su/profile/profile-detail/profile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    NotificationComponent,
    ManageEmployeesComponent,
    EmployeeProfileComponent,
    EditEmployeeComponent,
    ChangePasswordComponent,
    DepartmentComponent,
    TeamComponent,
    StatusComponent,
    DepartmentDetailComponent,
    StatusDetailComponent,
    TeamDetailComponent,
    ProfileComponent,
    ProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
    MatDialogModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
