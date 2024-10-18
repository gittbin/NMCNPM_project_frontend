import React, { useState, useEffect } from "react";
import './User_role.css';

const user_data = 
  [
    {
      "_id": "67015cc926e216035ea22bd7",
      "name": "Nguyễn Văn An",
      "email": "nguyenvanan@example.com",
      "password": null,
      "GoogleID": "112784877342347811900",
      "rights": ["admin", "editor", "viewer"],
      "createdAt": "2024-10-05T15:35:37.288+00:00",
      "updatedAt": "2024-10-05T15:35:37.288+00:00",
      "id_owner": "67015cc926e216035ea22bd7",
      "__v": 0
    },
    {
      "_id": "67015cc926e216035ea22bd8",
      "name": "Trần Thị Mai",
      "email": "tranthimai@example.com",
      "password": null,
      "GoogleID": "112784877342347811901",
      "rights": ["editor", "viewer"],
      "createdAt": "2024-10-06T08:22:45.123+00:00",
      "updatedAt": "2024-10-06T08:22:45.123+00:00",
      "id_owner": "67015cc926e216035ea22bd8",
      "__v": 0
    },
    {
      "_id": "67015cc926e216035ea22bd9",
      "name": "Phạm Quang Huy",
      "email": "phamquanghuy@example.com",
      "password": null,
      "GoogleID": "112784877342347811902",
      "rights": ["viewer"],
      "createdAt": "2024-10-07T11:00:10.543+00:00",
      "updatedAt": "2024-10-07T11:00:10.543+00:00",
      "id_owner": "67015cc926e216035ea22bd9",
      "__v": 0
    },
    {
      "_id": "67015cc926e216035ea22bda",
      "name": "Lê Minh Tú",
      "email": "leminhtu@example.com",
      "password": null,
      "GoogleID": "112784877342347811903",
      "rights": ["admin", "viewer"],
      "createdAt": "2024-10-08T09:15:25.678+00:00",
      "updatedAt": "2024-10-08T09:15:25.678+00:00",
      "id_owner": "67015cc926e216035ea22bda",
      "__v": 0
    },
    {
      "_id": "67015cc926e216035ea22bdb",
      "name": "Vũ Thị Lan",
      "email": "vuthilan@example.com",
      "password": null,
      "GoogleID": "112784877342347811904",
      "rights": ["editor", "admin"],
      "createdAt": "2024-10-09T14:30:50.789+00:00",
      "updatedAt": "2024-10-09T14:30:50.789+00:00",
      "id_owner": "67015cc926e216035ea22bdb",
      "__v": 0
    },
  ] ;
let count=0;
const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Lọc các đơn hàng theo tìm kiếm
  const filteredUsers = user_data.filter(user => 
    user._id.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm)
  );

  // Cập nhật selectedOrders mỗi khi filteredOrders thay đổi
  useEffect(() => {
    setSelectedOrders(new Array(user_data.length).fill(false));
  }, [filteredUsers.length]); // Chỉ theo dõi độ dài của filteredOrders

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedOrders(new Array(filteredUsers.length).fill(newSelectAll));
  };

  const handleSelectOrder = (index) => {
    const newSelectedOrders = [...selectedOrders];
    newSelectedOrders[index] = !newSelectedOrders[index];
    if(newSelectedOrders[index]) count++;else{count--;}
    if(count>0) setSelectAll(true);else{setSelectAll(false)}
    setSelectedOrders(newSelectedOrders);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="order-mgmt-container">
      <div className="order-mgmt-header">
        <h2 className="order-mgmt-title">User Permission</h2>
        <div className="order-mgmt-header-controls">
          <input
            type="text"
            className="order-mgmt-search"
            placeholder="Search for..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <input
            type="month"
            className="order-mgmt-date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="order-mgmt-create-btn">Create User</button>
        </div>
      </div>

      <table className="order-mgmt-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="order-mgmt-checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID User</th>
            <th>Name</th>
            <th>Date</th>
            <th>Rights</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  className="order-mgmt-checkbox"
                  checked={selectedOrders[index] || false} // Tránh lỗi undefined
                  onChange={() => handleSelectOrder(index)}
                />
              </td>
              <td>#{user._id}</td>
              <td>{user.name} <br /> <small>{user.email}</small></td>
              <td>{user.createdAt}</td>
              <td>{user.rights}</td>
              <td>${user.name}</td>
              <td>
                <button className="order-mgmt-button edit">✏️</button>
                <button className="order-mgmt-button delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;