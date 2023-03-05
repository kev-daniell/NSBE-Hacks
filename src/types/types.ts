export interface Dosage {
  medicine: string;
  dosage: string;
  time: string;
  medicineType: string;
  startDateTime: Date;
  endDateTime: Date;
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  dosages: Dosage[];
  startDate?: Date;
  endDate?: Date;
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