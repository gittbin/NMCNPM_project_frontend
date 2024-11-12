import { useEffect, useState } from 'react';
import './RolesGroup.css';
import { useLoading } from "../../components/introduce/Loading";
import { useAuth } from '../../components/introduce/useAuth';
import { getRoles, createRole, deleteRole } from '../../services/Roles/rolesService';

function RolesGroup() {
  const { startLoading, stopLoading } = useLoading();
  const { user, loading } = useAuth();
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newRole, setNewRole] = useState({ role: "", description: "" });
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        startLoading();
        const roles = await getRoles(); // Thêm await
        setRolesData(roles); // Đảm bảo dữ liệu đã được lấy
        stopLoading();
      }
    };
    fetchRoles();
  }, [user]);

  const toggleMenu = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedUser(isChecked ? rolesData.map((_, index) => index) : []);
  };

  const handleSelectedUser = (accountId) => {
    const updatedSelectedUser = selectedUser.includes(accountId)
      ? selectedUser.filter((id) => id !== accountId)
      : [...selectedUser, accountId];
    setSelectedUser(updatedSelectedUser);
    setSelectAll(updatedSelectedUser.length === rolesData.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({
      ...prevRole,
      [name]: value
    }));
  };

  const sendRoleToBackend = async (newRoleData) => {
    await createRole(newRoleData); // Thêm await
    const updatedRoles = await getRoles();
    setRolesData(updatedRoles);
  };

  const handleDeleteRole = async (roleId) => {
    await deleteRole(roleId, user); // Thêm await
    // Gọi lại fetchRoles để cập nhật danh sách sau khi xóa
    const updatedRoles = await getRoles();
    setRolesData(updatedRoles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading();
    if (newRole.role && newRole.description) {
      const newRoleData = {
        role: newRole.role,
        description: newRole.description,
        permissions: [],
        createAt: new Date().toISOString(),
        deleteAt: null,
        delete: false,
      };

      sendRoleToBackend(newRoleData);
      setIsFormVisible(false);
      setNewRole({ role: "", description: "" });
      stopLoading();
    }
  };

  const filteredAccounts = rolesData.filter((role) =>
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
                          <li onClick={() => handleDeleteRole(role._id)}>Delete</li>
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
