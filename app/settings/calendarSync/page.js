'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import SidebarMenu from '@/components/SideMenucollapse';
import ProfileHeader from '@/components/profileHeader';
import { FaBars, FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function CalendarSync() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([
    { 
      id: 1, 
      provider: 'Google', 
      email: 'sampleemail@gmail.com', 
      logo: '/googleC.png' // Path to Google Calendar logo
    }
  ]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);

  // Provider logo mapping
  const providerLogos = {
    Google: '/googleC.png',
    Microsoft: '/microsoftC.png',
    Apple: '/appleC.png'
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowMobileMenu(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleRemoveAccount = (id) => {
    setConnectedAccounts(connectedAccounts.filter(account => account.id !== id));
    setToastMessage('Calendar account successfully removed');
    setShowToast(true);
  };

  const handleConnectAccount = (provider) => {
    // In a real application, this would initiate OAuth flow
    const newAccount = {
      id: Date.now(),
      provider,
      email: `user${Math.floor(Math.random() * 1000)}@${provider.toLowerCase()}.com`,
      logo: providerLogos[provider] // Use the logo from the providerLogos mapping
    };
    
    setConnectedAccounts([...connectedAccounts, newAccount]);
    setShowConnectModal(false);
    setToastMessage(`Successfully connected to ${provider} calendar`);
    setShowToast(true);
  };

  // Modal for connecting new accounts
  const ConnectModal = () => (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="bg-white rounded-3 p-4 shadow" style={{ maxWidth: '500px', width: '90%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Connect Calendar</h5>
          <button className="btn-close" onClick={() => setShowConnectModal(false)}></button>
        </div>
        
        <div className="d-grid gap-3">
          <button className="btn btn-outline-primary d-flex align-items-center p-3" onClick={() => handleConnectAccount('Google')}>
            <div className="me-3" style={{ width: '32px', height: '32px' }}>
              <img src={providerLogos.Google} alt="Google Calendar" className="img-fluid" />
            </div>
            <div className="text-start">
              <div className="fw-bold">Google Calendar</div>
              <small className="text-muted">Connect with your Google account</small>
            </div>
          </button>
          
          <button className="btn btn-outline-primary d-flex align-items-center p-3" onClick={() => handleConnectAccount('Microsoft')}>
            <div className="me-3" style={{ width: '32px', height: '32px' }}>
              <img src={providerLogos.Microsoft} alt="Microsoft Calendar" className="img-fluid" />
            </div>
            <div className="text-start">
              <div className="fw-bold">Microsoft Calendar</div>
              <small className="text-muted">Connect with your Outlook or Office 365 account</small>
            </div>
          </button>
          
          <button className="btn btn-outline-primary d-flex align-items-center p-3" onClick={() => handleConnectAccount('Apple')}>
            <div className="me-3" style={{ width: '32px', height: '32px' }}>
              <img src={providerLogos.Apple} alt="Apple Calendar" className="img-fluid" />
            </div>
            <div className="text-start">
              <div className="fw-bold">Apple Calendar</div>
              <small className="text-muted">Connect with your iCloud account</small>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

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

      {/* Toast notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <FaCalendarAlt className="me-2" />
            <strong className="me-auto">Calendar Integration</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Connect Modal */}
      {showConnectModal && <ConnectModal />}

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

        {/* Content Header */}
        <div className="mb-3 mb-md-4">
          <h1 className="mb-1 mb-md-2 font-inter fw-bold">Calendar Sync</h1>
          <p className="text-muted small">
            Tailor Your Schedule: Seamlessly Sync and Customize Your Meetings
          </p>
        </div>
        
        <div className='w-50 rounded-3 bg-light p-3 p-md-4'>
          {/* Calendar Accounts Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h5 fw-bold m-0">Calendar Accounts</h2>
            <button 
              className="btn btn-primary d-flex align-items-center" 
              onClick={() => setShowConnectModal(true)}
            >
              <FaPlus className="me-2" /> Add
            </button>
          </div>

          {/* Connected Accounts List */}
            <div className=" p-0">
                {connectedAccounts.length > 0 ? (
                connectedAccounts.map(account => (
                    <div key={account.id} className="d-flex justify-content-between align-items-center p-3 border rounded-">
                    <div className="d-flex align-items-center">
                        <div className="me-3" style={{ width: '40px', height: '40px' }}>
                        <img src={account.logo} alt={`${account.provider} Calendar`} className="img-fluid" />
                        </div>
                        <div>
                        <h6 className="mb-0 fw-bold">{account.provider}</h6>
                        <p className="small text-muted mb-0">{account.email}</p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-light btn-sm"
                        onClick={() => handleRemoveAccount(account.id)}
                    >
                        <FaTrash />
                    </button>
                    </div>
                ))
                ) : (
                <div className="text-center p-4">
                    <FaCalendarAlt size={40} className="text-muted mb-3" />
                    <h6>No Calendar Accounts Connected</h6>
                    <p className="small text-muted">Connect your calendar to manage your meetings efficiently</p>
                    <button 
                    className="btn btn-primary" 
                    onClick={() => setShowConnectModal(true)}
                    >
                    Connect Calendar
                    </button>
                </div>
                )}
            </div>
        </div>
    </div>
    </div>

  );
}