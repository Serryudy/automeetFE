'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import Calendar from '@/components/calendar';
import { FaEdit, FaCalendarAlt, FaChevronDown, FaSearch, FaFilter, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';

const MeetingForm = ({ windowWidth }) => {
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
        const [isEditing, setIsEditing] = useState(false);
      
        const removeParticipant = (id) => {
          setParticipants(participants.filter(participant => participant.id !== id));
        };
    
        
        
        // Refs for detecting clicks outside the dropdown
        const startTimeRef = useRef(null);
        const endTimeRef = useRef(null);
    
        const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
        };
    
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
    
        // Time validation function
        const validateTimeFormat = (time) => {
        const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/i;
        return timeRegex.test(time);
        };
    
        // Convert time to 24-hour format for comparison
        const convertTo24HourFormat = (time) => {
        const [timePart, period] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        
        hours = parseInt(hours);
        minutes = parseInt(minutes);
    
        if (period.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12;
        }
        if (period.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }
    
        return hours * 60 + minutes;
        };
    
        const handleAddTimeSlot = () => {
        setTimeError('');
    
        if (!validateTimeFormat(startTime)) {
            setTimeError('Invalid start time format. Use HH:MM AM/PM');
            return;
        }
    
        if (!validateTimeFormat(endTime)) {
            setTimeError('Invalid end time format. Use HH:MM AM/PM');
            return;
        }
    
        const startMinutes = convertTo24HourFormat(startTime);
        const endMinutes = convertTo24HourFormat(endTime);
    
        if (endMinutes <= startMinutes) {
            setTimeError('End time must be later than start time');
            return;
        }
    
        const newTimeSlot = {
            id: Date.now(),
            start: startTime,
            end: endTime
        };
    
        const isDuplicate = timeSlots.some(
            slot => slot.start === newTimeSlot.start && slot.end === newTimeSlot.end
        );
    
        if (isDuplicate) {
            setTimeError('This time slot has already been added');
            return;
        }
    
        setTimeSlots([...timeSlots, newTimeSlot]);
        };
    
        const handleRemoveTimeSlot = (id) => {
        setTimeSlots(timeSlots.filter(slot => slot.id !== id));
        };
    
        const handleTimeSelect = (time, type) => {
        if (type === "start") {
            setStartTime(time);
            setShowStartTime(false);
        } else if (type === "end") {
            setEndTime(time);
            setShowEndTime(false);
        }
        };
    
        const handleTimeChange = (value, type) => {
        if (type === "start") {
            setStartTime(value);
        } else {
            setEndTime(value);
        }
        };
    
        const handleDoubleClick = (type) => {
        if (type === "start") {
            setShowStartTime(true);
        } else if (type === "end") {
            setShowEndTime(true);
        }
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
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

    return (
      <div className="container mt-2 mt-md-4">
        <div className="card shadow-sm bg-white rounded-4 p-2 p-md-4">
          <div className="card-body p-2 p-md-4">
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
              <h2 className="h4 h2-md fw-bold mb-0">Meeting name</h2>
              <button 
                className="btn btn-secondary d-flex align-items-center py-1 py-md-2 px-2 px-md-3"
                onClick={() => setIsEditing(!isEditing)}
                >
                <FaEdit className="me-1 me-md-2" /> 
                <span className="d-none d-md-block">{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {/* Responsive Status Badge */}
            <div className="mb-3 mb-md-4">
              <p className="mb-1 fw-bold">Status</p>
              <span className="badge bg-primary px-2 px-md-3 py-1 py-md-2">Confirmed</span>
            </div>

            {/* Form Sections */}
            <div className="row g-3 g-md-4">
              <div className="col-12">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly={!isEditing}
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Date & Time Section */}
              <div className="col-12">
                <label className="form-label">Date & Time Range</label>
                <div className="p-2 bg-light rounded">
                  <div className="row g-2 align-items-center">
                    {/* Date Picker */}
                    <div className="col-12 col-md-4">
                      <div
                        className="d-flex align-items-center bg-white py-1 py-md-2 px-2 px-md-3 rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        <div className="text-center flex-grow-1 small small-md">
                          {selectedDate ? selectedDate.toDateString() : "Select Date"}
                        </div>
                        <FaCalendarAlt className="ms-2" />
                      </div>
                    </div>

                    {/* Time Inputs */}
                    <div className="col-12 col-md-8">
                      <div className="row g-2">
                        {/* Start Time */}
                        <div className="col-6 col-md-5 position-relative" ref={startTimeRef}>
                          <input
                            type="text"
                            className="form-control bg-white py-1 py-md-2 px-2 px-md-3 rounded"
                            readOnly={!isEditing}
                            placeholder="HH:MM AM/PM"
                            value={startTime}
                            onChange={(e) => handleTimeChange(e.target.value, "start")}
                            onDoubleClick={() => handleDoubleClick("start")}
                          />
                          {/* Time dropdown */}
                        </div>

                        {/* End Time */}
                        <div className="col-6 col-md-5 position-relative" ref={endTimeRef}>
                          <input
                            type="text"
                            className="form-control bg-white py-1 py-md-2 px-2 px-md-3 rounded"
                            readOnly={!isEditing}
                            placeholder="HH:MM AM/PM"
                            value={endTime}
                            onChange={(e) => handleTimeChange(e.target.value, "end")}
                            onDoubleClick={() => handleDoubleClick("end")}
                          />
                          {/* Time dropdown */}
                        </div>

                        {/* Add Button */}
                        <div className="col-12 col-md-2">
                          <button
                            type="button"
                            className="btn btn-primary w-100 d-flex justify-content-center align-items-center py-2"
                            onClick={handleAddTimeSlot}
                          >
                            <FaCheckCircle />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className={`position-absolute ${windowWidth < 768 ? 'start-0' : ''} mt-2 shadow rounded`} style={{ zIndex: 10 }}>
                      <Calendar onChange={handleDateSelect} value={selectedDate} />
                    </div>
                  )}

                  {/* ... rest of time slot components */}
                </div>
              </div>

              {/* Participants Section */}
              <div className="col-12">
                <label htmlFor="participants" className="form-label">Add participants</label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by contact"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />
                  <span className="input-group-text bg-white">
                    <FaChevronDown />
                  </span>
                </div>

                {participants.map((participant) => (
                  <div key={participant.id} className="d-flex flex-column flex-md-row align-items-center bg-light p-2 p-md-3 rounded mb-2">
                    <div className="d-flex align-items-center me-md-auto mb-2 mb-md-0">
                      <img 
                        src="/profile.png" 
                        alt="participant" 
                        className="rounded-circle me-2"
                        style={{width: '40px', height: '40px'}}
                      />
                      <div>
                        <div className="fw-bold">{participant.name}</div>
                        <small className="text-muted">{participant.group}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="accessSwitch"
                        />
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-outline-danger flex-grow-1 flex-md-grow-0"
                        onClick={() => removeParticipant(participant.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Other form sections */}
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="A short description for the meeting"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="col-12">
                <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 mt-3 mt-md-4">
                  <Link href={'/content'} className="w-100 w-md-auto">
                    <button className="btn btn-primary w-100">Upload</button>
                  </Link>
                  <Link href={'/notes'} className="w-100 w-md-auto">
                    <button className="btn btn-primary w-100">Take notes</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default function Details() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="d-flex page-background font-inter" style={{ minHeight: '100vh' }}>  
      <div style={{ position: 'fixed', left: 10, top: 10, bottom: 0, zIndex: 1000 }}>
        <SidebarMenu 
          showmenuicon={true} 
          onToggle={handleSidebarToggle}
        />
      </div>
      
      <div 
        className="flex-grow-1 p-3 p-md-4"
        style={{
          marginLeft: isSidebarCollapsed ? '90px' : '340px',
          maxWidth: isSidebarCollapsed ? 'calc(100% - 120px)' : 'calc(100% - 360px)',
          transition: 'margin-left 0.3s ease-in-out, max-width 0.3s ease-in-out'
        }}
      >
        <ProfileHeader />

        <div className="mb-3 mb-md-4">
          <h1 className="h3 h2-md fw-bold mb-1 mb-md-2">Meeting Details</h1>
          <p className="text-muted small">
            Dive into the details and make every meeting count.
          </p>
        </div>

        <div className="mb-3 mb-md-4">
          <div className="input-group bg-white rounded-pill" style={{ height: '48px', border: '2px solid #ccc' }}>
            <span className="input-group-text bg-transparent border-0">
              <FaSearch className="text-muted" />
            </span>
            <input 
              type="text" 
              className="form-control border-0"
              placeholder="Try searching anything related to the meeting"
            />
            <button className="btn btn-light rounded-pill d-flex align-items-center gap-2">
              Filter <FaFilter />
            </button>
          </div>
        </div>

        <MeetingForm windowWidth={windowWidth} />
      </div>
    </div>
  );
}