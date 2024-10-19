// ProductDetail.js
import React, { useState,useRef } from 'react';
import '../Manage_product/Product_detail.css';
import { useLoading } from '../introduce/Loading';
const ProductDetail = ({ product, onClose, onUpdate }) => {
    const {startLoading,stopLoading} = useLoading()
    const CLOUD_NAME = "ddgrjo6jr";
    const UPLOAD_PRESET = "my-app";
    const [g,setg]=useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...product });
    const [products,Setproduct ] = useState(product)
    const [details,Setdetails]= useState('')
    const [link,SetLink]= useState(product.image?product.image.secure_url:"https://www.shutterstock.com/shutterstock/photos/600304136/display_1500/stock-vector-full-basket-of-food-grocery-shopping-special-offer-vector-line-icon-design-600304136.jpg")
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const scrollableRef = useRef(null);
    const scrollToTop = () => {
      if (scrollableRef.current) {
        scrollableRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    const startCamera = async () => {
        setShowCamera(true);
        scrollToTop()
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = streamRef.current;
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };
    const handleChange_link = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
        fileInputRef.current.value = ""; 
        SetLink(value)
    };
    const handleChangedetail=(e)=>{
        const {value} = e.target;
        Setdetails(value);
    }
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate =async (e) => {
        e.preventDefault();  
        let x={...editData};
        if(editData.image!=product.image&&editData.image){
            const imageData = new FormData();
            imageData.append('file', editData.image);
           imageData.append('upload_preset', UPLOAD_PRESET);
        try {     startLoading();
            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
                {
                  method: "POST",
                  body: imageData, // Gửi FormData trực tiếp mà không cần JSON.stringify
                }
              );
              const data = await cloudinaryResponse.json();
              const secure_url=data.secure_url
              const public_id=data.public_id
            x=({
                    ...x,
                    image: {secure_url, public_id } // Thêm thông tin hình ảnh
                })
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Đã xảy ra lỗi khi tải lên hình ảnh.");
      }
}
        onUpdate(x,details,editData.image!=product.image&&editData.image);
        Setproduct(editData)
        setIsEditing(false);
    };
    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        SetLink(imageUrl)
        if (streamRef.current) {
          const tracks = streamRef.current.getTracks();
          tracks.forEach(track => track.stop()); // Dừng từng track trong stream
          videoRef.current.srcObject = null; // Gán srcObject về null
          streamRef.current = null; // Đặt lại tham chiếu stream
        }
        setShowCamera(false); // Đóng camera sau khi chụp
        // Tạo một file blob từ imageUrl và đặt vào input file
        fetch(imageUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'capture.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
            setEditData(prevData => ({
              ...prevData,
              image: file // Lưu trữ file vào state
          }));
          });
      };
      const handleChangeimage=(e)=>{
        setEditData({
            ...editData,
            image: e.target.files[0]
          });
          const imageUrl = URL.createObjectURL(e.target.files[0]);
          console.log("Link ảnh đã được cập nhật:", imageUrl);
          SetLink(imageUrl);  // Cập nhật link với URL ngắn hơn
          
        }
     const stopCamera = () => {
        if (streamRef.current) {
          const tracks = streamRef.current.getTracks();
          tracks.forEach(track => track.stop()); // Dừng từng track trong stream
          videoRef.current.srcObject = null; // Gán srcObject về null
          streamRef.current = null; // Đặt lại tham chiếu stream
        }
        setShowCamera(false); // Đóng modal hoặc ẩn camera
      };
    return (
        <div className="product-detail-overlay">
            <div className="product-detail-container">
                <span className="close-button" onClick={onClose}>&times;</span>
                {!isEditing ? (
                    <div className="product-info">
                        <h2>name : {products.name}</h2>
                        <p><strong>Category:</strong> {products.category}</p>
                        <p><strong>Brand:</strong> {products.brand}</p>
                        <p><strong>SKU:</strong> {products.sku}</p>
                        <p><strong>Price:</strong> ${products.price}</p>
                        <p><strong>Stock:</strong> {products.stock}</p>
                        <p><strong>Reorder Level:</strong> {products.reorderLevel}</p>
                        <p><strong>Supplier:</strong> {products.supplier}</p>
                        <p><strong>Purchase Date:</strong> {new Date(products.purchaseDate).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {products.location}</p>
                        <p><strong>Status:</strong> {products.status}</p>
                        <p><strong>Unit:</strong> {products.unit}</p>
                        <p><strong>Purchase Price:</strong> ${products.purchasePrice}</p>
                        <p><strong>Notes:</strong> {products.notes}</p>
                        <p><strong>Link image :</strong> {products.image?products.image.secure_url:""}</p>
                        <img src={products.image?products.image.secure_url:"https://www.shutterstock.com/shutterstock/photos/600304136/display_1500/stock-vector-full-basket-of-food-grocery-shopping-special-offer-vector-line-icon-design-600304136.jpg"} alt="Product Image" className="product-image-show" /><br></br>
                        
                        <button className="edit-button-detail" onClick={handleEditToggle}>Edit</button>
                    </div>
                ) : (
                    <div className="product-edit-form">
                        <h2>Edit Product</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input type="text" id="name" name="name" value={editData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category *</label>
                                <input type="text" id="category" name="category" value={editData.category} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" id="brand" name="brand" value={editData.brand} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sku">SKU *</label>
                                <input type="text" id="sku" name="sku" value={editData.sku} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price *</label>
                                <input type="number" id="price" name="price" value={editData.price} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="purchasePrice">Purchase Price</label>
                                <input type="number" id="purchasePrice" name="purchasePrice" value={editData.purchasePrice} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" id="stock" name="stock" value={editData.stock} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reorderLevel">Reorder Level</label>
                                <input type="number" id="reorderLevel" name="reorderLevel" value={editData.reorderLevel} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="supplier">Supplier</label>
                                <input type="text" id="supplier" name="supplier" value={editData.supplier} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="purchaseDate">Purchase Date</label>
                                <input type="date" id="purchaseDate" name="purchaseDate" value={editData.purchaseDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" id="location" name="location" value={editData.location} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select id="status" name="status" value={editData.status} onChange={handleChange}>
                                    <option value="in_stock">In Stock</option>
                                    <option value="low_stock">Low Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="unit">Unit</label>
                                <input type="text" id="unit" name="unit" value={editData.unit} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notes</label>
                                <textarea id="notes" name="notes" value={editData.notes} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                <img src={link} className="product-image-show" alt="Product Image"/>
                                <div className='change_image' onClick={()=>{setg((x)=>{return !x})}}>Thay đổi ảnh</div>
                              {g&&<div className="form-group">
      <label htmlFor="image">Image (3 cách để nhập ảnh)</label>
      <p style={{marginBottom:"3px"}}>1. tải ảnh lên từ máy</p>
      <input type="file" ref={fileInputRef} name="image" onChange={handleChangeimage}/>
      <p style={{marginBottom:"3px",marginTop:"3px"}}>2. link ảnh trên mạng</p>
      <input type="text" id="image" name="image" value={editData.image} onChange={handleChange_link} />
      <p style={{marginBottom:"3px",marginTop:"3px"}}>3. chụp ảnh trực tiếp</p>
      <div className="capture" onClick={startCamera}>Chụp ảnh</div>

      {/* Modal hiển thị camera */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-container">
            <video ref={videoRef} autoPlay style={{ width: '100%' }} />
            <button className="button-capture" onClick={captureImage}>Chụp</button>
            <button  className="button-capture" onClick={stopCamera}>Hủy</button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

    </div>}  
                            </div>
                            <div className="form-group">
                                <label htmlFor="detail">Thông tin chi tiết thay đổi</label>
                                <textarea id="detail" name="detail" value={details} onChange={handleChangedetail}></textarea>
                            </div>
                            <div className="submit-row">
                                <button type="submit" className="save-button">Save</button>
                                <button type="button" className="cancel-button" onClick={handleEditToggle}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
