"use client";

import React, { useState, useEffect } from "react";
import Calendar from "./calendar";
import { FaCog, FaUser, FaBell, FaCalendarAlt, FaVideo } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

const SidebarMenuExternal = ({ showmenuicon = true, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get the current URL path


  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    if (onToggle && typeof onToggle === "function") {
      onToggle(newCollapsedState);
    }
  };

  useEffect(() => {
    if (onToggle && typeof onToggle === "function") {
      onToggle(isCollapsed);
    }
  }, [isCollapsed]);

  const menuItems = [
    { icon: <img src="/icons/calendar.png" alt="Calendar" style={{ width: "22px" }} />, label: "Calendar", path: "/external" },
    { icon: <img src="/icons/meeting.png" alt="Calendar" style={{ width: "22px" }} />, label: "Meetings", path: "/external/meeting" },
    { icon: <img src="/icons/content.png" alt="Calendar" style={{ width: "22px" }} />, label: "Content", path: "/external/content" },
    { icon: <img src="/icons/notes.png" alt="Calendar" style={{ width: "22px" }} />, label: "Notes", path: "/external/notes" },
  ];

  

  

 

  // Render the main sidebar
  return (
    <div
      className={`sidebar bg-white align-items-start shadow-sm d-flex flex-column`}
      style={{
        width: isCollapsed ? "80px" : "330px",
        height: "97vh",
        borderRadius: "15px",
        transition: "width 0.3s ease-in-out",
        padding: "20px",
        
      }}
    >
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 w-100 pb-4">
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
                transition: "transform 0.3s ease-in-out",
              }}
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow-1 overflow-y-auto w-100" style={{ minHeight: 0 }}>
        <div className="menu-items w-100 h-100 d-flex flex-column justify-content-between pb-5">
          <div className="list-group list-group-flush">
            {menuItems.map(({ icon, label, path }, index) => (
              <Link
                key={index}
                href={path}
                className="text-decoration-none fw-semibold list-group-item-action border-0 d-flex align-items-center p-2"
                style={{
                  color: "#000",
                  fontSize: "18px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  paddingLeft: isCollapsed ? "0" : "16px",
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
              <hr className="w-100 " />
              <div className="calendar-wrapper w-100 ">
                <Calendar />
              </div>
              <hr className="w-100 my-2" />
            </>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default SidebarMenuExternal;