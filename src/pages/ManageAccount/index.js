import React, { useEffect, useState } from "react";
import './ManageAccount.css';
import { getRoles } from "../../services/Roles/rolesService";
import { useAuth } from "../../components/introduce/useAuth";
import { useLoading } from "../../components/introduce/Loading";

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const { startLoading, stopLoading } = useLoading();
  const { user, loading } = useAuth();
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_owner: user? user._id:"",
  });

  const getAccounts = async (userId) => {
    if (!userId) {
      console.error("Lỗi: userId không hợp lệ!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/accounts/show?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Response status:", response.status);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      setAccounts(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
        if (user) {
            startLoading();
            await getAccounts(user._id);
            const roles = await getRoles();
            setRolesData(roles);
            stopLoading();
            setFormData((prevData) => ({ ...prevData, id_owner: user._id })); // cập nhật id_owner
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
    setSelectedUser(isChecked ? accounts.map((acc) => acc._id) : []);
  };

  const handleSelectedUser = (accountId) => {
    const updatedSelectedUser = selectedUser.includes(accountId)
      ? selectedUser.filter((id) => id !== accountId)
      : [...selectedUser, accountId];
    setSelectedUser(updatedSelectedUser);
    setSelectAll(updatedSelectedUser.length === accounts.length);
  };

  const filteredAccounts = accounts.filter((account) => {
    const name = account.name ? account.name.toLowerCase() : "";
    const email = account.email ? account.email.toLowerCase() : "";
    const role = account.role ? account.role.toLowerCase() : "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const response = await fetch("http://localhost:5000/accounts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Success:", data);
      stopLoading();
      await getAccounts(user._id); // Use await here as handleCreateAccount is async
      setShowModal(false); // Hide modal on success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        startLoading();
        const response = await fetch(`http://localhost:5000/accounts/delete/${accountId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete account: ${response.statusText}`);
        }

        await getAccounts(user._id); // Refresh the accounts list
        stopLoading();
      } catch (error) {
        console.error("Error deleting account:", error);
        stopLoading();
      }
    }
  };

  const handleOpenEditModal = (account) => {
    setFormData({
      id: account._id,
      name: account.name,
      email: account.email,
      role: account.role,
      password: "", // Assuming password can be left blank for editing
    });
    setShowEditModal(true);
  };

  const handleEditAccount = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const response = await fetch(`http://localhost:5000/accounts/edit/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Success:", data);
      stopLoading();
      await getAccounts(user._id); // Use await here as handleCreateAccount is async
      setShowModal(false); // Hide modal on success
    } catch (error) {
      console.error("Error edit:",error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

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
            onChange={handleSearchChange}
          />
          <button className="create-order-btn" onClick={() => setShowModal(true)}>Create Staff Account</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}>✖</button>
            <form className="create-account-form" onSubmit={handleCreateAccount}>
              <h3>Create Staff Account</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Role</option>
                {rolesData.map((role) => (
                  <option key={role._id} value={role.role}>{role.role}</option>
                ))}
              </select>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowEditModal(false)}>✖</button>
            <form className="create-account-form" onSubmit={handleEditAccount}> {/* Changed class name here */}
              <h3>Edit Staff Account</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (leave blank to keep current)"
                value={formData.password}
                onChange={handleInputChange}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Role</option>
                {rolesData.map((role) => (
                  <option key={role._id} value={role.role}>{role.role}</option>
                ))}
              </select>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <table>
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
            <tr key={account._id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-user"
                  checked={selectedUser.includes(account._id)}
                  onChange={() => handleSelectedUser(account._id)} 
                />
              </td>
              <td>{account.name}</td>
              <td>{account.role}</td>
              <td>{account.email}</td>
              <td>
                <span className={`status ${account.status ? account.status.toLowerCase() : 'active'}`}>
                  {account.status || 'Acctive'}
                </span>
              </td>
              <td>{account.salary || 'N/A'}</td>
              <td>
                <div className="action">
                  <button
                    onClick={() => toggleMenu(account._id)}
                    className="menu-btn"
                  >
                    ⋮
                  </button>
                  {showMenuIndex === account._id && (
                    <div className="dropdown-menu">
                      <ul>
                        <li onClick={() => handleOpenEditModal(account)}>Chỉnh sửa</li>
                        <li onClick={() => handleDeleteAccount(account._id)}>Xóa</li>
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
