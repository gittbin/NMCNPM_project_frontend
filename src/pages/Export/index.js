// import React, { useState } from "react";
// import Billing from "../../components/test/form";
// import Modal from "./../../components/ComponentExport/Modal";
// import ExportHeader from "../../components/ComponentExport/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faEllipsisVertical,
// } from "@fortawesome/free-solid-svg-icons";
// import "./export.css";

// function Export() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const linkimg =
//     "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg";
//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
//   const handleSearch = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);

//     // Giả lập một danh sách sản phẩm (có thể thay bằng API call)
//     const products = [
//       "Sản phẩm A",
//       "Sản phẩm B",
//       "Sản phẩm C",
//       "Sản phẩm D",
//       "Sản phẩm C",
//       "Sản phẩm D",
//     ];

//     // Tìm kiếm các sản phẩm phù hợp
//     const filteredResults =
//       term.trim() === ""
//         ? []
//         : products
//             .filter((product) =>
//               product.toLowerCase().includes(term.toLowerCase().trim())
//             )
//             .slice(0, 5);

//     setResults(filteredResults);
//   };
//   const handleBlur = () => {
//     setShowDropdown(false); // Ẩn dropdown khi mất tiêu điểm
//   };

//   return (
//     <div>
//       <ExportHeader
//         content={{
//           title: "Order Mangagement",
//           btn1: "Create order",
//           btn2: "History",
//         }}
//         onCreateOrder={openModal}
//       />
//       <Modal isOpen={isOpen} onClose={closeModal}>
//         <div className="Modal-title">Create your order opening</div>
//         <div className="divide"></div>
//         <div className="header-order">
//           <div className="search-container">
//             <span style={{ display: "block", paddingTop: "10px" }}>
//               Tìm kiếm:{" "}
//             </span>
//             <div className="search-result-container">
//             <input
//                 type="text"
//                 className="order-mgmt-search"
//                 placeholder="Search by code or product name"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 onBlur={handleBlur} // Thêm onBlur để ẩn dropdown
//                 onFocus={() => setShowDropdown(true)} // Hiển thị dropdown khi focus
//               />
//               {showDropdown && results.length > 0 && (
//                 <ul className="dropdown">
//                   {results.map((result, index) => (
//                     <li key={index} className="search-item">
//                       <div className="search-container-item">
//                         {result}
//                         <div
//                           className="search-container-img"
//                           style={{ backgroundImage: `url(${linkimg})` }}
//                         ></div>
//                       </div>
//                       <div
//                         className="divide"
//                         style={{ margin: "8px 2px 0", background: "white" }}
//                       ></div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//           <button className="btn-add-order">Add to order</button>
//         </div>
//         <div className="body-modal">
//           <ContentOrder />
//           <div className="complete-order">
//             <button>
//               Complete
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// const ContentOrder = () => {
//   const [listProductWereAdded, setListProductWereAdded] = useState([
//     {
//       name: "tesla cybertruck",
//       description:
//         "With a maximum payload of 2,500 pounds and 67 cubic feet of lockable storage, Cybertruck has all the capacity you need.",
//       supplier: "tesla",
//       price: 12,
//       status: "order",
//       quantity: 1,
//       imageUrl:
//         "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
//     },
//     {
//       name: "tesla cybertruck",
//       description:
//         "With a maximum payload of 2,500 pounds and 67 cubic feet of lockable storage, Cybertruck has all the capacity you need.",
//       supplier: "tesla",
//       price: 12,
//       status: "order",
//       quantity: 1,
//       imageUrl:
//         "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
//     },
//     {
//       name: "tesla cybertruck",
//       description:
//         "With a maximum payload of 2,500 pounds and 67 cubic feet of lockable storage, Cybertruck has all the capacity you need.",
//       supplier: "tesla",
//       price: 12,
//       status: "order",
//       quantity: 1,
//       imageUrl:
//         "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
//     },
//   ]);

//   const [quantities, setQuantities] = useState(
//     listProductWereAdded.map((product) => product.quantity) // Khởi tạo mảng quantity từ listProductWereAdded
//   );
//   const [isOpen, setIsOpen] = useState(
//     new Array(listProductWereAdded.length).fill(false)
//   ); // Khởi tạo mảng isOpen
//   const amountBill = ()=>{
//     let sum =0;
//     listProductWereAdded.forEach((product)=>{
//       sum+=product.price*product.quantity;
//     })
//     return sum;
//   }
//   const toggleDropdown = (index) => {
//     setIsOpen((prev) => {
//       const newOpen = [...prev];
//       newOpen[index] = !newOpen[index]; // Đảo ngược giá trị tại index
//       return newOpen;
//     });
//   };

//   const increase = (index) => {
//     setListProductWereAdded((prev) => {
//       const newQuantities = [...prev]
//       newQuantities[index].quantity += 1; // Tăng giá trị
//       return newQuantities;
//     });
//   };

//   const decrease = (index) => {
//     setListProductWereAdded((prev) => {
//       const newQuantities = [...prev]
//       newQuantities[index].quantity += 1; // Tăng giá trị
//       return newQuantities;
//     });
//   };

//   const handleRemove = (index) => {
//     setListProductWereAdded((prev) => {
//       const newList = [...prev];
//       newList.splice(index, 1); // Xoá phần tử
//       return newList;
//     });

//     setQuantities((prev) => {
//       const newQuantities = [...prev];
//       newQuantities.splice(index, 1); // Cập nhật mảng quantities
//       return newQuantities;
//     });

//     setIsOpen((prev) => {
//       const newOpen = [...prev];
//       newOpen.splice(index, 1); // Cập nhật mảng isOpen
//       return newOpen;
//     });
//   };

//   return (
//     <>
//       <div className="list-product-title">List product </div>
//       <div className="list-product-content">
//         <div className="list-product-detail">
//           <table>
//             <thead>
//               <tr>
//                 <th>STT</th>
//                 <th>Ảnh Mô Tả</th>
//                 <th>Sản Phẩm</th>
//                 <th>Nhà Cung Cấp</th>
//                 <th>Số Lượng</th>
//                 <th>Thành Tiền</th>
//                 <th>Status</th>
//                 <th>Fix</th>
//               </tr>
//             </thead>
//             <tbody>
//               {listProductWereAdded.map((product, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <div
//                         className="body-container-img-description"
//                         style={{ backgroundImage: `url(${product.imageUrl})` }}
//                       ></div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="modal-body-product-name">
//                       {product.name}
//                     </div>
//                     <div className="modal-body-product-description">
//                       {product.description}
//                     </div>
//                   </td>
//                   <td>{product.supplier}</td>
//                   <td>
//                     <div className="Quantity">
//                       <button
//                         className="Quantity-button"
//                         onClick={() => decrease(index)}
//                       >
//                         -
//                       </button>
//                       <input
//                         value={listProductWereAdded[index].quantity}
//                         className="Quantity-input"
//                         readOnly // Để ngăn không cho người dùng chỉnh sửa
//                       />
//                       <button
//                         className="Quantity-button"
//                         onClick={() => increase(index)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>
//                     {(product.price * listProductWereAdded[index].quantity).toLocaleString()} VND
//                   </td>
//                   <td>
//                     <div className="product-status">{product.status}</div>
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         height: 24,
//                       }}
//                     >
//                       <div style={{ position: "relative" }}>
//                         <button
//                           className="detail-button"
//                           onClick={() => toggleDropdown(index)}
//                         >
//                           <FontAwesomeIcon icon={faEllipsisVertical} />
//                         </button>
//                         {isOpen[index] && (
//                           <div className="dropdownRemove">
//                             <button onClick={() => handleRemove(index)}>
//                               Xoá
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="order-tax">VAT TAX 10%: <span style={{fontSize:16,fontWeight:300}} >{(amountBill()*0.1).toFixed(2)} VND</span> </div>
//         <div className="order-tax">Tổng tiền: <span style={{fontSize:16,fontWeight:300}} >{(amountBill()*1.1).toFixed(2)} VND</span></div>
//       </div>
//     </>
//   );
// };

// export default Export;
import Billing from '../../components/export/main'
function Export(){
    return(
      <>
        <Billing />
      </>
    )
  }
  
  export default Export;
// import React from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const data = [
//   { name: 'Jan', Subscribers: 270, 'New Visitors': 150, 'Active Users': 542 },
//   { name: 'Feb', Subscribers: 310, 'New Visitors': 180, 'Active Users': 520 },
//   { name: 'Mar', Subscribers: 350, 'New Visitors': 200, 'Active Users': 560 },
//   { name: 'Apr', Subscribers: 330, 'New Visitors': 220, 'Active Users': 480 },
//   { name: 'May', Subscribers: 450, 'New Visitors': 260, 'Active Users': 550 },
//   { name: 'Jun', Subscribers: 400, 'New Visitors': 290, 'Active Users': 580 },
//   { name: 'Jul', Subscribers: 460, 'New Visitors': 320, 'Active Users': 620 },
//   { name: 'Aug', Subscribers: 510, 'New Visitors': 340, 'Active Users': 680 },
//   { name: 'Sep', Subscribers: 252, 'New Visitors': 360, 'Active Users': 740 },
//   { name: 'Oct', Subscribers: 680, 'New Visitors': 390, 'Active Users': 820 },
//   { name: 'Nov', Subscribers: 780, 'New Visitors': 420, 'Active Users': 890 },
//   { name: 'Dec', Subscribers: 900, 'New Visitors': 450, 'Active Users': 980 }
// ];

// const Export = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <AreaChart data={data}>
//   <XAxis dataKey="name" />
//   <YAxis type="number" domain={[0, 'dataMax']} />
//   <CartesianGrid strokeDasharray="3 3" />
//   <Tooltip />
//   <Legend />
//   <Area type="monotone" dataKey="New Visitors" stroke="#ffa726" fill="#1e88e5" fillOpacity={0.8} />
//   <Area type="monotone" dataKey="Subscribers" stroke="#ff6b6b" fill="red" fillOpacity={0.6} />
//   <Area type="monotone" dataKey="Active Users" stroke="#2196f3" fill="#0277bd" fillOpacity={0.4} />
// </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export default Export;
