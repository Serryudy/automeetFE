import React from 'react';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaVideo, 
  FaCog, 
  FaAdjust, 
  FaSignOutAlt 
} from 'react-icons/fa';

const AccountSettings = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center bg-white">
        <div className="col-md-8 col-lg-6">
          {/* Profile Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="position-relative">
              <img 
                src="/profile.png" 
                alt="Profile" 
                className="rounded-circle bg-light"
                style={{ width: '60px', height: '60px' }}
              />
            </div>
            <div className="ms-3">
              <h4 className="mb-0">John_Doe</h4>
              <p className="text-muted mb-0">Jhonathan Doeresami</p>
            </div>
          </div>
          
          <hr className="my-4" />
          
          {/* Account Settings Navigation */}
          <span className="mb-4 text-secondary fs-5">Account Settings</span>
          
          <div className="list-group">
            <a href="#profile" className="list-group-item list-group-item-action d-flex align-items-center border-0">
              <FaUser className="me-3" size={24} />
              <span className="fs-5">Your Profile</span>
            </a>
            
            <a href="#calendar" className="list-group-item list-group-item-action d-flex align-items-center border-0">
              <FaCalendarAlt className="me-3" size={24} />
              <span className="fs-5">Calendar Sync</span>
            </a>
            
            <a href="#zoom" className="list-group-item list-group-item-action d-flex align-items-center border-0">
              <FaVideo className="me-3" size={24} />
              <span className="fs-5">Configure Zoom/Meet</span>
            </a>
          </div>
          
          <hr className="my-4" />
          
          <div className="list-group">
            <a href="#settings" className="list-group-item list-group-item-action d-flex align-items-center border-0">
              <FaCog className="me-3" size={24} />
              <span className="fs-5">Settings</span>
            </a>
            
            <a href="#theme" className="list-group-item list-group-item-action d-flex align-items-center justify-content-between border-0">
              <div className="d-flex align-items-center">
                <FaAdjust className="me-3" size={24} />
                <span className="fs-5">Theme</span>
              </div>
              <span>&gt;</span>
            </a>
          </div>
          
          <hr className="my-4" />
          
          <div className="list-group mb-4">
            <a href="#logout" className="list-group-item list-group-item-action d-flex align-items-center border-0">
              <FaSignOutAlt className="me-3" size={24} />
              <span className="fs-5">Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;