import React,{useState,useEffect} from 'react';
import { FaRegUser } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import './Profile.css';
import  { useAuth }  from '../../components/introduce/useAuth'
import Avatar from '../../components/Avatar';
import {useLoading} from '../../components/introduce/Loading'
function Profile() {
  const { user, logout,loading } = useAuth();
  const [data,SetData]=useState(null);
  const {startLoading, stopLoading} = useLoading();
  useEffect(()=>{
  const a=async ()=>{
  if(loading) return ;
  startLoading();
  const response = await fetch("http://localhost:5000/profile/get_profile",{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
user:user
      }
    )

  })
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const datas = await response.json();
  stopLoading();
  SetData(datas.user2);
  };
  a();

  },[loading])
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src="https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/460595448_861471532789268_1814732849464479219_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeH7Sbuvwd_u4f1cfgFxJiMBdtdJrU0_uLJ210mtTT-4suUsNQJZQPO-Zf516Ig5TGhkAWxcdEGNPH2DfpAIJ4WD&_nc_ohc=40sKGe2XBg8Q7kNvgFhCEOS&_nc_zt=23&_nc_ht=scontent.fhan5-11.fna&_nc_gid=AgHDpK7mdh-r72mnwZMiPX0&oh=00_AYBtXY7wI1WJFEIYnZKbtJpFyP-jJYt6yg3HELeKlZ6IWg&oe=674DC622" 
          alt="Profile Banner" 
          className="banner"
        />
        <div className="profile-picture">
          <div className='uy-avatar'>{data?<Avatar name={data.name} imageUrl={data.avatar}/>:""}</div>
        </div>
        <div className="profile-info">
          <div className="profile-info__name"> </div>
          <p>Dia chi cua hang</p>

          <button className="message-btn">Edit Profile</button>
        </div>
      </div>


      <div className="connect-section">
        <div>Thông tin cá nhân</div>
        <ul>
        <li><a href="#"><FaRegUser />  Quán của : {data?data.id_owner.name:""}</a></li>

          <li><a href="#"><FaChild /> vị trí : {data?data.role:""}</a></li>
          <li><a href="#"><FaCheckSquare /> Quyền : </a></li>
          <li><a href="#"><MdEmail /> Email : {data?data.email:""}</a></li>
          <li><a href="#"><RiLockPasswordFill /> Mật khẩu : {data?data.password:""}</a></li>
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
