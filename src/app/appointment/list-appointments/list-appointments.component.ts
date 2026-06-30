import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-list-appointments',
  imports: [CommonModule],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.css'
})
export class ListAppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getAppointments().subscribe({
      next: (data) => { this.appointments = data; this.cdr.detectChanges(); },
      error: () => { this.errorMessage = 'Could not load appointments. Is the backend running?'; this.cdr.detectChanges(); }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
