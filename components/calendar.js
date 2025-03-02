"use client";

import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust starting day to align with Monday as the first day of the week
    const startingDay = (firstDayOfMonth.getDay() - 1 + 7) % 7;
    const dates = [];
    let day = 1;

    const totalCells = daysInMonth + startingDay;
    const totalRows = Math.ceil(totalCells / 7);

    for (let i = 0; i < totalRows; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || day > daysInMonth) {
          week.push(<td key={`empty-${i}-${j}`} className="empty"></td>);
        } else {
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day;

          week.push(
            <td
              key={day}
              className={`day ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedDate(new Date(year, month, day))}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      dates.push(<tr key={i}>{week}</tr>);
    }
    return dates;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthYearString = `${new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(currentDate)} ${currentDate.getFullYear()}`;

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <span>{monthYearString}</span>
          <div className="switch-btn">
            <button onClick={prevMonth} className="nav-btn">{"<"}</button>
            <button onClick={nextMonth} className="nav-btn">{">"}</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          <tbody>{renderCalendar(currentDate)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;