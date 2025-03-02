import React, { useEffect, useRef } from 'react';

const WeeklyCalendar = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Generate time slots from 6:00 AM to 5:00 AM (24-hour format)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 6) % 24; // Start from 6 AM and cycle back
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${period}`;
  });

  // Week days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = now.getDay();
  
  // Dummy events data
  const events = [
    { title: 'Basic terms Meeting', day: 1, startHour: 10, startMinute: 0, endHour: 11, endMinute: 45, color: '#ffb3b3' },
    { title: 'SRS stat Meeting', day: 1, startHour: 14, startMinute: 0, endHour: 20, endMinute: 0, color: '#b3e0ff' },
    { title: 'Team Standup', day: 2, startHour: 9, startMinute: 30, endHour: 10, endMinute: 0, color: '#b3ffb3' },
    { title: 'Client Call', day: 2, startHour: 15, startMinute: 0, endHour: 16, endMinute: 0, color: '#ffdf80' },
    { title: 'Code Review Session', day: 3, startHour: 11, startMinute: 0, endHour: 12, endMinute: 30, color: '#d9b3ff' },
    { title: 'Sprint Planning', day: 3, startHour: 14, startMinute: 30, endHour: 16, endMinute: 0, color: '#ff9999' },
    { title: 'Design Review', day: 4, startHour: 10, startMinute: 0, endHour: 11, endMinute: 30, color: '#80ccff' },
    { title: 'Backend Sync-up', day: 4, startHour: 13, startMinute: 0, endHour: 14, endMinute: 0, color: '#99ff99' },
    { title: 'Product Demo', day: 5, startHour: 16, startMinute: 0, endHour: 17, endMinute: 0, color: '#ffcc99' },
    { title: 'Retrospective Meeting', day: 5, startHour: 17, startMinute: 30, endHour: 18, endMinute: 30, color: '#ff8080' }
  ];

  // Function to calculate event position
  const getEventStyle = (event) => {
    const hourHeight = 60; // 60px per hour
    const startOffset = ((event.startHour + event.startMinute / 60) - 6) * hourHeight; // Adjust for 6 AM start
    const eventHeight = ((event.endHour - event.startHour) + (event.endMinute - event.startMinute) / 60) * hourHeight;
    
    return {
      top: `${startOffset}px`,
      height: `${eventHeight}px`,
      backgroundColor: event.color,
      left: '2px',
      right: '2px',
      position: 'absolute',
      borderRadius: '4px',
      padding: '4px',
      fontSize: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      zIndex: 1
    };
  };

  // Current time indicator
  const currentTimePosition = ((currentHour + currentMinute / 60) - 6) * 60; // Adjust for 6 AM start

  // Scroll to 6 AM on load
  const calendarRef = useRef(null);
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollTop = 0; // Scroll to 6 AM initially
    }
  }, []);

  return (
    <div className="container-fluid p-0 position-relative">
      <div className="d-flex border" style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', width: '100%' }}>
        {/* Scrollable container */}
        <div ref={calendarRef} className="d-flex position-relative"
             style={{ overflowY: 'auto', maxHeight: '80vh', width: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          
          {/* Time Column */}
          <div className="time-column border-end" style={{ width: '60px', minWidth: '60px', flexShrink: 0 }}>
            <div className="text-muted p-2 border-bottom d-flex align-items-center justify-content-center"
                 style={{ height: '50px', fontSize: '12px' }}>
              GMT+5:30
            </div>
            {timeSlots.map((time, i) => (
              <div key={i} className="time-slot d-flex align-items-start text-muted px-2"
                   style={{ height: '60px', fontSize: '12px' }}>
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          <div className="flex-grow-1 position-relative" style={{ width: '100%' }}>
            {/* Days Header */}
            <div className="d-flex" style={{ position: 'sticky', top: 0, zIndex: 3, backgroundColor: '#ffffff' }}>
              {days.map((day, index) => (
                <div key={day} className={`flex-grow-1 border-end ${index === currentDay ? 'bg-primary bg-opacity-10' : ''}`}
                     style={{ minWidth: '80px', width: '80px' }}>
                  <div className="border-bottom p-2 text-center" style={{ height: '50px' }}>
                    <div className="fw-bold">{day} {new Date(now.setDate(now.getDate() - currentDay + index)).getDate()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid & Events */}
            <div className="d-flex position-relative">
              {days.map((day, index) => (
                <div key={day} className={`flex-grow-1 position-relative border-end ${index === currentDay ? 'bg-primary bg-opacity-10' : ''}`}
                     style={{ minWidth: '100px', width: '100px' }}>
                  
                  {/* Time Grid */}
                  {timeSlots.map((_, i) => (
                    <div key={i} className="border-bottom" style={{ height: '60px' }}></div>
                  ))}

                  {/* Events */}
                  {events.filter(event => event.day === index).map((event, eventIndex) => (
                    <div key={eventIndex} className="event" style={getEventStyle(event)}>
                      <div className="fw-bold text-truncate">{event.title}</div>
                      <div className="text-truncate">
                        {`${event.startHour}:${event.startMinute.toString().padStart(2, '0')} - 
                          ${event.endHour}:${event.endMinute.toString().padStart(2, '0')}`}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Current Time Indicator */}
            {currentHour >= 6 && currentHour <= 29 && (
              <div className="position-absolute w-100 d-flex align-items-center"
                   style={{ top: `${currentTimePosition}px`, height: '3px', backgroundColor: '#1a1aff', zIndex: 2 }}>
                <div className="position-absolute text-white px-2 py-1 rounded-pill fw-bold"
                     style={{ left: '0px', backgroundColor: '#1a1aff', fontSize: '12px' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;