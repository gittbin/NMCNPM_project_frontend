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
import ProfilePictureOptions from './image.js'
import { notify } from '../../components/Notification/notification';
function Profile() {
  const { user, logout,loading } = useAuth();
  const [edit,SetEdit]=useState(false);
  const [editimage,SetEditimage]=useState(false);
  const [data,SetData]=useState(null);
  const {startLoading, stopLoading} = useLoading();
  const [newdata,SetNewdata]=useState(null)
  const [o,SetO]=useState(false)
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
  console.log(datas)
  SetData(datas);
  SetNewdata(datas)
  };
  a();

  },[loading,o])
  const handleEditChange=(a)=>{
    const {name,value}=a.target;
    console.log(name,value);
    SetNewdata((x)=>({...x,[name]:value}));
  }
  const Save_change=async ()=>{
    startLoading();
    const response = await fetch("http://localhost:5000/profile/change_profile",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
  user:newdata
        }
      )
  
    })
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const datas = await response.json();
    stopLoading()
    if(datas.respond=="success"){
      notify(1,'Cập nhật thông tin cá nhân thành công','Thành công');
      if(data.role=='Admin'){
         SetO((a)=>!a)
      }else{
        SetData({...newdata})
     
      }
      SetEdit(a=>!a)
    
    }
    
    

  }
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src="https://th.bing.com/th?id=ORMS.56823debd4d1cba419b1262f94a12e45&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.5&p=0" 
          alt="Profile Banner" 
          className="banner"
        />
        <div>
        <div className="profile-picture" onClick={()=>{SetEditimage((a)=>!a)}}>
          <div className='uy-avatar' style={{cursor:"pointer"}}>{data?<Avatar name={data.name} imageUrl={data.avatar}/>:""}</div>
        </div>
        {editimage?<ProfilePictureOptions image={data.avatar} reload={()=>{SetO((a)=>!a)}}/>:""}
        </div>
        
        <div className="profile-info">
          {!edit?<div className="profile-info__name">{data?(data.name):""}</div>:
          <input 
          type="text"
          name="name"
          value={newdata?(newdata.name):""}
          onChange={handleEditChange}
          />}

          {edit?(<><button className="message-btn" onClick={Save_change}>Lưu</button>
          <button className="message-btn" onClick={()=>{SetEdit(a=>!a)}} style={{marginLeft:"10px"}}>Thoát</button></>):(<button className="message-btn" onClick={()=>{SetEdit(a=>!a)}}>Edit profile</button>)}
        </div>
      </div>


      <div className="connect-section">
        <div>Thông tin cá nhân</div>
        <ul>
        <li><a href="#"><FaRegUser />  Quán của : {data?data.id_owner.name:""}</a></li>

          <li><a href="#"><FaChild /> vị trí : {data?data.right.role:""}</a></li>
          <li><a href="#"><FaCheckSquare /> Quyền : {data?(data.right.permission?data.permission.map((a)=>a):"tất cả các quyền"):""}</a></li>
          <li><a href="#"><MdEmail /> Email : {data?data.email:""}</a></li>
          <li><a href="#"><RiLockPasswordFill /> Mật khẩu : {!edit?(data?data.password:""):
          <input 
          type="text"
          name="password"
          value={newdata?(newdata.password):""}
          onChange={handleEditChange}
          />}</a></li>
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
