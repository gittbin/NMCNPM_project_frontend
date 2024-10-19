import React, { useState } from 'react';
import './Permission.css';

const Permissions = () => {
  const [role, setRole] = useState('admin');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <div className="permissions-container">
      <h2>Permission</h2>
      <h3>Thiết lập phân quyền</h3>
      
      {/* Tab buttons */}
      <div className="tabs">
        <button 
          className={role === 'admin' ? 'active' : ''} 
          onClick={() => handleRoleChange('admin')}
        >
          Quản trị viên
        </button>
        <button 
          className={role === 'content' ? 'active' : ''} 
          onClick={() => handleRoleChange('content')}
        >
          Quản lý nội dung
        </button>
      </div>

      {/* Permissions table */}
      <div className="permissions-table">
        <div className="select-all">
          <input type="checkbox" /> Chọn tất cả
        </div>
        <table>
          <thead>
            <tr>
              <th>Bài viết</th>
              <th>Xem</th>
              <th>Thêm mới</th>
              <th>Thay đổi trạng thái</th>
              <th>Cập nhật</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Xem</td>
              <td><input type="checkbox" checked /></td>
              <td><input type="checkbox" checked /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            {/* Thêm các quyền khác */}
          </tbody>
        </table>
      </div>
      
      {/* Nút cập nhật */}
      <button className="update-btn">Cập nhật</button>
    </div>
  );
};

export default Permissions;
