import React, { useState ,useRef} from "react";
import "./ProductForm.css";
import { useAuth } from "../introduce/useAuth";
const ProductForm = ({turnoff,refresh}) => {
    const CLOUD_NAME = "ddgrjo6jr";
    const UPLOAD_PRESET = "my-app";
    const { user,loading} = useAuth();
    const [error,setError]=useState('');
    const [details,setDetails] = useState('');
    const [showCamera, setShowCamera] = useState(false);
    const [image, setImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const streamRef = useRef(null);
    // Bắt đầu hiển thị video từ camera
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
  
    // Chụp ảnh từ video
    const captureImage = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');
      setImage(imageUrl);
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
          setFormData(prevData => ({
            ...prevData,
            image: file // Lưu trữ file vào state
        }));
        });
    };
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    sku: "",
    price: "",
    stock: 0,
    reorderLevel: 10,
    supplier: "",
    purchaseDate: "",
    location: "",
    status: "in_stock",
    unit: "pcs",
    purchasePrice: "",
    notes: "",
    image:""
  });

  const handleChange = (e) => {setError("")
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };
 const handleChangeimage=(e)=>{
    setFormData({
        ...formData,
        image: e.target.files[0]
      });
    
 }
 const handleChangedetails=(e)=>{
    const {  value } = e.target;
    setDetails(value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(9999)
    console.log(formData.image);
    let body = {
user:user,
newPr:{...formData},
detail:details
    };
    if(formData.image){
            const imageData = new FormData();
            imageData.append('file', formData.image);
           imageData.append('upload_preset', UPLOAD_PRESET);
        try {     
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
            // Chuẩn bị dữ liệu sản phẩm để gửi lên backend
            body = {
                user: user, // Giả sử user có thuộc tính _id
                newPr: {
                    ...formData,
                    image: {secure_url, public_id } // Thêm thông tin hình ảnh
                },
                detail: details
            };
            console.log(secure_url)
    }catch (error) {
        console.error("Error uploading image:", error);
        alert("Đã xảy ra lỗi khi tải lên hình ảnh.");
      }
}
    console.log(JSON.stringify(body));
    fetch("http://localhost:5000/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
      if(data.message==="Success"){turnoff();  alert("Sản phẩm đã được thêm thành công!");refresh();}
      else{setError("SKUD bạn điền đã xuất hiện ở sản phẩm khác")}
      })
      .catch((error) => {
        console.log("Lỗi:", error);
      });
  };
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
    <div className="form-container" ref={scrollableRef}>
        <span className="close-button" onClick={turnoff}>&times;</span> {/* Dấu X để tắt form */}
    <h2>Product Entry Form</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="sku">SKU *</label>
                <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price</label>
                <input type="text" id="purchasePrice" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="reorderLevel">Reorder Level</label>
                <input type="number" id="reorderLevel" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="supplier">Supplier</label>
                <input type="text" id="supplier" name="supplier" value={formData.supplier} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="purchaseDate">Purchase Date</label>
                <input type="date" id="purchaseDate" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                </select>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" value={formData.unit} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
      <label htmlFor="image">Image</label>
      <input type="file" ref={fileInputRef} name="image" onChange={handleChangeimage}/>

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

      {image && (
        <div>
          <h3>Ảnh đã chụp:</h3>
          <img src={image} alt="Captured" style={{ width: '300px' }} />
        </div>
      )}
    </div>
            <div className="form-group">
                <label htmlFor="details">Thông tin chi tiết về thêm sản phẩm </label>
                <textarea id="details" name="details" value={details} onChange={handleChangedetails}></textarea>
            </div>
        </div>
        <p style={{color:"red"}}>{error}</p>
        <div className="submit-row">
            <div className="submit-group">
                <input type="submit" value="Submit" />
            </div>
        </div>
    </form>
</div>
  );
};

export default ProductForm;
