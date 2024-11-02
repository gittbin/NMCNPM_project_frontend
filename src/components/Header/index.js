import { RiSettings4Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import '../Header/Header.css'
import Modal from "../Modal/index.js";

function Header({size}) {
  return(
    <div className="header" style={{width:`${size}%`,marginLeft:`${100-size}%`}}>
      <div className="header__logo">Logo</div>
      <div className="header__right">
        <div className="header__setting"><RiSettings4Line /></div>
        <div className="header__notify"><FaRegBell /></div>
        <div className="header__user"><Modal /></div>
      </div>
    </div>
  )
}

export default Header;