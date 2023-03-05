import { useState, useEffect } from 'react';
import { Calendar, CalendarDay, Dosage } from '../../types/types';
import { PatientType } from '../../types/types';
import { Calendar as AntdCalendar } from 'antd';
import moment from 'moment';



interface Props {}

const CalendarPage: React.FC<Props> = () => {
  const [calendar, setCalendar] = useState<Calendar>({
    weeks: [],
  });

  // Initialize the calendar
  const initCalendar = (): void => {
    const weeks: Calendar['weeks'] = [];
  
    // For the sake of this example, let's create a calendar with four weeks
    for (let weekIndex = 0; weekIndex < 4; weekIndex++) {
      const days: CalendarDay[] = [];
  
      // Each week has seven days
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const day: CalendarDay = {
          day: dayIndex + 1,
          month: weekIndex + 1,
          year: new Date().getFullYear(),
          dosages: [],
          startDate: moment().add(weekIndex, 'week').add(dayIndex, 'day').startOf('day').toDate(),
          endDate: moment().add(weekIndex, 'week').add(dayIndex, 'day').endOf('day').toDate(),
        };
      
        // Add some sample dosages for each day
        const morningDosage: Dosage = {
          medicine: 'Medicine 1',
          dosage: '1 mg',
          time: '9:00 AM',
          medicineType: 'Type A',
          startDateTime: moment(day.startDate).add(8, 'hour').toDate(), 
          endDateTime: moment(day.startDate).add(9, 'hour').toDate(),
        };
      
        const afternoonDosage: Dosage = {
          medicine: 'Medicine 2',
          dosage: '2 mg',
          time: '2:00 PM',
          medicineType: 'Type B',
          startDateTime: moment(day.startDate).add(12, 'hour').toDate(),
          endDateTime: moment(day.startDate).add(14, 'hour').toDate(),
        };
      
        const eveningDosage: Dosage = {
          medicine: 'Medicine 3',
          dosage: '3 mg',
          time: '7:00 PM',
          medicineType: 'Type C',
          startDateTime: moment(day.startDate).add(18, 'hour').toDate(),
          endDateTime: moment(day.startDate).add(21, 'hour').toDate(),
        };
      
        day.dosages.push(morningDosage);
        day.dosages.push(afternoonDosage);
        day.dosages.push(eveningDosage);
      
        days.push(day);
        
      }
  
      weeks.push({
        days,
      });
    }
  
    setCalendar({
      weeks,
    });
  };

  // Call initCalendar only once during initial mount
  useEffect(() => {
    initCalendar();
  }, []);

  return (
    <div style={{ background: '#f5f5f5', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#1890ff' }}>Calendar Page</h1>
      <AntdCalendar
        dateCellRender={(date) => {
            const day = calendar.weeks.find((week) =>
              week.days.some((day) =>
                moment(date.toDate()).isBetween(day.startDate, day.endDate, null, '[]')
              )
            );
          
            // Find the dosage that matches the start and end dates for the current day
            const dosage =
              day?.days.find((day) =>
                moment(date.toDate()).isBetween(day.startDate, day.endDate, null, '[]')
              )?.dosages[0];
          
            return (
              <ul>
                {dosage && (
                  <li style={{ color: '#1890ff' }}>
                    {dosage.medicine}: {dosage.dosage}, {dosage.time},{' '}
                    {dosage.medicineType}
                  </li>
                )}
              </ul>
            );
          }}
      />
    </div>
  );
};

export default CalendarPage;
