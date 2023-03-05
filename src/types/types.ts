export interface Dosage {
  medicine: string;
  dosage: string;
  time: string;
  medicineType: string;
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  dosages: Dosage[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface Calendar {
  weeks: CalendarWeek[];
}

export interface PatientType {
  name: string;
  calendar: Dosage[];
  medicineType: string;
}