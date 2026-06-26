import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { StaffMember } from '../models/staff-member.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // --- Patients ---
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/patients`, patient);
  }

  // --- Staff Members ---
  getStaffMembers(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(`${this.baseUrl}/staff`);
  }

  createStaffMember(staffMember: StaffMember): Observable<StaffMember> {
    return this.http.post<StaffMember>(`${this.baseUrl}/staff`, staffMember);
  }

  // --- Appointments ---
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/appointments`, appointment);
  }
}
