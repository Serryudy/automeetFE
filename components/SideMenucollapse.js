"use client";
import React, { useState, useEffect } from "react";
import Calendar from "./calendar";
import { FaCog } from "react-icons/fa";
import Link from 'next/link';

const SidebarMenu = ({ showmenuicon = true, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    if (onToggle && typeof onToggle === 'function') {
      onToggle(newCollapsedState);
    }
  };
  
  useEffect(() => {
    if (onToggle && typeof onToggle === 'function') {
      onToggle(isCollapsed);
    }
  }, [isCollapsed]); // Added isCollapsed to dependency array

  const menuItems = [
    { icon: <img src="/icons/calendar.png" alt="Calendar" style={{ width: "22px" }} />, label: "Calendar", path: "/" },
    { icon: <img src="/icons/meeting.png" alt="Calendar" style={{ width: "22px" }} />, label: "Meetings", path: "/meeting" },
    { icon: <img src="/icons/community.png" alt="Calendar" style={{ width: "22px" }} />, label: "Community", path: "/community" },
    { icon: <img src="/icons/analytics.png" alt="Calendar" style={{ width: "22px" }} />, label: "Analytics", path: "/analytics" },
    { icon: <img src="/icons/availability.png" alt="Calendar" style={{ width: "22px" }} />, label: "Availability", path: "/availability" },
  ];

  return (
    <div
      className={`sidebar bg-white align-items-start shadow-sm d-flex flex-column`}
      style={{
        width: isCollapsed ? "80px" : "320px",
        height: "97vh",
        borderRadius: "15px",
        transition: "width 0.3s ease-in-out",
        padding: "20px",
      }}
    >
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 w-100">
        <div className={`d-flex align-items-center ${isCollapsed ? "justify-content-center" : "justify-content-between"} w-100 mb-4`}>
          {!isCollapsed && <h4 className="text-primary m-0">AutoMeet</h4>}
          {showmenuicon && (
            <img
              src="/collapse.png"
              alt="Toggle Sidebar"
              className="cursor-pointer"
              style={{ 
                width: "20px", 
                height: "20px",
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out"
              }}
              onClick={toggleSidebar}
            />
          )}
        </div>

        {/* Create Button */}
        <div className="d-flex mb-3 w-100" style={{ justifyContent: isCollapsed ? "center" : "flex-start" }}>
          <Link href="/create" className="text-decoration-none">
            <button
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: isCollapsed ? "45px" : "120px",
                height: "45px",
                backgroundColor: "#DDE5F9",
                border: "none",
                color: "#000",
                borderRadius: isCollapsed ? "50%" : "30px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <img src="/icons/add.png" alt="Create" style={{ width: "20px" }} className="me-2"/>
              {!isCollapsed && <span className="ms-2 fw-semibold">Create</span>}
            </button>
          </Link>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow-1 overflow-y-auto w-100" style={{ minHeight: 0 }}>
        <div className="menu-items w-100 h-100">
          <div className="list-group list-group-flush">
            {menuItems.map(({ icon, label, path }, index) => (
              <Link
                key={index}
                href={path}
                className="list-group-item fw-semibold list-group-item-action border-0 d-flex align-items-center p-2"
                style={{
                  color: "#000",
                  fontSize: "16px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  paddingLeft: isCollapsed ? "0" : "16px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {icon}
                {!isCollapsed && <span className="ms-3">{label}</span>}
              </Link>
            ))}
          </div>

          {/* Calendar Component */}
          {!isCollapsed && (
            <>
              <hr className="w-100 my-2" />
              <div className="calendar-wrapper w-100 my-3">
                <Calendar />
              </div>
              <hr className="w-100 my-2" />
            </>
          )}
        </div>
      </div>

      {/* Fixed Footer Section */}
      <div className="flex-shrink-0 mt-auto">
        <Link
          href="/settings"
          className="list-group-item fw-semibold list-group-item-action border-0 d-flex align-items-center p-2"
          style={{
            color: "#000",
            justifyContent: isCollapsed ? "center" : "flex-start",
            paddingLeft: isCollapsed ? "0" : "16px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FaCog size={20} />
          {!isCollapsed && <span className="ms-3">Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default SidebarMenu;