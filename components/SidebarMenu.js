import React from 'react';
import Calendar  from './calendar'; // Assuming this is your calendar component
import { FaCalendar, FaUsers, FaChartBar, FaClock, FaPlus } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';


const SidebarMenu = ({showmenuicon}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <div className="sidebar bg-white p-3 shadow-sm" style={{ width: '320px', height:"720px", borderRadius: '15px', transform: 'scale(0.93)', transformOrigin: 'top left' }}>
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <h4 className="text-primary m-0">AutoMeet</h4>
        {showmenuicon && <img src="/collapse.png" alt="Logo" className="ms-auto" style={{ width: "20px" }} />}
      </div>

      {/* Create Button */}
      <button className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center gap-3 fw-semibold mb-3" style={{ width: "120px", height: "45px", backgroundColor: "#DDE5F9", border: "none", color: "#000" }}>
        <FaPlus /> Create
      </button>


      {/* Menu Items */}
      <div className="menu-items mb-4">
        <div className="list-group list-group-flush">
          <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2 mb-2" style={{ color: "#000", fontSize: "19px" }}>
            <FaCalendar style={{ color: "#000" }} /> Calendar
          </a>
          <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2 mb-2" style={{ color: "#000", fontSize: "19px" }}>
            <FaUsers style={{ color: "#000" }} /> Meetings
          </a>
          <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2 mb-2" style={{ color: "#000", fontSize: "19px" }}>
            <BsPeople style={{ color: "#000" }} /> Community
          </a>
          <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2 mb-2" style={{ color: "#000", fontSize: "19px" }}>
            <FaChartBar style={{ color: "#000" }} /> Analytics
          </a>
          <hr className="my-2" />
          <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2 mb-2" style={{ color: "#000", fontSize: "19px" }}>
            <FaClock style={{ color: "#000" }} /> Availability
          </a>
        </div>
      </div>      

      {/* Calendar Component */}
      <div className="calendar-wrapper mb-4">
        <Calendar /> {/* Your existing calendar component */}
      </div>
      <hr className="my-2" />
      {/* Settings at bottom */}
      <div className="mt-auto">
        <a href="#" className="list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 p-2" style={{ color: "#000" }}>
          <FaCog style={{ color: "#000" }} size="1.5em"/>
        </a>
      </div>
    </div>
  );
};

export default SidebarMenu;