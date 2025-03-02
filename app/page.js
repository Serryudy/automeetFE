'use client'
import React, { useState, useEffect } from 'react'
import SidebarMenu from '../components/SideMenucollapse'
import WeeklyCalendar from '../components/WeeklyCalendar'
import ProfileHeader from '@/components/profileHeader'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const CalendarPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showEventCards, setShowEventCards] = useState(false)

  // Handle sidebar state change
  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed)
    
    // Add a slight delay before showing/hiding event cards
    if (collapsed) {
      setTimeout(() => setShowEventCards(true), 150)
    } else {
      setShowEventCards(false)
    }
  }

  const eventData = [
    { title: 'Basic terms Meeting', days: 'Tue, Sat', location: 'Zoom - http://sortenedurl.com', color: '#ff8585' },
    { title: 'Featureless abs meeting', days: 'Wed, Thu', location: 'Main conference hall', color: '#fff585' },
    { title: 'Featureless abs meeting', days: 'Tue, Wed, Sat', location: 'Grand aven... http://maps.com', color: '#85ceff' }
  ]

  return (
    <div className="d-flex page-background" style={{ minHeight: '100vh' }}>
      {/* Sidebar Menu */}
      <div style={{ position: 'fixed', left: 10, top: 10, bottom: 0, zIndex: 1000 }}>
        <SidebarMenu 
          showmenuicon={true} 
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: isSidebarCollapsed ? '90px' : '340px',
          maxWidth: isSidebarCollapsed ? 'calc(100% - 120px)' : 'calc(100% - 360px)',
          transition: 'margin-left 0.3s ease-in-out, max-width 0.3s ease-in-out'
        }}
      >
        {/* Profile Header */}
        <div>
          <ProfileHeader />
        </div>

        {/* Calendar Header */}
        <div className="mb-4">
          <h1 className="h2 mb-2 font-inter fw-semibold fs-1">Calendar</h1>
          <p className="text-muted">
            Stay ahead of your schedule and make every moment<br /> count with your weekly planner.
          </p>
        </div>

        {/* Calendar Section */}
        <div className="d-flex gap-3 w-100" style={{ flexWrap: 'wrap' }}>
          {/* Weekly Calendar */}
          <div
            className="bg-white rounded shadow-sm"
            style={{
              flex: '1 1 60%',
              minWidth: isSidebarCollapsed ? '600px' : '950px',
              maxWidth: isSidebarCollapsed ? '65%' : '800px',
              transition: 'min-width 0.3s ease-in-out, max-width 0.3s ease-in-out'
            }}
          >
            <WeeklyCalendar />
          </div>

          {/* Event Description Cards (with animation) */}
          <div
            className="d-flex flex-column"
            style={{
              flex: '1 1 30%',
              minWidth: '250px',
              maxWidth: '350px',
              gap: '20px',
              backgroundColor: '#ffffff',
              padding: '21px 17px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              opacity: showEventCards ? 1 : 0,
              transform: showEventCards ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
              visibility: showEventCards ? 'visible' : 'hidden',
              height: showEventCards ? 'auto' : '0',
              overflow: showEventCards ? 'visible' : 'hidden'
            }}
          >
            <span style={{ fontSize: 'clamp(16px, 2vw, 21px)', fontWeight: 'normal', color: '#000' }}>
              Event description
            </span>

            {eventData.map((event, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '7px',
                  backgroundColor: event.color,
                  padding: '8px',
                  borderRadius: '6px'
                }}
              >
                <span style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', fontWeight: '600', color: '#000' }}>
                  {event.title}
                </span>
                <span style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', fontWeight: '600', color: '#000' }}>{event.days}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                  <span style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', fontWeight: '600', color: '#000' }}>Location</span>
                  <img src="/location-icon.png" alt="Location Icon" style={{ width: '10px', height: '10px', objectFit: 'cover' }} />
                  <span style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', color: '#000' }}>{event.location}</span>
                </div>
                <span style={{ fontSize: 'clamp(8px, 1vw, 10px)', fontWeight: '600', color: '#000' }}>
                  This meeting is about this thing where these things will be discussed. This meeting is this
                  much relevant to you.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage