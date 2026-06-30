import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Patient } from '../../models/patient.model';
import { StaffMember } from '../../models/staff-member.model';

@Component({
  selector: 'app-add-appointment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  staffMembers: StaffMember[] = [];
  patients: Patient[] = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.appointmentForm = this.fb.group({
      staffMemberId:   ['', Validators.required],
      patientIds:      [[], Validators.required],
      appointmentDate: ['', Validators.required],
      startTime:       ['', Validators.required],
      endTime:         ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getStaffMembers().subscribe({
      next: (data) => { this.staffMembers = data; this.cdr.detectChanges(); }
    });
    this.apiService.getPatients().subscribe({
      next: (data) => { this.patients = data; this.cdr.detectChanges(); }
    });
  }

  get selectedPatientIds(): number[] {
    return this.appointmentForm.get('patientIds')?.value || [];
  }

  togglePatient(patientId: number): void {
    const current: number[] = this.selectedPatientIds;
    const updated = current.includes(patientId)
      ? current.filter(id => id !== patientId)
      : [...current, patientId];
    this.appointmentForm.get('patientIds')?.setValue(updated);
  }

  isPatientSelected(patientId: number): boolean {
    return this.selectedPatientIds.includes(patientId);
  }

  onSave(): void {
    if (this.appointmentForm.invalid || this.selectedPatientIds.length === 0) {
      this.errorMessage = 'Please fill in all fields and select at least one patient.';
      return;
    }

    const formValue = this.appointmentForm.value;
    const payload = {
      staffMember: { id: Number(formValue.staffMemberId) },
      patients: this.selectedPatientIds.map(id => ({ id })),
      appointmentDate: formValue.appointmentDate,
      startTime: formValue.startTime,
      endTime: formValue.endTime
    };

    this.apiService.createAppointment(payload as any).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Could not save appointment. Check for scheduling conflicts.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
