import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-staff',
  imports: [ReactiveFormsModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent {

  staffForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.staffForm = this.fb.group({
      firstName:   ['', Validators.required],
      lastName:    ['', Validators.required],
      gender:      ['', Validators.required],
      credentials: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.staffForm.invalid) return;

    this.apiService.createStaffMember(this.staffForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred while saving the staff member.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
