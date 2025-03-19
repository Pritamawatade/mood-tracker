import { useState, useMemo } from 'react';
import './MoodCalendar.css';

const MoodCalendar = ({ moods }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get month and year from current date
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Format month name
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  // Generate calendar days
  const calendarDays = useMemo(() => {
    // First day of the month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Last day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create map of moods by date
    const moodsByDate = {};
    moods.forEach(mood => {
      moodsByDate[mood.date] = mood.emoji;
    });
    
    // Generate days array
    const days = [];
    
    // Add empty cells for days before the 1st day of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', mood: null, isCurrentMonth: false });
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        day,
        date: dateString,
        mood: moodsByDate[dateString] || null,
        isCurrentMonth: true,
        isToday: 
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
      });
    }
    
    return days;
  }, [moods, currentMonth, currentYear]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="month-nav">&lt;</button>
        <h2>{monthName} {currentYear}</h2>
        <button onClick={nextMonth} className="month-nav">&gt;</button>
      </div>
      
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        
        {calendarDays.map((dayInfo, index) => (
          <div
            key={index}
            className={`calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${dayInfo.isToday ? 'today' : ''}`}
          >
            <div className="day-number">{dayInfo.day}</div>
            {dayInfo.mood && (
              <div className="day-mood">{dayInfo.mood}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodCalendar;