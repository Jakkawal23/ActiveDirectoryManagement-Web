import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { ManageEmployeesComponent } from './components/admin/manage-employees/manage-employees.component';
import { EmployeeProfileComponent } from './components/employee/employee-profile/employee-profile.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ChangePasswordComponent } from './components/employee/change-password/change-password.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AddEmployeeComponent
  // },
  {
    path: 'addEmployee',
    component: AddEmployeeComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'manageEmployee',
    component: ManageEmployeesComponent
  },
  {
    path: 'employeeProfile',
    component: EmployeeProfileComponent
  },
  {
    path: 'editEmployee',
    component: EditEmployeeComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
