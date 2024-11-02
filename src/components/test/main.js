// import React, { useState } from 'react';
// import './form.css'; // Nhúng file CSS

// const CreateOrderForm = () => {
//   const [orderNumber, setOrderNumber] = useState('');
//   const [orderDate, setOrderDate] = useState('');
//   const [clientName, setClientName] = useState('');
//   const [clientEmail, setClientEmail] = useState('');
//   const [clientAddress, setClientAddress] = useState('');
//   const [country, setCountry] = useState('');
//   const [products, setProducts] = useState([{ name: '', quantity: 1, price: 0 }]);
//   const [status, setStatus] = useState('Pending');
//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handleAddProduct = () => {
//     setProducts([...products, { name: '', quantity: 1, price: 0 }]);
//   };

//   const handleProductChange = (index, field, value) => {
//     const newProducts = products.map((product, i) =>
//       i === index ? { ...product, [field]: value } : product
//     );
//     setProducts(newProducts);
//   };

//   const calculateTotal = () => {
//     return products.reduce((total, product) => total + product.quantity * product.price, 0);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       orderNumber,
//       orderDate,
//       clientName,
//       clientEmail,
//       clientAddress,
//       country,
//       products,
//       status,
//       paymentMethod,
//       totalAmount: calculateTotal(),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="create-order-form-container">
//       <h2 className="create-order-form-title">Tạo Đơn Hàng</h2>

//       <label className="create-order-form-label">Mã Đơn Hàng:</label>
//       <input className="input-sell"
//         type="text"
//         value={orderNumber}
//         onChange={(e) => setOrderNumber(e.target.value)}
//         className="create-order-form-input"
//         required
//       />

//       <label className="create-order-form-label">Ngày Đặt Hàng:</label>
//       <input
//         type="date"
//         value={orderDate}
//         onChange={(e) => setOrderDate(e.target.value)}
//         className="create-order-form-input"
//         required
//       />

//       <h3>Thông Tin Khách Hàng</h3>
//       <label className="create-order-form-label">Tên Khách Hàng:</label>
//       <input
//         type="text"
//         value={clientName}
//         onChange={(e) => setClientName(e.target.value)}
//         className="create-order-form-input"
//         required
//       />

//       <label className="create-order-form-label">Email Khách Hàng:</label>
//       <input
//         type="email"
//         value={clientEmail}
//         onChange={(e) => setClientEmail(e.target.value)}
//         className="create-order-form-input"
//         required
//       />

//       <label className="create-order-form-label">Địa Chỉ Khách Hàng:</label>
//       <textarea
//         value={clientAddress}
//         onChange={(e) => setClientAddress(e.target.value)}
//         className="create-order-form-textarea"
//         required
//       />

//       <label className="create-order-form-label">Quốc Gia:</label>
//       <select value={country} onChange={(e) => setCountry(e.target.value)} className="create-order-form-select" required>
//         <option value="">Chọn quốc gia</option>
//         <option value="VN">Việt Nam</option>
//         <option value="US">Hoa Kỳ</option>
//         <option value="UK">Anh</option>
//         <option value="AU">Úc</option>
//       </select>

//       <h3>Sản Phẩm</h3>
//       {products.map((product, index) => (
//         <div key={index}>
//           <label className="create-order-form-label">Tên Sản Phẩm:</label>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => handleProductChange(index, 'name', e.target.value)}
//             className="create-order-form-input"
//             required
//           />

//           <label className="create-order-form-label">Số Lượng:</label>
//           <input
//             type="number"
//             value={product.quantity}
//             min="1"
//             onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
//             className="create-order-form-input"
//             required
//           />

//           {/* <label className="create-order-form-label">Giá:</label>
//           <input
//             type="number"
//             value={product.price}
//             min="0"
//             onChange={(e) => handleProductChange(index, 'price', e.target.value)}
//             className="create-order-form-input"
//             required
//           /> */}
//         </div>
//       ))}
//       <button type="button" onClick={handleAddProduct} className="create-order-form-button">
//         Thêm Sản Phẩm
//       </button>

//       <label className="create-order-form-label">Trạng Thái:</label>
//       <select value={status} onChange={(e) => setStatus(e.target.value)} className="create-order-form-select">
//         <option value="Pending">Chờ Xử Lý</option>
//         <option value="Delivered">Đã Giao</option>
//         <option value="Canceled">Đã Hủy</option>
//       </select>

//       <label className="create-order-form-label">Phương Thức Thanh Toán:</label>
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="create-order-form-select"
//         required
//       >
//         <option value="">Chọn phương thức thanh toán</option>
//         <option value="Credit Card">Thẻ Tín Dụng</option>
//         <option value="PayPal">PayPal</option>
//         <option value="Bank Transfer">Chuyển Khoản Ngân Hàng</option>
//       </select>

//       <h4 className="create-order-form-total-amount">Tổng Tiền: ${calculateTotal().toFixed(2)}</h4>

//       <div className="create-order-form-button-container">
//         <button type="submit" className="create-order-form-button">
//           Tạo Đơn Hàng
//         </button>
//         <button type="reset" className="create-order-form-button create-order-form-reset-button">
//           Hủy
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CreateOrderForm;
import React, { useState ,useRef, useEffect} from "react";
import "./main.css";
import History from "./history"
import Quagga from 'quagga';
import { useLoading } from "../introduce/Loading";
import { useAuth } from "../introduce/useAuth";
import PaymentComponent from "./thanh_toan"
import CustomerForm from "./formcustomer"
const Billing = () => {
  const {startLoading,stopLoading}=useLoading();
  const [invoices, setInvoices] = useState([{ products: [] }]);
  const [currentInvoice, setCurrentInvoice] = useState(0);
  const [productCode, setProductCode] = useState("");
  const [tax, setTax] = useState(0);
  const [taxall, setTaxAll] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [camera,setCamera]=useState(false)
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { user,loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false); 
  const [data,setData]=useState([])
  const [customers,setCustomers]=useState([])
  const [suggestion,setSuggestion]=useState([])
  const [form,setForm]=useState(false)
  const [formcustomer,setFormcustomer]=useState(false)
  const [form_history,setForm_history]=useState(false)
  useEffect( ()=>{
    const a=async()=>{
          if (loading) { 
      startLoading();
      return;
    }
    let body={
      user: user
          }
    let response = await fetch('http://localhost:5000/sell/findcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let datas = await response.json();
    if(datas.message=="success") {
      console.log(datas.product)
      setData(datas.product)
    ;}
    else{alert("Load sản phẩm thất bại")}
     response = await fetch('http://localhost:5000/sell/get_customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
     datas = await response.json();
    if(datas.message=="success") {
      console.log(datas.customers)
      setCustomers(datas.customers)
    ;}
    else{alert("Load sản phẩm thất bại")}
    }
    a();
  },[loading])
  const addProduct =async (code="") => {
    let i=""
    if(code!=""){
      i=code;
    }
    if(productCode!="") i=productCode;
    if(i=="") return
    const updatedInvoices = [...invoices];
    if(updatedInvoices[currentInvoice].products.some((element)=>element.sku==i)){
      updatedInvoices[currentInvoice].products.forEach((element)=>{if(element.sku==i){element.quantity++;
        element.total = element.quantity * parseInt(element.price.replace(/\./g, ""), 10) * (1 - element.discount / 100);
        return}})
        
        setInvoices(updatedInvoices);
    }else{
      const result=data.find((element)=>element.sku==i)
      if(result){
        const newProduct = {
          ...result,
      // productCode:i,
      quantity:1,
      // price:parseFloat(result.price),
      discount:0,
      total:  parseInt(result.price.replace(/\./g, ""), 10) ,
      // name:result.name
    };
    updatedInvoices[currentInvoice].products.push(newProduct);
    setInvoices(updatedInvoices);
    ;
      }else{
        alert("Sản phẩm không tồn tại")
      }
    

}
  };

  const addInvoice = () => {
    setInvoices([...invoices, { products: [] }]);
    setCurrentInvoice(invoices.length);
  };

  const removeInvoice = (index) => {
    if(index==0) {return;};
    const updatedInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
    setCurrentInvoice((prev) => (prev === index ? 0 : prev - (prev > index ? 1 : 0)));
  };

  const handleDoubleClick = (index) => {
    setEditingIndex(index);
  };

  const handleBlur = () => {
    setEditingIndex(null);
  };

  const handleChangeProduct = (index, field, value) => {
    const updatedInvoices = [...invoices];
    const product = updatedInvoices[currentInvoice].products[index];

    product[field] = value;
    product.total = product.quantity * parseInt(product.price.replace(/\./g, ""), 10)* (1 - product.discount / 100);
    setInvoices(updatedInvoices);
  };
  const delete_prd=(index)=>{
    console.log(index);
    const updatedInvoices = [...invoices];
    let  update = invoices[currentInvoice].products
    update=update.filter((_,i)=>i!=index);
    invoices[currentInvoice].products=update
    setInvoices(updatedInvoices);
    ;

  }
  const totalBeforeTax = invoices[currentInvoice].products.reduce(
    (acc, product) => acc + product.total,
    0
  )*(1-taxall/100);

  const totalTax = totalBeforeTax * (tax / 100);
  const total = Math.round(totalBeforeTax + totalTax);
  const startCamera = async () => {
    setCamera(true);
    setIsProcessing(false);
    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {   
      videoRef.current.srcObject =streamRef.current ;}
    if (Quagga.initialized) {
      Quagga.stop(); // Dừng Quagga và tất cả các sự kiện hiện tại
  }
    // Chạy QuaggaJS để quét mã vạch
    if(videoRef.current){
      Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoRef.current, // Dùng video từ camera
            constraints: {
                facingMode: "environment" // Sử dụng camera sau
            },
            willReadFrequently: true 
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "upc_reader", "code_39_reader"], // Các loại mã vạch cần quét
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.initialized = true; // Đánh dấu rằng Quagga đã được khởi động
        Quagga.start(); });
    }
    
        Quagga.offDetected(); // Loại bỏ bất kỳ sự kiện onDetected nào trước đó
        Quagga.onDetected(async function  (result) {
          if (isProcessing) return; // Nếu đang xử lý thì bỏ qua các sự kiện tiếp theo
    setIsProcessing(true); // Đặt trạng thái để ngăn không xử lý lại
          const code = result.codeResult.code;   
          stopCamera();
          try {
            await addProduct(code); // Gọi hàm và chờ đợi
            setProductCode(code);
        } catch (error) {
            console.error("Error in addProduct:", error); // Bắt lỗi nếu có
        }finally {  
          setIsProcessing(false)
      }
        return;
      });
  };
  const stopCamera=()=>{
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      if (Array.isArray(tracks)) {
        tracks.forEach(track => { if (track && typeof track.stop === 'function') track.stop();});
      }
       // Dừng từng track trong stream
       if (videoRef.current) {   
        videoRef.current.srcObject = null;}

      streamRef.current = null; // Đặt lại tham chiếu stream
    }
    if(Quagga&&typeof Quagga.stop==='function'){
       Quagga.stop();
    }
   
    setCamera(false);
  }
  const onform=()=>{
    if(total>0){
      setForm(true);}
    
  }
  const onclose=()=>{
    setForm(false)
  }
  const onformcustomer=()=>{
    setFormcustomer(true)
  }
  const onclosecustomer=()=>{
    setFormcustomer(false)
  }
  const onclosehistory=()=>{
    setForm_history(false)
  }
  const onform_history=()=>{
    setForm_history(true)
  }
  return (<>
  {form_history&&<History turnoff={onclosehistory}/>}
  {formcustomer&&<CustomerForm close={onclosecustomer}/>}
   {form&&<PaymentComponent close={onclose} totalAmount={total} products={invoices[currentInvoice].products} customers={customers} discount={taxall} vat={tax}/>}
   {camera&&(<div className="camera-sell"><video ref={videoRef} autoPlay   width="400px" height="300px"/>

  <button  className="button-capture-sell button-sell" onClick={stopCamera} style={{backgroundColor:"red",color:"white"}}>Hủy</button></div>
  )}
    <div className="billing-container">
      <div className="invoice-bar">
        {invoices.map((_, index) => (
          <div key={index} className="invoice-tab">
            <button 
              className={index === currentInvoice ? "active button-sell" : "button-sell"}
              onClick={() => {setCurrentInvoice(index); setEditingIndex(null);}}
            >
              Hóa đơn {index + 1}
            </button>
            <button className="button-sell" onClick={() => removeInvoice(index)}>X</button>
          </div>
        ))}
        <button onClick={addInvoice} className="button-sell">Thêm Hóa Đơn</button>
      </div>
      <div className="top-bar">
        <div className="form-group-sell">
          <label className="label-sell">Mã sản phẩm (F1): </label>
          <input className="input-sell"
            type="text"
            value={productCode}
            onChange={(e) => {setProductCode(e.target.value)
              if(e.target.value!=""){
                const x=data.filter((product,index)=>product.sku.includes(e.target.value))
              setSuggestion(x)
              }else{
                setSuggestion([])
              }
              
            }}
          />
          <ul id="suggestions-sell">
            {suggestion.map((product,index)=>{
              return <li key={index} onClick={()=>{setProductCode(product.sku);setSuggestion([])}}>{product.sku}</li>
            })}
          </ul>
          <button style={{marginTop:"10px",color:"white"}} onClick={startCamera} className="button-sell" >Quét mã</button>      
        </div>
        <div className="xx">
        <button onClick={()=>addProduct()} style={{color:"white"}}  className="button-sell">Thêm sản phẩm</button><br/>
        <button   className="history" onClick={onform_history}>Lịch sử</button><br/>
        <button   className="create_user" onClick={onformcustomer}>Thêm khách hàng</button></div>
      </div>
      <div className="product-list">
        <h2>Danh sách sản phẩm</h2>
        <table>
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá bán</th>
              <th>Giảm giá (%)</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {invoices[currentInvoice].products.map((product, index) => (
              <tr key={index} onDoubleClick={() => handleDoubleClick(index)}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>
                  {editingIndex === index ? (
                    <input className="input-sell"
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        handleChangeProduct(index, "quantity", Number(e.target.value))
                      }
                      onBlur={handleBlur}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {
                    product.price
                  }
                </td>
                <td>
                  {editingIndex === index ? (
                    <input className="input-sell"
                      type="number"
                      value={product.discount}
                      onChange={(e) =>
                        handleChangeProduct(index, "discount", Number(e.target.value))
                      }
                      onBlur={handleBlur}
                    />
                  ) : (
                    product.discount
                  )}
                </td>
                <td>{product.total.toLocaleString('vi-VN')}</td>
                <td className="delete_prd" onClick={()=>{delete_prd(index)}}>x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="summary">
        <div className="form-group-sell">
          <label className="label-sell">Thuế suất (%): </label>
          <input className="input-sell"
            type="number"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
          />
           <label className="label-sell" style={{marginTop:"10px"}}>Giảm giá cho toàn bộ sản phẩm (%): </label>
          <input className="input-sell"
            type="number"
            value={taxall}
            onChange={(e) => setTaxAll(Number(e.target.value))}
          />
        </div>
        <div className="result">
          <h2 style={{marginTop:"10px"}}>Tổng hóa đơn: {total.toLocaleString('vi-VN')}</h2>
        </div>
        <button className="button-sell" style={{color:"white",marginTop:"10px"}} onClick={onform}>Thanh toán</button>
      </div>
    </div></>
  );
};

export default Billing;