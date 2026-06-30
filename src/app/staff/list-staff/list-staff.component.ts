import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { StaffMember } from '../../models/staff-member.model';

@Component({
  selector: 'app-list-staff',
  imports: [CommonModule],
  templateUrl: './list-staff.component.html',
  styleUrl: './list-staff.component.css'
})
export class ListStaffComponent implements OnInit {

  staffMembers: StaffMember[] = [];
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getStaffMembers().subscribe({
      next: (data) => { this.staffMembers = data; this.cdr.detectChanges(); },
      error: () => { this.errorMessage = 'Could not load staff members. Is the backend running?'; this.cdr.detectChanges(); }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
