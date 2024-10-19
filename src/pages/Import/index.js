// import ImageUpload from "../../components/Manage_product/image"
// import Change_password from"../../components/introduce/resetpassword.js"
import React, { useState } from 'react';
function Import(){
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      {selectedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ảnh đã tải lên:</h3>
          <img 
            src={selectedImage} 
            alt="Uploaded" 
            style={{ maxWidth: '300px', maxHeight: '300px' }} 
          />
        </div>
      )}
    </div>
  );
  }
  
  export default Import;