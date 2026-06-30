import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-list-patients',
  imports: [CommonModule],
  templateUrl: './list-patients.component.html',
  styleUrl: './list-patients.component.css'
})
export class ListPatientsComponent implements OnInit {

  patients: Patient[] = [];
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getPatients().subscribe({
      next: (data) => { this.patients = data; this.cdr.detectChanges(); },
      error: () => { this.errorMessage = 'Could not load patients. Is the backend running?'; this.cdr.detectChanges(); }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
