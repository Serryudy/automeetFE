// components/ProfileHeader.js
import React from 'react';
import Image from 'next/image';
import { MdGroupAdd } from 'react-icons/md';
import NotificationIcon from './NotificationIcon';

const ProfileHeader = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px',
        gap: '8.73px',
        width: '100%',
        height: '48.64px',
        flex: 'none',
        order: 0,
        alignSelf: 'stretch',
        flexGrow: 0
      }}
    >
      {/* Add Contact Icon */}
      <button className="btn btn-link p-2">
        <MdGroupAdd size={24} color="#292D32" />
      </button>

      {/* Notification Icon */}
      <button className="btn btn-link p-2">
        <NotificationIcon />
      </button>

      {/* Profile Image */}
      <div className="rounded-circle overflow-hidden">
        <Image
          src="/icons/profile.png"
          alt="Profile"
          width={48}
          height={48}
          className="object-fit-cover"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;