'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import MeetingCard from '@/components/MeetingCard';
import { FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { useState } from "react";

export default function Meeting() {
    const [activeTab, setActiveTab] = useState("ongoing");
    return (
        <div className="d-flex page-background " style={{ minHeight: '100vh' }}>  
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
          <h1 className="h2 mb-1 font-inter fw-bold">Meetings</h1>
          <p className="text-muted">
            Stay on track with this upcoming/past session.
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
        {/* Meeting tabs */}
        <div className='w-100 d-flex flex-column bg-white py-3 rounded-4'>
            <div className="border-bottom border-1 border-dark px-4">
                <ul className="list-unstyled d-flex gap-4 mb-0">
                {["ongoing", "upcoming", "unconfirmed", "past"].map((tab) => (
                    <li className="" key={tab}>
                    <div
                        className={`text-black fw-semibold pb-3 ${activeTab === tab ? "border-bottom border-3 border-primary" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        style={{ cursor: "pointer"}}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                    </li>
                ))}
                <li className="nav-item ms-auto">
                    <div className="nav-link d-flex align-items-center text-black">
                    Date range <FaCalendarAlt className="ms-2" />
                    </div>
                </li>
                </ul>
            </div>
            <div className="d-flex flex-wrap gap-5 justify-content-start px-4 py-3">
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
            </div>
        </div>

      </div>
    </div>
    );
}