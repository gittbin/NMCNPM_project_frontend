import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { MdOutlineHome } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { TbPackageImport, TbPackageExport } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [selected, setSelected] = useState();  // Lưu trạng thái của mục được chọn
  const [isAddOpen, setIsAddOpen] = useState(false);  // Trạng thái mở/đóng dropdown của mục "Thêm"

  useEffect(() => {
    // Kiểm tra đường dẫn hiện tại và cập nhật trạng thái `selected`
    switch (location.pathname) {
      case '/home':
        setSelected(1);
        break;
      case '/home/manage-product':
        setSelected(2);
        break;
      case '/home/import':
        setSelected(3);
        break;
      case '/home/export':
        setSelected(4);
        break;
      case '/home/user-role':
      case '/home/manage-account':
      case '/home/permissions':
      case '/home/roles-group':
        setSelected(5);
        break;
      default:
        setSelected(1); // Nếu không khớp với bất kỳ trường hợp nào, có thể thiết lập mặc định là 1
    }
  }, [location.pathname]); // Chạy lại khi `pathname` thay đổi

  // Toggle trạng thái mở/đóng của mục "Thêm"
  const toggleAddDropdown = () => {
    setIsAddOpen(!isAddOpen);
  };

  return (
    <>
      <ul className="sidebar">
        <li className="sidebar__home">
          <Link className={`sidebar__link ${selected === 1 ? 'active' : ''}`} to='/home'>
            <div className="sidebar__icon"><MdOutlineHome /></div> 
            Home
          </Link>
        </li>
        <li className="sidebar__product">
          <Link className={`sidebar__link ${selected === 2 ? 'active' : ''}`} to='/home/manage-product'>
            <div className="sidebar__icon"><LuClipboardCheck /></div>
            Quản lí hàng hóa
          </Link>
        </li>
        <li className="sidebar__import">
          <Link className={`sidebar__link ${selected === 3 ? 'active' : ''}`} to='/home/import'>
            <div className="sidebar__icon"><TbPackageImport /></div>
            Quản lý kho
          </Link>
        </li>
        <li className="sidebar__export">
          <Link className={`sidebar__link ${selected === 4 ? 'active' : ''}`} to='/home/export'>
            <div className="sidebar__icon"><TbPackageExport /></div>
            Quản lý đơn hàng
          </Link>
        </li>
        <li className="sidebar__add">
          {/* Khi nhấn vào mục "Thêm", sẽ toggle trạng thái mở/đóng */}
          <div className={`sidebar__link ${selected === 5 ? 'active' : ''}`} onClick={toggleAddDropdown}>
            <div className="sidebar__icon"><IoAddCircleOutline /></div>
            Quản lí quyền người dùng
          </div>

          {/* Dropdown hiển thị các mục con nếu `isAddOpen` là true */}
          {isAddOpen && (
            <ul className="sidebar__submenu">
              <li>
                <Link className="sidebar__link" to='/home/manage-account'>
                  Quản lí tài khoản
                </Link>
              </li>
              <li>
                <Link className="sidebar__link" to='/home/permissions'>
                  Phân quyền
                </Link>
              </li>
              <li>
                <Link className="sidebar__link" to='/home/roles-group'>
                  Nhóm quyền
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
