'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import SidebarMenuExternal from '@/components/SideMenuExternal';
import ProfileHeader from '@/components/profileHeader';
import Calendar from '@/components/calendar';
import { FaEdit, FaCalendarAlt, FaChevronDown, FaSearch, FaFilter, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';

const MeetingForm = () => {
  const [title, setTitle] = useState('John Doe');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [repeat, setRepeat] = useState('Does not repeat');
  const [status, setStatus] = useState('Confirmed');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeError, setTimeError] = useState('');
  const [participants, setParticipants] = useState([
  { id: 1, name: 'John_doe', group: 'Group name if any' }
  ]);
  const [searchContact, setSearchContact] = useState('');
  const [hosts, setHosts] = useState([
  { id: 1, name: 'organizer_user', group: 'Organizers' }
  ]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isMobile, setIsMobile] = useState(false);

  // Track window width for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Refs for detecting clicks outside the dropdown
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const calendarRef = useRef(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const generateTimeOptions = () => {
    const times = [];
    let hour = 12;
    let period = "AM";

    for (let i = 0; i < 24; i++) {
        times.push(`${hour}:00 ${period}`);
        hour = hour === 12 ? 1 : hour + 1;
        if (hour === 12) period = period === "AM" ? "PM" : "AM";
    }
    return times;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (startTimeRef.current && !startTimeRef.current.contains(event.target)) {
          setShowStartTime(false);
        }
        if (endTimeRef.current && !endTimeRef.current.contains(event.target)) {
          setShowEndTime(false);
        }
        if (calendarRef.current && !calendarRef.current.contains(event.target) && 
            !event.target.closest('.calendar-toggle')) {
          setShowCalendar(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // CSS for disabled/greyed out elements
  const disabledStyle = {
    backgroundColor: "#f5f5f5",
    color: "#6c757d",
    cursor: "not-allowed",
    opacity: 0.7
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm bg-white rounded-3 p-3 p-md-4">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 flex-wrap gap-2">
            <h2 className="fw-bold mb-0 fs-4 fs-md-3">Meeting name</h2>
            {/* Edit button removed */}
          </div>

          <div className="mb-3 mb-md-4">
            <p className="mb-1 fw-bold">Status</p>
            <span className="badge bg-secondary px-3 py-2">Confirmed</span>
          </div>

          <div className="mb-3 mb-md-4">
            <label htmlFor="title" className="form-label text-muted">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={true}
              style={disabledStyle}
            />
          </div>

          <div className="mb-3 mb-md-4">
              <label className="form-label text-muted">Date & Time Range</label>
              <div className="p-2 bg-light rounded">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                  {/* Date Picker */}
                  <div
                      className="d-flex align-items-center py-2 px-3 rounded calendar-toggle"
                      style={{ 
                      minWidth: isMobile ? "100%" : "190px",
                      maxWidth: "250px",
                      flex: "1 1 auto",
                      ...disabledStyle
                      }}
                  >
                      <div className="text-center flex-grow-1 text-truncate">
                      {selectedDate ? selectedDate.toDateString() : "Select Date"}
                      </div>
                      <div className="ms-2">
                      <FaCalendarAlt />
                      </div>
                  </div>

                  {/* Start Time Input */}
                  <div 
                      className="position-relative" 
                      ref={startTimeRef} 
                      style={{ 
                        flex: "1 1 120px", 
                        maxWidth: isMobile ? "100%" : "150px",
                        width: isMobile ? "100%" : "auto"
                      }}
                  >
                      <input
                      type="text"
                      className="form-control rounded"
                      placeholder="HH:MM AM/PM"
                      value={startTime}
                      readOnly={true}
                      style={disabledStyle}
                      />
                  </div>

                  {/* End Time Input */}
                  <div 
                      className="position-relative" 
                      ref={endTimeRef} 
                      style={{ 
                        flex: "1 1 120px", 
                        maxWidth: isMobile ? "100%" : "150px",
                        width: isMobile ? "100%" : "auto"
                      }}
                  >
                      <input
                      type="text"
                      className="form-control rounded"
                      placeholder="HH:MM AM/PM"
                      value={endTime}
                      readOnly={true}
                      style={disabledStyle}
                      />
                  </div>

                  {/* Add Button (disabled) */}
                  <button
                      type="button"
                      className="btn btn-secondary d-flex align-items-center justify-content-center"
                      style={{
                      minWidth: "40px",
                      height: "38px",
                      flexShrink: 0,
                      ...disabledStyle
                      }}
                      disabled={true}
                  >
                      <FaCheckCircle />
                  </button>
                  </div>

                  {/* Added Time Slots */}
                  {timeSlots.length > 0 && (
                  <div className="mt-3">
                      <h6 className="text-muted mb-2">Added Time Slots</h6>
                      <div className="d-flex flex-wrap gap-2">
                      {timeSlots.map((slot) => (
                          <div 
                          key={slot.id} 
                          className="badge bg-light text-muted d-flex align-items-center gap-2 p-2"
                          style={disabledStyle}
                          >
                          {slot.start} - {slot.end}
                          </div>
                      ))}
                      </div>
                  </div>
                  )}
              </div>
          </div>

          <div className="mb-3 mb-md-4">
              <label htmlFor="participants" className="form-label text-muted">Participants</label>
              
              <div className="mb-3 position-relative">
              <div className="input-group">
                  <span className="input-group-text" style={disabledStyle}>
                  <FaSearch />
                  </span>
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Search by contact"
                  value={searchContact}
                  readOnly={true}
                  style={disabledStyle}
                  />
                  <span className="input-group-text" style={disabledStyle}>
                  <FaChevronDown />
                  </span>
              </div>
              </div>

              {participants.map((participant) => (
              <div key={participant.id} className="d-flex flex-column flex-md-row bg-light p-2 p-md-3 rounded mb-2" style={disabledStyle}>
                  <div className="d-flex align-items-center mb-2 mb-md-0 me-auto">
                    <img 
                        src="/profile.png" 
                        alt="participant" 
                        className="rounded-circle me-2 me-md-3"
                        style={{width: isMobile ? '30px' : '40px', height: isMobile ? '30px' : '40px', opacity: 0.7}}
                    />
                    <div>
                        <div className="fw-bold text-muted">{participant.name}</div>
                        <small className="text-muted">{participant.group}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center mt-2 mt-md-0">
                    <div className="form-check form-switch me-3">
                      <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="accessSwitch"
                          disabled={true}
                      />
                      <label className="form-check-label text-muted" htmlFor="accessSwitch">
                          Give access
                      </label>
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary btn-sm"
                      disabled={true}
                      style={disabledStyle}
                    >
                      Remove
                    </button>
                  </div>
              </div>
              ))}
          </div>

          <div className="mb-3 mb-md-4">
            <label htmlFor="description" className="form-label text-muted">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="A short description for the meeting"
              value={description}
              readOnly={true}
              style={disabledStyle}
            ></textarea>
          </div>

          <div className="mb-3 mb-md-4">
            <label htmlFor="location" className="form-label text-muted">Location</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Chose a place for the meeting"
                value={location}
                readOnly={true}
                style={disabledStyle}
              />
              <button className="btn btn-outline-secondary" type="button" disabled={true} style={disabledStyle}>
                <FaChevronDown />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="repeat" className="form-label text-muted">Repeat</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Does not repeat"
                value={repeat}
                readOnly={true}
                style={disabledStyle}
              />
              <button className="btn btn-outline-secondary" type="button" disabled={true} style={disabledStyle}>
                <FaChevronDown />
              </button>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Link href={'/content'}><button className="btn btn-secondary me-2" style={disabledStyle} disabled={true}>Upload</button></Link>
            <Link href={'/notes'}><button className="btn btn-secondary" style={disabledStyle} disabled={true}>Take notes</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Details() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowMobileMenu(false);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="d-flex page-background font-inter" style={{ minHeight: '100vh' }}>  
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="btn btn-primary position-fixed d-flex align-items-center justify-content-center" 
          style={{ top: '10px', left: '10px', zIndex: 1100, width: '40px', height: '40px' }}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      )}
      
      {/* Sidebar */}
      <div style={{ 
        position: 'fixed', 
        left: 10, 
        top: 10, 
        bottom: 0, 
        zIndex: 1000,
        display: isMobile ? (showMobileMenu ? 'block' : 'none') : 'block'
      }}>
        <SidebarMenuExternal
          showmenuicon={true} 
          onToggle={handleSidebarToggle}
        />
      </div>
      
      {/* Mobile Overlay */}
      {isMobile && showMobileMenu && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
          style={{ zIndex: 999 }}
          onClick={() => setShowMobileMenu(false)}
        >
        </div>
      )}
      
      {/* Main content */}
      <div 
        className="flex-grow-1 p-3 p-md-4" 
        style={{
          marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '90px' : '340px'),
          maxWidth: isMobile ? '100%' : (isSidebarCollapsed ? 'calc(100% - 120px)' : 'calc(100% - 360px)'),
          transition: 'margin-left 0.3s ease-in-out, max-width 0.3s ease-in-out',
          paddingTop: isMobile ? '60px' : '0'
        }}
      >
        {/* Profile Header */}
        <div className="mb-3 mb-md-4">
          <ProfileHeader />
        </div>

        {/* Calendar Header */}
        <div className="mb-3 mb-md-4">
          <h1 className="h3 h2-md mb-1 mb-md-2 font-inter fw-bold">Meeting Details</h1>
          <p className="text-muted small">
            Dive into the details and make every meeting count.
          </p>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
            <div className="position-relative flex-grow-1 me-3">
                <div className="input-group bg-white rounded-pill" style={{ height: isMobile ? '40px' : '48px', border: '2px solid #ccc' }}>
                    <span className="input-group-text bg-transparent border-0">
                        <FaSearch className="text-muted" />
                    </span>
                    <input 
                    type="text" 
                    className="form-control border-0"
                    placeholder={isMobile ? "Search..." : "Try searching anything related to the meeting"}
                    />
                    <button className="btn btn-light rounded-pill d-flex align-items-center gap-2">
                        {isMobile ? <FaFilter /> : <>Filter <FaFilter /></>}
                    </button>
                </div>
            </div>
        </div>
        
        <div>
            <MeetingForm />
        </div>
      </div>
    </div>
  );
}