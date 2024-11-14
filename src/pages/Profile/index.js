import React from 'react';
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import './Profile.css';
import  { useAuth }  from '../../components/introduce/useAuth'
import Avatar from '../../components/Avatar';
function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src="https://via.placeholder.com/1200x300" 
          alt="Profile Banner" 
          className="banner"
        />
        <div className="profile-picture">
          <div className='avatar'><Avatar name={user.name} imageUrl={user.image} /></div>
        </div>
        <div className="profile-info">
          <div className="profile-info__name">{user.name}</div>
          <p>Dia chi cua hang</p>

          <button className="message-btn">Edit Profile</button>
        </div>
      </div>


      <div className="connect-section">
        <div>Social Network</div>
        <ul>
        <li><a href="#"><FaPhoneAlt />Liên hệ trực tiếp</a></li>
          <li><a href="#"><FaTiktok />Tiktok shop</a></li>
          <li><a href="#"><FaFacebook />Facebook</a></li>
          <li><a href="#"><SiShopee />Shopee</a></li>
        </ul>
      </div>

      <div className="profile-logout">
        <a href="/">
            <button className="message-btn logout" onClick={logout}>
            Logout
            </button>
        </a>
      </div>
    </div>
  );
}

export default Profile;
