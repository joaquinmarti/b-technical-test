import { useState, useCallback } from "react";
import { MONTHS } from "../constants";
import { getDaysInMonth, getFirstDayOfMonth } from "../lib/date";
import type { MonthType } from "../types/date";
import "./calendar.css";


type CalendarProps = {
  month: MonthType;
  year: number;
};

export const Calendar = ({month, year}: CalendarProps) => {
  const [startDate, setSetstartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  
  // Figure out the month name
  const monthName = MONTHS.get(month);
  
  // Figure out the number of days in the month
  const daysInMonth = getDaysInMonth(year, month);
  
  // Figure out the day of the week the first day of the month
  const firstDayOfMonth = getFirstDayOfMonth(year, month) + 1; 
  
  //
  const numberOfWeeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
  
  const handleClick = useCallback((day: number) => {
    if (!startDate || (startDate && endDate) || (startDate && (day < startDate))) {
      setSetstartDate(day);
      setEndDate(null);
    } else {
      setEndDate(day);
    }
  }, [startDate, endDate]);
  
  const daysTable = () => {
    return (
      <>
        {Array(numberOfWeeks).fill(true).map((_, week) => {
          return (
            <tr key={week}>
              {Array(7).fill(true).map((_, day) => {
                const numberOfDay = (week * 7 + day) - firstDayOfMonth + 1;

                return (
                  <td
                    headers={`day-${day}`}
                    key={numberOfDay}
                    data-start={startDate === numberOfDay}
                    data-end={endDate === numberOfDay}
                    data-in-range={startDate && endDate && numberOfDay > startDate && numberOfDay < endDate}
                  >
                    {numberOfDay > daysInMonth || numberOfDay <= 0 ? null : (
                      <button
                        type="button"
                        onClick={() => handleClick(numberOfDay)}
                        data-testid={numberOfDay}
                      >
                        {numberOfDay}
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </>
    );
  }
  
  return (
    <div className="calendar">
      <h1>{monthName}</h1>
      <table>
        <thead>
          <tr>
            <th id="day-0">Mon</th>
            <th id="day-1">Tue</th>
            <th id="day-2">Wed</th>
            <th id="day-3">Thu</th>
            <th id="day-4">Fri</th>
            <th id="day-5">Sat</th>
            <th id="day-6">Sun</th>
          </tr>
        </thead>
        <tbody>
          {daysTable()}
        </tbody>
      </table>
      
      <p>
        Start date: <span data-testid="start-day">{startDate}</span>
        End date: <span data-testid="end-day">{endDate}</span>
      </p>
    </div>
  )
};