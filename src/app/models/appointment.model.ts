import { Patient } from './patient.model';
import { StaffMember } from './staff-member.model';

export interface Appointment {
  id?: number;
  staffMember: StaffMember;
  patients: Patient[];
  appointmentDate: string;  // ISO date string: YYYY-MM-DD
  startTime: string;        // HH:MM
  endTime: string;          // HH:MM
}
