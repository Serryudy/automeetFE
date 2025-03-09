'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import SidebarMenu from '../../components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import MeetingCard from '@/components/MeetingCard';
import { FaSearch, FaFilter, FaCalendarAlt, FaBars } from 'react-icons/fa';

export default function Meeting() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
      
      // Dynamically adjust cards per row based on screen size and sidebar state
      if (width < 576) {
        setCardsPerRow(1); // Mobile: 1 card per row
      } else if (width < 992) {
        setCardsPerRow(2); // Tablet: 2 cards per row
      } else if (width < 1400 || isSidebarCollapsed) {
        setCardsPerRow(3); // Desktop: 3 cards per row
      } else {
        setCardsPerRow(3); // Large desktop: 3 cards per row
      }
      
      if (width >= 768) setShowMobileMenu(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  // Update cards per row when sidebar collapses
  useEffect(() => {
    const width = windowWidth;
    if (width >= 992 && width < 1400) {
      // Adjust cards only in desktop range
      setCardsPerRow(isSidebarCollapsed ? 3 : 2);
    }
  }, [isSidebarCollapsed, windowWidth]);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="d-flex page-background font-inter" style={{ minHeight: '100vh' }}>  
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="btn btn-light position-fixed rounded-circle p-2"
          style={{ zIndex: 1001, top: '1rem', left: '1rem' }}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar Menu */}
      <div 
        style={{ 
          position: 'fixed', 
          left: 10, 
          top: 10, 
          bottom: 0, 
          zIndex: 1000,
          transform: isMobile ? `translateX(${showMobileMenu ? '0' : '-100%'})` : 'none',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <SidebarMenu 
          showmenuicon={true} 
          onToggle={handleSidebarToggle}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobile && showMobileMenu && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 999,
            transition: 'opacity 0.3s'
          }}
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
      
      {/* Main content */}
      <div 
        className="flex-grow-1 p-3 p-md-4"
        style={{
          marginLeft: isMobile ? 0 : (isSidebarCollapsed ? '90px' : '340px'),
          maxWidth: isMobile ? '100%' : (isSidebarCollapsed ? 'calc(100% - 120px)' : 'calc(100% - 360px)'),
          transition: 'margin-left 0.3s ease-in-out, max-width 0.3s ease-in-out'
        }}
      >
        {/* Profile Header */}
        <div className="mb-3 mb-md-4">
          <ProfileHeader />
        </div>

        {/* Page Header */}
        <div className="mb-3 mb-md-4">
          <h1 className="h3 h2-md mb-1 mb-md-2 font-inter fw-bold">Meetings</h1>
          <p className="text-muted small">
            Stay on track with this upcoming/past session.
          </p>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-4 gap-2">
          <div className="position-relative w-100">
            <div className="input-group bg-white rounded-pill" style={{ height: windowWidth < 576 ? '40px' : '48px', border: '2px solid #ccc' }}>
              <span className="input-group-text bg-transparent border-0">
                <FaSearch className="text-muted" />
              </span>
              <input 
                type="text" 
                className="form-control border-0" 
                placeholder={windowWidth < 576 ? "Search meetings..." : "Try searching anything related to the meeting"}
              />
              <button className="btn btn-light rounded-pill d-flex align-items-center gap-2 px-2 px-md-3">
                {windowWidth < 576 ? <FaFilter /> : <>Filter <FaFilter /></>}
              </button>
            </div>
          </div>
        </div>

        {/* Meeting tabs */}
        <div className='w-100 d-flex flex-column bg-white py-2 py-md-3 rounded-3 rounded-md-4 shadow-sm'>
          <div className="border-bottom border-1 border-dark px-2 px-md-4 overflow-auto">
            <ul className="list-unstyled d-flex gap-3 gap-md-4 mb-0 flex-nowrap">
              {["ongoing", "upcoming", "unconfirmed", "past"].map((tab) => (
                <li key={tab}>
                  <div
                    className={`text-black fw-semibold pb-2 pb-md-3 text-nowrap ${activeTab === tab ? "border-bottom border-3 border-primary" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    style={{ cursor: "pointer", fontSize: windowWidth < 576 ? '0.875rem' : '1rem' }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </div>
                </li>
              ))}
              <li className="ms-auto">
                <div className="d-flex align-items-center text-black text-nowrap" style={{ fontSize: windowWidth < 576 ? '0.875rem' : '1rem' }}>
                  {windowWidth >= 576 ? 'Date range ' : ''}<FaCalendarAlt className={windowWidth >= 576 ? 'ms-2' : ''} />
                </div>
              </li>
            </ul>
          </div>
          
          <div className="px-2 px-md-4 py-3">
            {/* Dynamic grid based on calculated cards per row */}
            <div className="row g-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className={`col-12 ${
                    cardsPerRow === 1 ? '' : 
                    cardsPerRow === 2 ? 'col-sm-6' : 
                    'col-sm-6 col-lg-4'
                  }`}
                  style={{
                    transition: 'width 0.3s ease-in-out'
                  }}
                >
                  <div 
                    style={{ 
                      height: '100%',
                      maxWidth: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    <MeetingCard />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}