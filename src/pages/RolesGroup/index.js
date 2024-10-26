import { useEffect, useState } from 'react';
import './RolesGroup.css';
import {useLoading} from "../../components/introduce/Loading"
import { useAuth } from '../../components/introduce/useAuth';

var roles_data = [];

function RolesGroup() {
  const {startLoading,stopLoading}=useLoading()
  const { user,loading} = useAuth();
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newRole, setNewRole] = useState({ role: "", description: "" });

  useEffect(() => {
      //Lấy API nhả ra giao diện
      const getAPIRoles = async()=>{
        const res = await fetch('http://localhost:5000/roles/show',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(!res.ok){
          throw new Error("Network response was not ok");
        }
        roles_data = await res.json();
      };

    getAPIRoles();
  }, []); 


  const toggleMenu = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e) => {    
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedUser(isChecked ? roles_data.map((_, index) => index) : []);
  };

  const handleSelectedUser = (accountId) => {
    const updatedSelectedUser = selectedUser.includes(accountId)
      ? selectedUser.filter((id) => id !== accountId)
      : [...selectedUser, accountId];
    setSelectedUser(updatedSelectedUser);
    setSelectAll(updatedSelectedUser.length === roles_data.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({
      ...prevRole,
      [name]: value
    }));
  };

  // Thêm hàm gửi dữ liệu tới backend
  const sendRoleToBackend = async (newRoleData) => {
    try {
      const response = await fetch("http://localhost:5000/roles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoleData),
      });
      console.log(newRoleData);
      const data = await response.json();
      if (data.success) {
        alert("Role created successfully!");
        // Làm mới danh sách roles nếu cần thiết
      } else {
        alert("Error creating role!");
      }
    } catch (error) {
      console.error("Error sending role to backend:", error);
    }
  };

  const handleSubmit = (e) => {
    startLoading();
    e.preventDefault();
    if (newRole.role && newRole.description) {
      const newRoleData = {
        role: newRole.role,
        description: newRole.description,
        permissions: [],
        createAt: new Date().toISOString(),
        deleteAt: null,
        delete: { boolean: false }
      };

      // Gửi vai trò mới về server
      sendRoleToBackend(newRoleData);

      setIsFormVisible(false);
      setNewRole({ role: "", description: "" });
      stopLoading();
    }
  };

  const filteredAccounts = roles_data.filter((role) =>
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
          <button className="create-role-btn" onClick={() => setIsFormVisible(true)}>
            Create Role
          </button>
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

      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsFormVisible(false)}>X</button>
            <form className="create-role-form" onSubmit={handleSubmit}>
              <h3>Create New Role</h3>
              <div className="form-group">
                <label htmlFor="role">Role Name:</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={newRole.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newRole.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Create</button>
              <button type="button" className="cancel-btn" onClick={() => setIsFormVisible(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolesGroup;
