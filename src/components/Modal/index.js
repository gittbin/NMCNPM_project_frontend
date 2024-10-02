import React, { useEffect, useState } from 'react';
import './Modal.css'; 
import { FaRegUser } from "react-icons/fa";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside modal-content
      if (isOpen && !document.querySelector('.modal-wrapper')?.contains(event.target)) {
        toggleModal();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

  }, [isOpen]);


  return (
    <div className="modal-wrapper">
      <FaRegUser className="icon-user" onClick={toggleModal} />
      {isOpen && (
        <div className="modal-content">
          <div className="user-info">
            <img className="avatar" src="https://via.placeholder.com/50" alt="avatar" />
            <div className="user-details">
              <strong>John Carter</strong>
              <span className="email">john@example.com</span>
            </div>
          </div>
          <div className="menu-items">
            <div className="menu-item">
              <i className="icon fa fa-user"></i> View Profile
            </div>
            <div className="menu-item">
              <i className="icon fa fa-cog"></i> Account Settings
            </div>
            <div className="menu-item">
              <i className="icon fa fa-bell"></i> Notifications
            </div>
            <div className="menu-item">
              <i className="icon fa fa-user-switch"></i> Switch Account
            </div>
            <hr />
            <div className="menu-item">
              <i className="icon fa fa-question-circle"></i> Help Center
            </div>
            <div className="menu-item">
              <i className="icon fa fa-sign-out-alt"></i> Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
