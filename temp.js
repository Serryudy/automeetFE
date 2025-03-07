'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import MeetingCard from '@/components/MeetingCard';
import { FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';

export default function Meeting() {
  return (
    <div className="d-flex page-background" style={{ minHeight: '100vh', background: '#f0f0f0' }}>  
      {/* Sidebar - white background card */}
      <div style={{ position: 'fixed', left: 10, top: 10, bottom: 0, zIndex: 1000 }}>
        <SidebarMenu />
      </div>
      
      {/* Main content area */}
      <div className="flex-grow-1" style={{ 
        marginLeft: '360px', 
        padding: '20px', 
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Colorful background shapes */}
        <div className="position-absolute" style={{ 
          top: 0, 
          right: 0, 
          bottom: 0, 
          left: 0, 
          zIndex: -1, 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '15%', 
            right: '-10%', 
            width: '70%', 
            height: '90%', 
            background: '#FFD700', 
            transform: 'rotate(-15deg)', 
            zIndex: -1 
          }}></div>
          <div style={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '30%', 
            width: '50%', 
            height: '60%', 
            background: '#1E90FF', 
            transform: 'rotate(-15deg)', 
            zIndex: -2 
          }}></div>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '20%', 
            width: '20%', 
            height: '30%', 
            background: '#32CD32', 
            transform: 'rotate(-15deg)', 
            zIndex: -3 
          }}></div>
        </div>
        
        {/* Header area with profile */}
        <div className="d-flex justify-content-end mb-4">
          <ProfileHeader />
        </div>
        
        {/* Meetings header */}
        <div className="mb-4">
          <h1 className="h2 mb-1 font-inter fw-bold">Meetings</h1>
          <p className="text-muted">
            Stay on track with this upcoming/past session.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="position-relative flex-grow-1 me-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-start-0" 
                placeholder="Try searching anything related to the meeting"
                style={{ borderRadius: "0 20px 20px 0" }}
              />
            </div>
          </div>
          
          <button className="btn btn-light rounded-pill d-flex align-items-center gap-2">
            Filter <FaFilter />
          </button>
        </div>
        
        {/* Meeting tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Ongoing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Upcoming</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Unconfirmed</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Past</a>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link d-flex align-items-center" href="#">
                Date range <FaCalendarAlt className="ms-2" />
              </a>
            </li>
          </ul>
        </div>
        
        {/* Meeting cards */}
        <div className="d-flex flex-wrap gap-4">
          <MeetingCard />
          <MeetingCard />
          <MeetingCard />
        </div>
      </div>
    </div>
  );
}