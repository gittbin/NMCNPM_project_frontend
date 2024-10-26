import React, { useState } from 'react';
import './Permission.css';

const Permissions = () => {
  const roles = [
    {
      "role": "quản lý sản phẩm",
      "description": "Quản lý các tác vụ liên quan đến sản phẩm.",
      "permissions": ["product_edit", "product_create"],
      "createAt": "2024-10-19T09:00:00Z",
      "deleteAt": null,
      "delete": {
        "boolean": false
      }
    },
    {
      "role": "quản lý bán hàng",
      "description": "Quản lý các tác vụ liên quan đến bán hàng.",
      "permissions": ["sales_view", "sales_edit"],
      "createAt": "2024-10-19T09:00:00Z",
      "deleteAt": null,
      "delete": {
        "boolean": false
      }
    },
    {
      "role": "quản lý người dùng",
      "description": "Quản lý các tác vụ liên quan đến người dùng.",
      "permissions": ["user_create", "user_edit"],
      "createAt": "2024-10-19T09:00:00Z",
      "deleteAt": null,
      "delete": {
        "boolean": false
      }
    },
    {
      "role": "quản lý kho",
      "description": "Quản lý các tác vụ liên quan đến kho hàng.",
      "permissions": ["inventory_view", "inventory_edit"],
      "createAt": "2024-10-19T09:00:00Z",
      "deleteAt": null,
      "delete": {
        "boolean": false
      }
    }
  ]
  
  return (
    <div className="permissions-container">
      <h2>Permission</h2>
      <h3>Thiết lập phân quyền</h3>
      
      {/* Tab buttons */}
      <div className="tabs">
        <table>
          <thead>
            <tr>
              <th>Tính năng</th>
              {roles.map((role,index)=>(
                <th key={index}>{role.role}</th> 
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Xem</td>
              {roles.map((role,index)=>(
                <td key={index}><input type="checkbox" /></td> 
              ))}
            </tr>

            <tr>
              <td>Chỉnh sửa</td>
              {roles.map((role,index)=>(
                <td key={index}><input type="checkbox" /></td> 
              ))}
            </tr>

            <tr>
              <td>Xóa</td>
              {roles.map((role,index)=>(
                <td key={index}><input type="checkbox" /></td> 
              ))}
            </tr>

            <tr>
              <td>Thêm tài khoản</td>
              {roles.map((role,index)=>(
                <td key={index}><input type="checkbox" /></td> 
              ))}
            </tr>
            {/* Thêm các quyền khác */}
          </tbody>
        </table>
      </div>

      {/* Permissions table */}
      <div className="permissions-table">
        <div className="select-all">
          <input type="checkbox" /> Chọn tất cả
        </div>
        
      </div>
      
      {/* Nút cập nhật */}
      <button className="update-btn">Cập nhật</button>
    </div>
  );
};

export default Permissions;
