export const getRoles = async () => {
  try {
    const response = await fetch("http://localhost:5000/roles/show", {
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
      console.log("Da tao thanh cong");
    }else{
      console.log("Khong tao thanh cong");
    }
  } catch (error) {
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
    return data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};
