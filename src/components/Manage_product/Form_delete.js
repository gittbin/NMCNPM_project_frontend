import React, { useState } from 'react';
import "../Manage_product/Form_delete.css"
const DeleteProductModal = ({ product, onDelete, onClose2 }) => {
  const [reason, setReason] = useState('');

  const handleDelete = () => {
    if (reason.trim()) {
        console.log(product,reason);
      onDelete(product, reason); // Gọi hàm xóa với lý do
      onClose2(); // Đóng form sau khi xóa
    } else {
      alert('Vui lòng nhập lý do xóa!');
    }
  };

  return (
    <div className="delete_form-modal">
      <div className="delete_form-modal-content">
        <h2>Xác nhận xóa sản phẩm</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm {product.name}?</p>
        
        <div className="delete_form-input-group">
          <label htmlFor="reason">Lý do xóa:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do xóa"
          />
        </div>

        <div className="delete_form-actions">
          <button className="delete_form-btn-delete" onClick={handleDelete}>
            Xóa
          </button>
          <button className="delete_form-btn-cancel" onClick={onClose2}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
