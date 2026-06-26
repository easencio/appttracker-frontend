import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-patient',
  imports: [ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {

  patientForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      gender:    ['', Validators.required],
      age:       ['', [Validators.required, Validators.min(0), Validators.max(150)]]
    });
  }

  onSave(): void {
    if (this.patientForm.invalid) return;

    this.apiService.createPatient(this.patientForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred while saving the patient.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
