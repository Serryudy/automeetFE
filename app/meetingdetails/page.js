'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import Calendar from '@/components/calendar';
import { FaEdit, FaCalendarAlt, FaChevronDown, FaSearch, FaFilter, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react'

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
      <div className="container mt-4">
        <div className="card shadow-sm bg-white rounded-4 p-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Meeting name</h2>
              <button 
                className="btn btn-secondary d-flex align-items-center"
                onClick={() => setIsEditing(!isEditing)}
                >
                <FaEdit className="me-2" /> {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
  
            <div className="mb-4">
              <p className="mb-1 fw-bold">Status</p>
              <span className="badge bg-primary px-3 py-2">Confirmed</span>
            </div>
  
            <div className="mb-4">
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
  
            <div className="mb-4">
                <label className="form-label">Date & Time Range</label>
                <div className="p-2 bg-light rounded" style={{width:"fit-content"}}>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* Date Picker */}
                    <div
                        className="d-flex align-items-center bg-white py-2 px-3 rounded"
                        style={{ 
                        cursor: "pointer", 
                        minWidth: "190px",
                        maxWidth: "250px",
                        flex: "1 1 auto" 
                        }}
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <div className="text-center flex-grow-1">
                        {selectedDate ? selectedDate.toDateString() : "Select Date"}
                        </div>
                        <div className="ms-2">
                        <FaCalendarAlt />
                        </div>
                    </div>

                    {/* Calendar Popup */}
                    {showCalendar && (
                        <div
                        className="position-absolute shadow rounded"
                        style={{ top: "350px", left: "30px", zIndex: 10 }}
                        >
                        <Calendar onChange={handleDateSelect} value={selectedDate} />
                        </div>
                    )}

                    {/* Start Time Input */}
                    <div 
                        className="position-relative" 
                        ref={startTimeRef} 
                        style={{ flex: "1 1 120px", maxWidth: "150px" }}
                    >
                        <input
                        type="text"
                        className="form-control bg-white py-2 px-3 rounded"
                        readOnly={!isEditing}
                        style={{ width: "100%", cursor: "pointer" }}
                        placeholder="HH:MM AM/PM"
                        value={startTime}
                        onChange={(e) => handleTimeChange(e.target.value, "start")}
                        onDoubleClick={() => handleDoubleClick("start")}
                        />
                        {showStartTime && (
                        <div
                            className="position-absolute bg-white shadow p-3 rounded mt-1"
                            style={{ 
                            top: "100%", 
                            left: "0", 
                            zIndex: 10, 
                            maxHeight: "150px", 
                            overflowY: "auto" 
                            }}
                        >
                            {generateTimeOptions().map((time, index) => (
                            <div
                                key={index}
                                className="py-2 px-3 hover-bg-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleTimeSelect(time, "start")}
                            >
                                {time}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>

                    {/* End Time Input */}
                    <div 
                        className="position-relative" 
                        ref={endTimeRef} 
                        style={{ flex: "1 1 120px", maxWidth: "150px" }}
                    >
                        <input
                        type="text"
                        className="form-control bg-white py-2 px-3 rounded"
                        readOnly={!isEditing}
                        style={{ width: "100%", cursor: "pointer" }}
                        placeholder="HH:MM AM/PM"
                        value={endTime}
                        onChange={(e) => handleTimeChange(e.target.value, "end")}
                        onDoubleClick={() => handleDoubleClick("end")}
                        />
                        {showEndTime && (
                        <div
                            className="position-absolute bg-white shadow p-3 rounded mt-1"
                            style={{ 
                            top: "100%", 
                            left: "0", 
                            zIndex: 10, 
                            maxHeight: "150px", 
                            overflowY: "auto" 
                            }}
                        >
                            {generateTimeOptions().map((time, index) => (
                            <div
                                key={index}
                                className="py-2 px-3 hover-bg-light"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleTimeSelect(time, "end")}
                            >
                                {time}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>

                    {/* Add Button */}
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        style={{
                        minWidth: "40px",
                        height: "38px",
                        flexShrink: 0,
                        }}
                        onClick={handleAddTimeSlot}
                    >
                        <FaCheckCircle />
                    </button>
                    </div>

                    {/* Error Message */}
                    {timeError && (
                    <div className="text-danger mt-2 small">
                        {timeError}
                    </div>
                    )}

                    {/* Added Time Slots */}
                    {timeSlots.length > 0 && (
                    <div className="mt-3">
                        <h6 className="text-muted mb-2">Added Time Slots</h6>
                        <div className="d-flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                            <div 
                            key={slot.id} 
                            className="badge bg-white text-dark d-flex align-items-center gap-2 p-2"
                            >
                            {slot.start} - {slot.end}
                            <button 
                                type="button" 
                                className="btn btn-sm btn-outline-danger p-0 ms-2"
                                onClick={() => handleRemoveTimeSlot(slot.id)}
                                style={{ 
                                width: '20px', 
                                height: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                                }}
                            >
                                &times;
                            </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
  
            <div className="mb-4">
                <label htmlFor="participants" className="form-label">Add participants</label>
                
                <div className="mb-3 position-relative">
                <div className="input-group">
                    <span className="input-group-text bg-white">
                    <FaSearch />
                    </span>
                    <input
                    type="text"
                    className="form-control"
                    readOnly={!isEditing}
                    placeholder="Search by contact"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                    />
                    <span className="input-group-text bg-white">
                    <FaChevronDown />
                    </span>
                </div>
                </div>

                {participants.map((participant) => (
                <div 
                    key={participant.id} 
                    className="d-flex align-items-center bg-light p-3 rounded mb-2"
                >
                    <div className="me-auto d-flex align-items-center">
                    <img 
                        src="/profile.png" 
                        alt="participant" 
                        className="rounded-circle me-3"
                        style={{width: '40px', height: '40px'}}
                    />
                    <div>
                        <div className="fw-bold">{participant.name}</div>
                        <small className="text-muted">{participant.group}</small>
                    </div>
                    </div>
                    <div className="form-check form-switch me-3">
                    <input 
                        className="form-check-input" 
                        readOnly={!isEditing}
                        type="checkbox" 
                        id="accessSwitch"
                    />
                    <label className="form-check-label" htmlFor="accessSwitch">
                        Give access
                    </label>
                    </div>
                    <button 
                    type="button" 
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveParticipant(participant.id)}
                    >
                    Remove
                    </button>
                </div>
                ))}
            </div>
  
            <div className="mb-4">
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
  
            <div className="mb-4">
              <label htmlFor="location" className="form-label">Location</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  readOnly={!isEditing}
                  placeholder="Chose a place for the meeting"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <FaChevronDown />
                </button>
              </div>
            </div>
  
            <div className="mb-4">
              <label htmlFor="repeat" className="form-label">Repeat</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  readOnly={!isEditing}
                  placeholder="Does not repeat"
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <FaChevronDown />
                </button>
              </div>
            </div>
  
            <div className="d-flex mt-5">
              <button className="btn btn-primary me-2">Upload</button>
              <button className="btn btn-primary">Take notes</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default function Create() {
  return (
    <div className="d-flex page-background font-inter" style={{ minHeight: '100vh' }}>  
      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 10, top: 10, bottom: 0, zIndex: 1000 }}>
        <SidebarMenu />
      </div>
      
      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '340px', maxWidth: 'calc(100% - 360px)' }}>
        {/* Profile Header */}
        <div>
          <ProfileHeader />
        </div>

        {/* Calendar Header */}
        <div className="mb-4">
          <h1 className="h2 mb-2 font-inter fw-bold">Meeting Details</h1>
          <p className="text-muted ">
            Dive into the details and make every meeting count.
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="position-relative flex-grow-1 me-3">
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
        </div>
        <div >
            <MeetingForm />
        </div>

        
      </div>
    </div>
  );
}