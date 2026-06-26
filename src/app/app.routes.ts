import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { ListPatientsComponent } from './patient/list-patients/list-patients.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { ListStaffComponent } from './staff/list-staff/list-staff.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { ListAppointmentsComponent } from './appointment/list-appointments/list-appointments.component';

export const routes: Routes = [
  { path: '',                   component: HomeComponent },
  { path: 'patients/add',       component: AddPatientComponent },
  { path: 'patients/list',      component: ListPatientsComponent },
  { path: 'staff/add',          component: AddStaffComponent },
  { path: 'staff/list',         component: ListStaffComponent },
  { path: 'appointments/add',   component: AddAppointmentComponent },
  { path: 'appointments/list',  component: ListAppointmentsComponent },
  { path: '**',                 redirectTo: '' }
];
