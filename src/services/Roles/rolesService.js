import { notify } from '../../components/Notification/notification';

export const getRoles = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/roles/show?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  } finally {

  }
};

export const createRole = async (newRoleData) => {
  try {
    const response = await fetch("http://localhost:5000/roles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoleData),
    });
    const data = await response.json();
    if(data){
      notify(1,"Tạo thành công quyền mới","Thành công");
    }else{
      notify(2,"Tạo quyền mới thất bại","Thất bại");
      console.log("Khong tao thanh cong");
    }
  } catch (error) {
    notify(2,"Tạo quyền mới thất bại","Thất bại");
    console.error("Error creating role:", error);
    throw error;
  }
};

export const deleteRole = async (roleId, user) => {
  try {
    const response = await fetch(`http://localhost:5000/roles/delete/${roleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        role_id: roleId,
      }),
    });
    const data = await response.json();
    notify(1,"Xóa quyền thành công","Thành công");
    return data;
  } catch (error) {
    notify(2,"Xóa quyền thất bại","Thất bại");
    console.error("Error deleting role:", error);
    throw error;
  }
};
