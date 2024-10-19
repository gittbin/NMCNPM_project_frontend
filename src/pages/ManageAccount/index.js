import React, { useState } from "react";
import './ManageAccount.css';

const accounts = [
  { id: 1, employeeId: "NV001", name: "Nguyen Van A", role: "Admin", email: "a@example.com", status: "Active", salary: "15,000,000 VND" },
  { id: 2, employeeId: "NV002", name: "Le Thi B", role: "Nhân viên", email: "b@example.com", status: "Inactive", salary: "12,000,000 VND" },
  { id: 3, employeeId: "NV003", name: "Tran Van C", role: "Quản lý", email: "c@example.com", status: "Delete", salary: "18,000,000 VND" },
];

function AccountTable() {
  const [selectedUser, setSelectedUser] = useState([]); // Manages selected users
  const [selectAll, setSelectAll] = useState(false); // Manages select-all state
  const [showMenuIndex, setShowMenuIndex] = useState(null); // Manages dropdown menu visibility
  const [searchTerm, setSearchTerm] = useState(""); // Manages the search input

  const toggleMenu = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Updates search term
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedUser(isChecked ? accounts.map((acc) => acc.id) : []);
  };

  const handleSelectedUser = (accountId) => {
    const updatedSelectedUser = selectedUser.includes(accountId)
      ? selectedUser.filter((id) => id !== accountId)
      : [...selectedUser, accountId];
    setSelectedUser(updatedSelectedUser);
    setSelectAll(updatedSelectedUser.length === accounts.length);
  };

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-table">
      <div className="account-header">
        <h2>Manage Accounts</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for..."
            value={searchTerm}
            onChange={handleSearchChange} // Handle input change
          />
          <button className="create-order-btn">Create Order</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox-all"
                checked={selectAll}
                onChange={handleSelectAll} // Handle select all
              />
            </th>
            <th>Họ Tên</th>
            <th>Phân Quyền</th>
            <th>Email</th>
            <th>Trạng Thái</th>
            <th>Lương</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-user"
                  checked={selectedUser.includes(account.id)}
                  onChange={() => handleSelectedUser(account.id)} // Handle individual selection
                />
              </td>
              <td>{account.name}</td>
              <td>{account.role}</td>
              <td>{account.email}</td>
              <td>
                <span className={`status ${account.status.toLowerCase()}`}>
                  {account.status}
                </span>
              </td>
              <td>{account.salary}</td>
              <td>
                <div className="action">
                  <button
                    onClick={() => toggleMenu(account.id)}
                    className="menu-btn"
                  >
                    ⋮
                  </button>
                  {showMenuIndex === account.id && (
                    <div className="dropdown-menu">
                      <ul>
                        <li>Chi tiết</li>
                        <li>Chỉnh sửa</li>
                        <li>Xóa</li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
