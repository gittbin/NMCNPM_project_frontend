import React, { useState,useEffect } from "react";
import "./thanh_toan.css";
import { useLoading } from "../introduce/Loading";
import { useAuth } from "../introduce/useAuth";
import { notify } from '../../components/Notification/notification';
function PaymentComponent({close,products,totalAmount,customers,discount,vat}) {
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerPaid, setCustomerPaid] = useState(0);
  const [change, setChange] = useState(0);
  const [cashAmount, setCashAmount] = useState(0);
  const [bankAmount, setBankAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [suggestions, setSuggestion] = useState([])
  const {startLoading, stopLoading} = useLoading()
  const { user ,loading} = useAuth();
  const handleCustomerPaidChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setCustomerPaid(amount);
    if(amount - totalAmount>0){
      setChange((amount - totalAmount).toLocaleString('vi-VN'));
    }else{
      setChange(0)
    }
    
  };
  const success=async ()=>{
    try {
      console.log(String(discount),String(vat))
      const billData = {
        creater:user._id,
        discount:String(discount),
        vat:String(vat),
        owner: products[0].owner,
        customerId: customerPhone,
        totalAmount: totalAmount.toLocaleString('vi-VN'),
        items: products.map((product)=>({
          productID:product._id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          discount: product.discount,
          totalAmount:product.total.toLocaleString('vi-VN')
        })),
        paymentMethod: selectedBank ? 'Ngân hàng' : 'Tiền mặt',
        notes: '',
      };
      startLoading()
      const response = await fetch('http://localhost:5000/sell/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });
      stopLoading()
      if (response.ok) {
        
        notify(1,'lưu hóa đơn thành công',"Thành công");
        await close();
      } else {
        notify(2,'Failed to save bill',"Thất bại");
      }
    } catch (error) {
      console.error('Error:', error);
      notify(2,'',"Có lỗi xảy ra");
    }
  }
  return (
    <div>
        <div className="modal-overlay">
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>KHÁCH THANH TOÁN</h2>
            <p className="delete_bill" onClick={close}>x</p>
            <div>
              <label>Chọn máy in</label>
              <select>
                <option>Microsoft Print to PDF</option>
              </select>
            </div>
            <div>
              <label>Mẫu in hóa đơn</label>
              <select>
                <option>Hóa đơn bán hàng</option>
              </select>
            </div>
            <div>
              <label>Khách hàng</label>
              <input
                type="text"
                placeholder="Số điện thoại"
                value={customerPhone}
                onChange={(e) => {setCustomerPhone(e.target.value)

                  if(e.target.value!=""){
                    const x=customers.filter((customer,index)=>customer.phone.includes(e.target.value))
                  setSuggestion(x)
                  }else{
                    setSuggestion([])
                  }
                }}
              />
              <ul id="suggestions-sell">
            {suggestions.map((customer,index)=>{
              return <li key={index} onClick={()=>{setCustomerPhone(customer.phone);setSuggestion([])}}>{customer.phone}</li>
            })}
          </ul>
            </div>
            <div className="total-amount">
              <label>Tổng tiền phải trả</label>
              <p style={{marginTop:"5px"}}>{totalAmount.toLocaleString('vi-VN')} VND</p>
            </div>
            <div>
              <label>Tiền khách đưa</label>
              <input
                type="number"
                value={customerPaid}
                onChange={handleCustomerPaidChange}
              />
            </div>
            <div>
              <label>Tiền trả lại khách</label>
              <input type="text" value={change} readOnly />
            </div>

            <h3>Hình thức thanh toán</h3>
            <div>
              <label>Tiền mặt</label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label>Tiền ngân hàng</label>
              <input
                type="number"
                value={bankAmount}
                onChange={(e) => setBankAmount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label>Ngân hàng</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">--Vui lòng chọn Ngân hàng--</option>
                <option value="bank1">Ngân hàng A</option>
                <option value="bank2">Ngân hàng B</option>
              </select>
            </div>

            <div className="button-group">
              <button onClick={success}>F5 In</button>
              <button className="cancel-button" onClick={close}>ESC Bỏ qua</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PaymentComponent;
