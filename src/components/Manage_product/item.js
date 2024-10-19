// src/ProductGrid.js
import React,{useState,useEffect} from "react";
import "../Manage_product/item.css";
import { useAuth } from "../introduce/useAuth";
import ProductDetail from "./Product_detail"
import DeleteProductModal from "./Form_delete"
import {useLoading} from "../introduce/Loading"
const ProductGrid = ({ selectedCategory ,reload, searchTerm,sortByA,sortByB}) => {
  const { startLoading, stopLoading } = useLoading();
  const { user ,loading} = useAuth();
  const[products,setProducts] = useState([])
  const[product,setProduct] = useState()
  const[x,setX] = useState()
  const [fdelete,SetFdelete]=useState(false)
    useEffect(() => {
      const fetchProducts = async () => {
        if (loading) { 
          startLoading();
          return;
        }
        try {console.log("render");startLoading();
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
          stopLoading()
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };
  
      fetchProducts();
    }, [user,x]); // Thêm user vào dependency array
  
    const show=async (a)=>{
      startLoading();
      const response = await fetch('http://localhost:5000/products/show/'+a, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      stopLoading();
      setProduct({...data})
    }
    const onDelete=async (a,b)=>{
      startLoading();
        const response = await fetch('http://localhost:5000/products/deletes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user:user,
            product_delete:a,
            detail:b
          }),
        });
        const data = await response.json();
        stopLoading()
        if(data.message=="Product deleted successfully") {alert(`Sản phẩm "${a.name}" đã được xóa thành công!`);setX((a)=>{if(a=="edit") return "";else{return "edit"}} );}
        else{alert("Thất bại")}
    }
    const onClose=()=>{
      setProduct(false);
    }
    const onClose2=()=>{
      SetFdelete(false);
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
  const onUpdate=async(a,b,c)=>{
    let body={
      user:user,
      product_edit:a,
      detail:b,
      check:c
    }
    startLoading()
    const response = await fetch('http://localhost:5000/products/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    stopLoading()
    if(data.message=="success") { setProduct(false);
      setX((a)=>{if(a=="edit") return "";else{return "edit"}} );
      setTimeout(() => {
        alert(`Sản phẩm "${a.name}" đã được cập nhật thành công!`)
      }, 100);
    ;}
    else{alert("Thất bại")}
  }
    return (
      <>
      {product&& <ProductDetail product={product} onClose={onClose} onUpdate={onUpdate}/>}
      {fdelete&& <DeleteProductModal product={fdelete} onClose2={onClose2} onDelete={(a,b)=>onDelete(a,b)}/>}
      <div className="product-grid">
        {filteredProducts.map((product,index) => (
          <div className="item" key={index}>
            <div className="product-card">
              <img src={product.image?product.image.secure_url:"https://www.shutterstock.com/shutterstock/photos/600304136/display_1500/stock-vector-full-basket-of-food-grocery-shopping-special-offer-vector-line-icon-design-600304136.jpg"} alt="Product Image" className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <div className="actions">
                <button className="action-button edit-button" onClick={()=>show(product._id)}>chi tiết</button>
                <button className="action-button delete-button" onClick={()=>SetFdelete(product)}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
        
      </div></>
    );
  };
  
  export default ProductGrid;