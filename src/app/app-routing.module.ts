import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { ManageEmployeesComponent } from './components/admin/manage-employees/manage-employees.component';
import { EmployeeProfileComponent } from './components/employee/employee-profile/employee-profile.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ChangePasswordComponent } from './components/employee/change-password/change-password.component';
import { TeamComponent } from './components/admin/db/team/team.component';
import { StatusComponent } from './components/admin/db/status/status.component';
import { DepartmentComponent } from './components/admin/db/department/department.component';
import { TeamDetailComponent } from './components/admin/db/team/team-detail/team-detail.component';
import { StatusDetailComponent } from './components/admin/db/status/status-detail/status-detail.component';
import { DepartmentDetailComponent } from './components/admin/db/department/department-detail/department-detail.component';
import { ProfileComponent } from './components/admin/su/profile/profile.component';
import { ProfileDetailComponent } from './components/admin/su/profile/profile-detail/profile-detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AddEmployeeComponent
  // },
  {
    path: 'admin/addEmployee',
    component: AddEmployeeComponent
  },
  {
    path: 'admin/notification',
    component: NotificationComponent
  },
  {
    path: 'admin/manageEmployee',
    component: ManageEmployeesComponent
  },
  {
    path: 'admin/department',
    component: DepartmentComponent
  },
  {
    path: 'admin/department/detail',
    component: DepartmentDetailComponent
  },
  {
    path: 'admin/status',
    component: StatusComponent
  },
  {
    path: 'admin/status/detail',
    component: StatusDetailComponent
  },
  {
    path: 'admin/team',
    component: TeamComponent
  },
  {
    path: 'admin/team/detail',
    component: TeamDetailComponent
  },
  {
    path: 'admin/profile',
    component: ProfileComponent
  },
  {
    path: 'admin/profile/detail',
    component: ProfileDetailComponent
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
