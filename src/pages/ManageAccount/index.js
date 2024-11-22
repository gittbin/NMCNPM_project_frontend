import React, { useEffect, useRef, useState } from "react";
import './ManageAccount.css';
import { getRoles } from "../../services/Roles/rolesService";
import { useAuth } from "../../components/introduce/useAuth";
import { useLoading } from "../../components/introduce/Loading";
import { notify } from "../../components/Notification/notification";

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const { startLoading, stopLoading } = useLoading(); 
  const { user, loading } = useAuth();
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef(null);
  const [confirmOtp, setConfirmOtp] = useState(false);

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/accounts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Success:", data);
      if(data.message === 'Không có quyền truy cập'){
        notify(2,"Bạn không có quyền tạo tài khoản","Thất bại");
      }else{
        notify(1,"Tạo thành công tài khoản","Thành công");
      }
      stopLoading();
      await getAccounts(user._id); 
      setShowModal(false); 
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
          notify(2,"Xóa tài khoản thất bài","Thất bại");
          throw new Error(`Failed to delete account: ${response.statusText}`);
        }

        await getAccounts(user.id_owner); // Refresh the accounts list
        stopLoading();
        notify(1,"Xóa thành công tài khoản","Thành công");
      } catch (error) {
        notify(2,"Xóa tài khoản thất bài","Thất bại");
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
      password: account.password, // Assuming password can be left blank for editing
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
      notify(1,"Chỉnh sửa tài khoản thành công","Thành công");
      await getAccounts(user.id_owner); // Use await here as handleCreateAccount is async
      setShowModal(false); // Hide modal on success
    } catch (error) {
      notify(2,"Chỉnh sửa tài khoản thất bại","Thất bại");
      console.error("Error edit:",error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div className="modal-overlay">
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
              {/* {confirmOtp && (<>
                <div className="form-group">
                  <input
                    type="text"
                    name="code"
                    placeholder="Điền mã xác nhận "
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </div> 
                <p className="sentagain" onClick={sentagain} >Gửi lại mã</p></>
              )} */}
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
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
                placeholder="Password"
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
                    <div className="uy-dropdown-menu"  ref={dropdownRef}>
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
