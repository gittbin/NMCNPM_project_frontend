// src/ProductGrid.js
import React,{useState,useEffect} from "react";
import "../Manage_product/item.css";
import { useAuth } from "../introduce/useAuth";
import ProductDetail from "./Product_detail"
const ProductGrid = ({ selectedCategory ,reload, searchTerm,sortByA,sortByB}) => {
  const { user ,loading} = useAuth();
  const[products,setProducts] = useState([])
  const[product,setProduct] = useState()
  const[x,setX] = useState()
    useEffect(() => {
      const fetchProducts = async () => {
        if (loading) { console.log("Loading user data.");
          return <div>Loading user data...</div>; // Hiển thị khi đang tải dữ liệu người dùng
        }
        try {console.log("render")
          const response = await fetch('http://localhost:5000/products/show', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user:user,
            }),
          });
          
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          let o=[]
          for(let i=0;i<data.length;i++) {
          if(!o.includes(data[i].category)){o=[...o,data[i].category]}
          }
          reload(o);
          setProducts(data);
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };
  
      fetchProducts();
    }, [user,x]); // Thêm user vào dependency array
  
    const show=async (a)=>{
      console.log('http://localhost:5000/products/show/'+a)
      const response = await fetch('http://localhost:5000/products/show/'+a, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setProduct({...data})
    }
    const dlt=async (a)=>{
      const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${a.name}" không?`);
      if (isConfirmed) {
        const response = await fetch('http://localhost:5000/products/deletes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user:user,
            product_delete:a
          }),
        });
        const data = await response.json();
        if(data.message=="Product deleted successfully") {alert(`Sản phẩm "${a.name}" đã được xóa thành công!`);setX("delete");}
        else{alert("Thất bại")}
      }
    }
    const onClose=()=>{
      console.log("onClose")
      setProduct(false);
    }
    let filteredProducts= products.slice();
    if (selectedCategory) {
      filteredProducts = products.filter(product => product.category === selectedCategory);
    } 
    if(searchTerm!=""){
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
    
    if(sortByA=="Giá bán"){console.log(1)
      filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }else if(sortByA=="Giá nhập"){
      filteredProducts.sort((a, b) => Number(a.purchasePrice) - Number(b.purchasePrice));
    }else if(sortByA=="Tên"){
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if(sortByB=="Từ cao đến thấp"){
      filteredProducts.reverse()
    }
  const onUpdate=async(a)=>{
    console.log(a)
    const response = await fetch('http://localhost:5000/products/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:user,
        product_edit:a
      }),
    });
    const data = await response.json();
    console.log(data)
    if(data.message=="success") {alert(`Sản phẩm "${a.name}" đã được cập nhật thành công!`);setX("edit");setProduct(false)}
    else{alert("Thất bại")}
  }
    return (
      <>
      {product&& <ProductDetail product={product} onClose={onClose} onUpdate={onUpdate}/>}
      <div className="product-grid">
        {filteredProducts.map((product,index) => (
          <div className="item" key={index}>
            <div className="product-card">
              <img src={product.image} alt="Product Image" className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <div className="actions">
                <button className="action-button edit-button" onClick={()=>show(product._id)}>chi tiết</button>
                <button className="action-button delete-button" onClick={()=>dlt(product)}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
        
      </div></>
    );
  };
  
  export default ProductGrid;