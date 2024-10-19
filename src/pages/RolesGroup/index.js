import { useState } from 'react';
import './RolesGroup.css';

const roles = [
  {
    role: "quản lý bán hàng",
    description: "Quản lý các tác vụ liên quan đến bán hàng.",
    permissions: ["view_product", "edit_product"],
    createAt: "2024-10-19T09:00:00Z",
    deleteAt: null,
    delete: {
      boolean: false
    }
  },
  {
    role: "nhân viên kho",
    description: "Quản lý hàng tồn kho và các tác vụ liên quan đến kho.",
    permissions: ["view_inventory", "edit_inventory"],
    createAt: "2024-10-19T10:30:00Z",
    deleteAt: null,
    delete: {
      boolean: false
    }
  },
  {
    role: "quản lý nhân sự",
    description: "Quản lý các hoạt động nhân sự, tuyển dụng và chấm công.",
    permissions: ["view_employee", "edit_employee"],
    createAt: "2024-10-19T11:15:00Z",
    deleteAt: null,
    delete: {
      boolean: false
    }
  },
  {
    role: "quản lý marketing",
    description: "Quản lý các chiến dịch marketing và quảng cáo.",
    permissions: ["view_campaign", "edit_campaign"],
    createAt: "2024-10-19T12:00:00Z",
    deleteAt: null,
    delete: {
      boolean: false
    }
  }
];

function RolesGroup() {
  const [selectedUser, setSelectedUser] = useState([]); // Quản lý lựa chọn người dùng
  const [selectAll, setSelectAll] = useState(false); // Quản lý chọn tất cả
  const [showMenuIndex, setShowMenuIndex] = useState(null); // Quản lý dropdown
  const [searchTerm, setSearchTerm] = useState(""); // Quản lý tìm kiếm

  const toggleMenu = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Cập nhật điều kiện tìm kiếm
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedUser(isChecked ? roles.map((_, index) => index) : []);
  };

  const handleSelectedUser = (accountId) => {
    const updatedSelectedUser = selectedUser.includes(accountId)
      ? selectedUser.filter((id) => id !== accountId)
      : [...selectedUser, accountId];
    setSelectedUser(updatedSelectedUser);
    setSelectAll(updatedSelectedUser.length === roles.length);
  };

  // Lọc các vai trò dựa trên điều kiện tìm kiếm
  const filteredAccounts = roles.filter((role) =>
    role.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="roles-group">
      <div className="role-header">
        <h2>Manage Role</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for roles..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="create-role-btn">Create Role</button>
        </div>
      </div>

      <div className="table-container">
        <table className="role-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox-all"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>STT</th>
              <th>Role</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((role, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox-user"
                    checked={selectedUser.includes(index)}
                    onChange={() => handleSelectedUser(index)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{role.role}</td>
                <td>{role.description}</td>
                <td>
                  <div className="action">
                    <button onClick={() => toggleMenu(index)} className="menu-btn">
                      ⋮
                    </button>
                    {showMenuIndex === index && (
                      <div className="dropdown-menu">
                        <ul>
                          <li>View Details</li>
                          <li>Edit</li>
                          <li>Delete</li>
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
    </div>
  );
}

export default RolesGroup;
