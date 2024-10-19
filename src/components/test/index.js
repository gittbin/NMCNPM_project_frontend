import React, { useState, useEffect } from "react";
import '../test/index.css';

const initialOrders = [
  { id: 1532, client: "John Carter", email: "hello@johncarter.com", date: "Jan 30, 2024", status: "Delivered", country: "United States", total: 1099.24 },
  { id: 1531, client: "Sophie Moore", email: "contact@sophiemoore.com", date: "Jan 27, 2024", status: "Canceled", country: "United Kingdom", total: 5870.32 },
  { id: 1530, client: "Matt Cannon", email: "info@mattcannon.com", date: "Jan 24, 2024", status: "Delivered", country: "Australia", total: 13899.48 },
  { id: 1529, client: "Graham Hills", email: "hi@grahamhills.com", date: "Jan 21, 2024", status: "Pending", country: "India", total: 1569.12 },
  { id: 1528, client: "Sandy Houston", email: "contact@sandyhouston.com", date: "Jan 18, 2024", status: "Delivered", country: "Canada", total: 899.16 },
  { id: 1527, client: "Andy Smith", email: "hello@andysmith.com", date: "Jan 15, 2024", status: "Pending", country: "United States", total: 2449.64 },
];
let count=0;
const OrderManagement = () => {
  // const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Lọc các đơn hàng theo tìm kiếm
  const filteredOrders = initialOrders.filter(order => 
    order.client.toLowerCase().includes(searchTerm) ||
    order.email.toLowerCase().includes(searchTerm) ||
    order.country.toLowerCase().includes(searchTerm)
  );

  // Cập nhật selectedOrders mỗi khi filteredOrders thay đổi
  useEffect(() => {
    setSelectedOrders(new Array(filteredOrders.length).fill(false));
  }, [filteredOrders.length]); // Chỉ theo dõi độ dài của filteredOrders

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedOrders(new Array(filteredOrders.length).fill(newSelectAll));
  };

  const handleSelectOrder = (index) => {
    const newSelectedOrders = [...selectedOrders];
    newSelectedOrders[index] = !newSelectedOrders[index];
    if(newSelectedOrders[index]) count++;else{count--;}
    if(count>0) setSelectAll(true);else{setSelectAll(false)}
    setSelectedOrders(newSelectedOrders);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="order-mgmt-container">
      <div className="order-mgmt-header">
        <h2 className="order-mgmt-title">Order Status</h2>
        <div className="order-mgmt-header-controls">
          <input
            type="text"
            className="order-mgmt-search"
            placeholder="Search for..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <input
            type="month"
            className="order-mgmt-date-picker"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="order-mgmt-create-btn">Create Order</button>
        </div>
      </div>

      <table className="order-mgmt-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="order-mgmt-checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Order</th>
            <th>Client</th>
            <th>Date</th>
            <th>Status</th>
            <th>Country</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id}>
              <td>
                <input
                  type="checkbox"
                  className="order-mgmt-checkbox"
                  checked={selectedOrders[index] || false} // Tránh lỗi undefined
                  onChange={() => handleSelectOrder(index)}
                />
              </td>
              <td>#{order.id}</td>
              <td>{order.client} <br /> <small>{order.email}</small></td>
              <td>{order.date}</td>
              <td>
                <span className={`order-mgmt-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.country}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <button className="order-mgmt-button edit">✏️</button>
                <button className="order-mgmt-button delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;