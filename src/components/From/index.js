import React, { useState } from 'react';
import './Form.css'; 

function Form() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <button onClick={toggleForm}>Hiển thị Form</button>
      {showForm && (
        <div className="overlay" onClick={toggleForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <form>
              <label>
                Tên:
                <input type="text" name="name" />
              </label>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
