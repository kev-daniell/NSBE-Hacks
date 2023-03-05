import { useState, useEffect } from 'react';
import { Calendar, CalendarDay, Dosage } from '../types/types';
import { PatientType } from '../types/types';
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
        };

        // For each day, let's add three dosages for demonstration purposes
        for (let dosageIndex = 0; dosageIndex < 3; dosageIndex++) {
          const dosage: Dosage = {
            medicine: `Medicine ${dosageIndex + 1}`,
            dosage: `${dosageIndex + 1} mg`,
            time: `${dosageIndex + 1}:00 PM`,
            medicineType: 'Type A',
          };

          day.dosages.push(dosage);
        }

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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Calendar Page</h1>
      <AntdCalendar
        dateCellRender={(date) => {
          const day = calendar.weeks.find((week) => week.days.some((day) => moment(new Date()).isSame(`${day.year}-${day.month}-${day.day}`, 'day')));
          return (
            <ul>
              {day?.days
                .find((day) => moment(new Date()).isSame(`${day.year}-${day.month}-${day.day}`, 'day'))
                ?.dosages.map((dosage) => (
                  <li key={dosage.medicine}>
                    {dosage.medicine}: {dosage.dosage}, {dosage.time}, {dosage.medicineType}
                  </li>
                ))}
            </ul>
          );
        }}
      />
    </div>
  );
};

export default CalendarPage;


