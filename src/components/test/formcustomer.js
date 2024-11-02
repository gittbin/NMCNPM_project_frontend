import React, { useState } from 'react';
import './formcustomer.css';
import { useLoading } from '../introduce/Loading';
import { useAuth } from "../introduce/useAuth";
function CustomerForm({close,show_customer,show_bill}) {
    const { user ,loading} = useAuth();
    const {stopLoading,startLoading} =useLoading();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setCustomer({
                ...customer,
                address: {
                    ...customer.address,
                    [addressField]: value
                }
            });
        } else {
            setCustomer({ ...customer, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
      const response = await fetch('http://localhost:5000/sell/create_customer', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...customer,user: user}),
      });
      const data = await response.json();
      stopLoading();
      if(data.message=="success"||data.message=="Số điện thoại này đã được đăng ký"){
        alert(data.message);
      }

    };
    console.log(show_bill)
    return (
        <div className='customer'>
        <div className="customer-form">
        {!show_customer&&!show_bill ? (<h2>Thêm Khách Hàng Mới</h2>):(show_customer? <h2>Thông tin khách hàng</h2>:<h2>Thông tin hóa đơn</h2>)}
            <p className='close-customer' onClick={close}>x</p>
            <form onSubmit={handleSubmit}>
                {!show_customer&&!show_bill ? (
                    <>
                   <label>
                    Tên khách hàng:
                    <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Số điện thoại * :
                    <input
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Thêm Khách Hàng</button> 
                </>
                ):(
    show_customer ? (
<>  
                   <label>
                    Tên khách hàng:
                    <p style={{display:"inline-block"}}>{show_customer.name}</p>
                </label>
                <label>
                    Email:
                    <p style={{display:"inline-block"}}>{show_customer.email}</p>
                </label>
                <label>
                    Số điện thoại:
                    <p style={{display:"inline-block"}}>{show_customer.phone}</p>
                </label>
                <label>
                    tổng số tiền đã trả :
                    <p style={{display:"inline-block"}}>{show_customer.money + " đồng"}</p>
                </label>
                <label>
                    Rate:
                    <p style={{display:"inline-block"}}>{show_customer.rate}</p>
                </label>
                </>
    ):(  
<>  
{show_bill.map((item,index)=>{
    return(<>
        <label key={index}>
                    Tên sản phẩm:
                    <p style={{display:"inline-block"}}>{item.name}</p>
                </label>
                <label>
                    Số lượng:
                    <p style={{display:"inline-block"}}>{item.quantity}</p>
                </label>
                <label>
                    Giá tiền/1 sản phẩm:
                    <p style={{display:"inline-block"}}>{item.price}</p>
                </label>
                <label>
                    tổng số tiền  :
                    <p style={{display:"inline-block"}}>{item.totalAmount}</p>
                </label>
                <label style={{borderBottom: "2px solid black", paddingBottom: "5px"}}>
                    discount:
                    <p style={{display:"inline-block"}}>{item.discount}</p>
                </label></>
    )
})}
                   
                </>
    )

                )}
                
            </form>
        </div></div>
    );
}

export default CustomerForm;
