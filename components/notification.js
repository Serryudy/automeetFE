import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotificationsComponent = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Mark Your Availability!',
      message: 'Select best time for your upcoming meeting',
      date: '24 hours before the time slot selection',
      time: 'Triggered at the scheduled reminder time',
      timeAgo: '2m',
      read: false
    },
    {
      id: 2,
      title: 'Meeting Confirmed',
      message: 'The meeting has been finalized.Please prepare.',
      date: 'Date when the final time slot is confirmed.',
      time: 'Immediate upon confirmation.',
      timeAgo: '3h',
      read: true
    },
    {
      id: 3,
      title: 'Meeting Reminder',
      message: 'Select best time for your upcoming meeting',
      date: '1 hour before the meeting start time.',
      time: 'Configurable by the admin (e.g., 30 mins, 1 hour).',
      timeAgo: '18h',
      read: true
    },
    {
      id: 4,
      title: 'Meeting Cancellation',
      message: 'The meeting titled [Meeting Title] scheduled for [Meeting Date and Time] has been canceled.',
      date: 'Date of cancellation.',
      timeAgo: '1d',
      read: true
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    if (activeTab === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="container" style={{ maxWidth: '450px', aspectRatio: '1/1.5' }}>
      <div className="card shadow">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold">Notifications</h5>
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-link text-primary text-decoration-none me-2" 
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
            <button className="btn-close" aria-label="Close"></button>
          </div>
        </div>
        
        <div className="card-body p-3">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item flex-grow-1 text-center">
              <button 
                className={`nav-link border-0 rounded-0 w-100 px-2 ${activeTab === 'all' ? 'active border-bottom border-5 border-primary border-3' : ''}`} 
                onClick={() => setActiveTab('all')}
              >
                All <span className="badge bg-primary rounded-pill ms-1">{notifications.length}</span>
              </button>
            </li>
            <li className="nav-item flex-grow-1 text-center">
              <button 
                className={`nav-link border-0 rounded-0 w-100 px-2 ${activeTab === 'unread' ? 'active border-bottom border-5 border-primary border-3' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread <span className="badge bg-primary rounded-pill ms-1">{unreadCount}</span>
              </button>
            </li>
            <li className="nav-item flex-grow-1 text-center">
              <button 
                className={`nav-link border-0 rounded-0 w-100 px-2 ${activeTab === 'read' ? 'active border-bottom border-5 border-primary border-3' : ''}`}
                onClick={() => setActiveTab('read')}
              >
                Read
              </button>
            </li>
          </ul>
          
          <div className="list-group list-group-flush">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`list-group-item list-group-item-action ${!notification.read ? 'bg-light' : ''}`}
              >
                <button className='bg-transparent text-decoration-none text-dark text-start border-0'>
                    <div className="d-flex w-100 align-items-center">
                      {!notification.read && (
                        <div className="me-3">
                          <div className="bg-primary rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                        </div>
                      )}
                      {notification.read && (
                          <div className="me-3"></div>
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">{notification.title}</h6>
                        <p className="mb-1">{notification.message}</p>
                        <div className="small text-muted">
                          <div><strong>Date:</strong> {notification.date}</div>
                          {notification.time && <div><strong>Time:</strong> {notification.time}</div>}
                        </div>
                      </div>
                      <div className="text-muted small ms-2">{notification.timeAgo}</div>
                    </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card-footer bg-white text-center py-2">
          <button className="btn btn-link text-primary text-decoration-none">View all ...</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsComponent;