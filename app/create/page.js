'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import CreateEvent from '../../components/CreateEvent';


export default function Create() {
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
          <h1 className="h2 mb-2 font-inter fw-bold">Create Event</h1>
          <p className="text-muted ">
            Stay on track with this upcoming/past session.
          </p>
        </div>

        {/* Create Event Section */}
        <div className="d-flex gap-3 w-100" >
          <div className="shadow-sm ">
            <CreateEvent />
          </div>
        </div>
      </div>
    </div>
  );
}