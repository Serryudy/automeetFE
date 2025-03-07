'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';

export default function Meeting() {
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
          <h1 className="h2 mb-2 font-inter fw-semibold fs-1">Mark Your Availability</h1>
          <p className="text-muted">
          Stay ahead of your schedule and make every moment <br />
          count with your weekly planner.
          </p>
        </div>

        {/* Create Event Section */}
        <div className="d-flex gap-3 w-100" >
          <div className="shadow-sm ">
            
          </div>
        </div>
      </div>
    </div>
    );
}