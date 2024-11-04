import React, { useState, useEffect } from "react";
import '../Manage_product/history.css';
import { useAuth } from "../introduce/useAuth";
import {useLoading} from '../introduce/Loading'
import CustomerForm from "./formcustomer"
const History = ({turnoff,supplier}) => {
  const {startLoading,stopLoading}=useLoading();
    const [initialOrders,setInitialOrders]=useState([])
    const [formcustomer,setFormcustomer]=useState(false)
    const {user} =useAuth()
    const [x,setX]=useState(true)

useEffect(()=>{
  let body={
    user: user
        }
    const responses =async ()=>{
      startLoading()
      let response;
      if(!supplier){
        response = await fetch('http://localhost:5000/sell/get_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      }else{
        response = await fetch('http://localhost:5000/products/get_supplier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      }
      
      let datas = await response.json();
      console.log(datas)
      stopLoading();
      if(!supplier){
setInitialOrders(datas.customers)
      }else{
        setInitialOrders(datas.suppliers)
      }
      
}
responses();
},[x]) 
const change=()=>{
  setX(!x)
}
  // const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
//   Lọc các đơn hàng theo tìm kiếm
const filteredOrders = initialOrders.filter(order => 
    (order.name && order.name.includes(searchTerm)) ||
    (order.email && order.email.includes(searchTerm)) ||
    (order.phone && order.phone.includes(searchTerm)) ||
    (order.money && order.money.includes(searchTerm))
  );
  
  // Cập nhật selectedOrders mỗi khi filteredOrders thay đổi
  useEffect(() => {
    setSelectedOrders(new Array(filteredOrders.length).fill(false));
  }, [filteredOrders.length]); // Chỉ theo dõi độ dài của filteredOrders

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const onclosecustomer=()=>{
    setFormcustomer(false)
  }
  const onformcustomer=()=>{
    setFormcustomer(true)
  }
  function formatDateTime(isoString) {
    const date = new Date(isoString);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0 nên phải +1
    const day = date.getDate().toString().padStart(2, '0');
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}, ngày ${day}/${month}/${year}`;
}
  return (<>
    {formcustomer&&<CustomerForm close={onclosecustomer} change={change} supplier={supplier}/>}
    <div className="history-mgmt-main">
    <div className="history-mgmt-container">
    <div className="close" onClick={turnoff}>x</div>
      <div className="history-mgmt-header">
        <h2 className="history-mgmt-title">{!supplier?"Khách hàng":"Nhà cung cấp"}</h2>
        <div className="history-mgmt-header-controls">
          <input
            type="text"
            className="history-mgmt-search"
            placeholder="Search for..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="order-mgmt-history-btn" style={{marginLeft:"0px",marginRight:"20px"}} onClick={onformcustomer}>{!supplier?"Create customer":"Create supplier"}</button>
        </div>
        
      </div>

      <table className="history-mgmt-table">
        <thead>
          <tr>
            <th>Tên người tạo</th>
            <th>Date</th>
            <th>{!supplier?"Tên khách hàng":"Tên nhà cung cấp"}</th>
            <th>phone</th>
            {!supplier?(<><th>rate</th>
                       <th>money</th></>):(<></>)}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.creater.name}<br /> <small>{order.creater.email}</small></td>
              <td>{formatDateTime(order.createdAt)}</td>
              <td>{order.name} <br /> <small>{order.email}</small></td>
              <td>
                <span className={`history-mgmt-status ${order.action}`}>
                  {order.phone}
                </span>
              </td>
              {!supplier?(<><td>{order.rate}</td>
              <td>
              {order.money}
              </td></>):(<></>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div></div></>
  );
};

export default History;
