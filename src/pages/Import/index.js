// import ImageUpload from "../../components/Manage_product/image"
// import Change_password from"../../components/introduce/resetpassword.js"
import OrderManagement from "../../components/test/index";
import ModalHistory from "./ModalHistory";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Modal from "./../../components/ComponentExport/Modal";
import "./import.css";
import ModalDetail from "./ModalDetail";
import  { useAuth }  from '../../components/introduce/useAuth'

function Import() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suppOrPro, setSuppOrPro] = useState(false);
  const [idProductAdded, setIdProductAdded] = useState([]);
  const [idOrder, setIdOrder] = useState(null);
  const { user, logout } = useAuth();
  // const id_owner = user.id_owner;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModalHistory = () => setOpenHistory(true);
  const closeModalHistory = () => setOpenHistory(false);
  const closeModalDetail = () => setOpenDetail(false);
  const openModalDetail = () => setOpenDetail(true);
  const handleSearch = (event) => {
    const term = event.target.value;
    let keyword = term.trim();
    setSearchTerm(term);
    if (keyword.startsWith("@All")) {
      keyword = keyword.substr(4).trim();
      setSuppOrPro(false);
      if (keyword.length > 0) {
        debouncedFetchSuggestions(
          keyword,
          `http://localhost:5000/import/supplier/search`,
        );
      } else {
        setSuggestions([]); // Nếu không có từ khóa, xóa kết quả gợi ý
      }
    } else {
      setSuppOrPro(true);
      if (keyword.length > 0) {
        debouncedFetchSuggestions(
          keyword,
          `http://localhost:5000/import/products/exhibitProN`
        );
      } else {
        setSuggestions([]); // Nếu không có từ khóa, xóa kết quả gợi ý
      }
    }
  };
  // database
  const fetchProductSuggestions = async (keyword, hrefLink) => {
    try {
      console.log(user)
        const response = await axios.get(hrefLink, {
          params: {
            query: keyword,
            ownerId: user.id_owner,
          },
        });
        const sugg = response.data.map((s) => s.name);
        setResults(sugg);
        setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  const debouncedFetchSuggestions = useCallback(
    debounce(
      (keyword, hrefLink) => fetchProductSuggestions(keyword, hrefLink),
      500
    ),
    [] // Chỉ tạo ra một lần
  );

  const handleAddToOrder = async () => {
    const idPro = suggestions.filter((sugg) => sugg.name == searchTerm);
    setSuggestions([]);
    const suppliersId = idPro ? idPro[0] : null;
    try {
      // Gửi request GET với query string chứa productId
      if (suppliersId) {
        let response;
        if (!suppOrPro) {
          response = await fetch(
            `http://localhost:5000/import/products/exhibitPro?productId=${suppliersId._id}&ownerId=${user.id_owner}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }

        // Kiểm tra nếu request thành công
        if (!suppOrPro && response.ok) {
          const data = await response.json(); // Dữ liệu trả về từ server (có thể là chi tiết sản phẩm)
          setIdProductAdded(data);
          // Xử lý dữ liệu từ server (Hiển thị thông tin đơn hàng, ví dụ...)
          setSearchTerm("");
          setResults([]);
        } else if (suppOrPro) {
          setIdProductAdded(idPro);
          setSearchTerm("");
          setResults([]);
        } else {
          console.error("Error adding to order");
        }
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 700);
  };
  const handleSelectLiResult = (result) => {
    setSearchTerm(result); // Cập nhật giá trị input với kết quả đã chọn
    setShowDropdown(false); // Ẩn dropdown sau khi chọn
  };
  if(!user)return null;
  return (
    <>
      <OrderManagement
        onCreateOrder={openModal}
        onHistory={openModalHistory}
        openModalDetail={openModalDetail}
        setIdOrder={setIdOrder}
      />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="Modal-title">Create your order opening</div>
        <div className="divide"></div>
        <div className="header-order">
          <div className="search-container">
            <div style={{ display: "flex", flex: 1, marginLeft: 10 }}>
              <span style={{ display: "block", paddingTop: "10px" }}>
                Tìm kiếm:{" "}
              </span>
              <div className="search-result-container">
                <input
                  type="text"
                  style={{ flex: 1 }}
                  className="order-mgmt-search"
                  placeholder="Search by code or product name"
                  value={searchTerm}
                  onChange={handleSearch}
                  onBlur={handleBlur} // Thêm onBlur để ẩn dropdown
                  onFocus={() => setShowDropdown(true)} // Hiển thị dropdown khi focus
                />
                {showDropdown && results.length > 0 && (
                  <ul className="dropdown">
                    {results.map((result, index) => (
                      <li
                        key={index}
                        className="search-item"
                        onClick={() => handleSelectLiResult(result)}
                      >
                        <div className="search-container-item">
                          {result}
                          {suppOrPro && suggestions.length > 0 && (
                            <div
                              className="search-container-img"
                              style={{
                                backgroundImage: `url(${suggestions[index].image.secure_url})`,
                              }}
                            ></div>
                          )}
                        </div>
                        <div
                          className="divide"
                          style={{ margin: "8px 2px 0", background: "white" }}
                        ></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <button className="btn-add-order" onClick={handleAddToOrder}>
            Add to order
          </button>
        </div>
        <div className="body-modal">
          <ContentOrder
            dataHis={idProductAdded}
            setIdProductAdded={setIdProductAdded}
          />
        </div>
      </Modal>
      <ModalHistory
        isOpen={openHistory}
        onClose={closeModalHistory}
        openModalDetail={openModalDetail}
        setIdOrder={setIdOrder}
      />
      <ModalDetail
        isOpen={openDetail}
        onClose={closeModalDetail}
        idOrder={idOrder}
      >
        {" "}
      </ModalDetail>
    </>
    // <div style={{ textAlign: 'center', margin: '20px' }}>
    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={handleImageChange}
    //   />
    //   {selectedImage && (
    //     <div style={{ marginTop: '20px' }}>
    //       <h3>Ảnh đã tải lên:</h3>
    //       <img
    //         src={selectedImage}
    //         alt="Uploaded"
    //         style={{ maxWidth: '300px', maxHeight: '300px' }}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}

const ContentOrder = ({ dataHis, setIdProductAdded }) => {
  const initItem = (item) => {
    return {
      name: item.name,
      description: item.description,
      supplier: item.supplierDetails.name,
      price: item.purchasePrice,
      imageUrl: item.image.secure_url,
      supplierId: item.supplierDetails._id,
      quantity: 1,
      status: "pending",
      email: true,
      isChecked: true,
      emailName: item.supplierDetails.email,
      productId: item._id,
    };
  };

  const { user, logout } = useAuth();
  const [listProductWereAdded, setListProductWereAdded] = useState([]);
  const listItem = dataHis.map((item) => initItem(item));
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [isDropdownOpenSupplier, setIsDropdownOpenSupplier] = useState(
    Array(listProductWereAdded.length).fill(false)
  );
  const [selectedSupplier, setSelectedSupplier] = useState(
    Array(listProductWereAdded.length).fill("")
  );
  const [quantities, setQuantities] = useState(
    listProductWereAdded.map((product) => product.quantity) // Khởi tạo mảng quantity từ listProductWereAdded
  );

  const [isOpen, setIsOpen] = useState(
    new Array(listProductWereAdded.length).fill(false)
  ); // Khởi tạo mảng isOpen

  useEffect(() => {
    if (dataHis && dataHis.length > 0) {
      const newItems = dataHis.map(initItem);
      setListProductWereAdded((prevList) => [...newItems, ...prevList]);
      setIdProductAdded([]);
    }
  }, [dataHis]);
  const handleSupplierChange = (supplier, index) => {
    setListProductWereAdded((prev) => {
      const newList = [...prev];
      newList[index].supplier = supplier; // Cập nhật nhà cung cấp cho ô hiện tại
      return newList;
    });

    // Cập nhật selectedSupplier
    setSelectedSupplier((prev) => {
      const newSelectedSuppliers = [...prev];
      newSelectedSuppliers[index] = supplier; // Lưu giá trị đã chọn
      return newSelectedSuppliers;
    });

    // Ẩn dropdown sau khi chọn
    setIsDropdownOpenSupplier((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = false; // Ẩn dropdown cho ô hiện tại
      return newDropdownState;
    });
  };
  const handleSupplierClick = (index) => {
    setIsDropdownOpenSupplier((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = !newDropdownState[index]; // Đảo ngược trạng thái cho ô hiện tại
      return newDropdownState;
    });
  };
  const amountBill = () => {
    let sum = 0;
    listProductWereAdded.forEach((product) => {
      sum += product.price * product.quantity;
    });
    return sum;
  };
  const toggleDropdown = (index) => {
    setIsOpen((prev) => {
      const newOpen = [...prev];
      newOpen[index] = !newOpen[index]; // Đảo ngược giá trị tại index
      return newOpen;
    });
  };

  const dropdownRef = useRef(null);
  const dropdownRefSupplier = useRef(null);
  const handleStatusClick = (index) => {
    setDropdownOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleStatusChange = (index, newStatus) => {
    setListProductWereAdded((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index].status = newStatus;
      setDropdownOpenIndex(null);
      return updatedProducts;
    });
    // Ẩn dropdown sau khi chọn
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpenIndex(null); // Ẩn dropdown khi click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const increase = (index) => {
    setListProductWereAdded((prev) => {
      const newQuantities = [...prev];
      newQuantities[index].quantity += 1; // Tăng giá trị
      return newQuantities;
    });
  };

  const decrease = (index) => {
    setListProductWereAdded((prev) => {
      const newQuantities = [...prev];
      newQuantities[index].quantity += 1; // Tăng giá trị
      return newQuantities;
    });
  };

  const handleRemove = (index) => {
    setListProductWereAdded((prev) => {
      const newList = [...prev];
      newList.splice(index, 1); // Xoá phần tử
      return newList;
    });

    setIsOpen((prev) => {
      const newOpen = [...prev];
      newOpen.splice(index, 1); // Cập nhật mảng isOpen
      return newOpen;
    });
  };
  const handleInputQuantitty = (index, e) => {
    const newQuantity = e.target.value; // Lấy giá trị mới từ input
    setListProductWereAdded((prev) => {
      // Tạo bản sao của danh sách hiện tại
      const updatedList = [...prev];
      // Cập nhật số lượng sản phẩm tại chỉ số index
      updatedList[index] = {
        ...updatedList[index],
        quantity: newQuantity,
      };
      return updatedList; // Trả về danh sách đã cập nhật
    });
  };
  const handleCheckboxChange = (index) => {
    setListProductWereAdded((prev) => {
      const updatedProducts = [...listProductWereAdded];
      updatedProducts[index].email = !updatedProducts[index].email;
      return updatedProducts;
    });
  };

  const handleSubmit = async () => {
    const groupBySupplier = listProductWereAdded.reduce(
      (acc, item) => {
        // Kiểm tra xem đã có supplier này trong nhóm chưa
        if (!acc.dataForm[item.supplier]) {
          acc.dataForm[item.supplier] = [];
        }
        acc.dataForm[item.supplier].push(item); // Thêm item vào đúng nhóm
        return acc;
      },
      { user: {}, dataForm: {} }
    );
    groupBySupplier.user = { id: user._id, name: user.name, email: user.email,ownerId:user.id_owner };
    const url = "http://localhost:5000/import/orderHistory/save";
    console.log(groupBySupplier);
    try {
      const response = await fetch(url, {
        method: "POST", // Phương thức POST
        headers: {
          "Content-Type": "application/json", // Xác định kiểu dữ liệu là JSON
        },
        body: JSON.stringify(groupBySupplier), // Chuyển đổi dữ liệu thành chuỗi JSON
      });

      if (response.ok) {
        // Nếu thành công, xử lý kết quả
        const responseData = await response.json();
        console.log("Dữ liệu đã được gửi thành công", responseData);
        setIdProductAdded([]);
        setListProductWereAdded([]);
      } else {
        // Nếu có lỗi từ server
        console.error("Lỗi khi gửi dữ liệu:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };
  return (
    <>
      <div className="list-product-title">List product </div>
      <div className="list-product-content">
        <div className="list-product-detail">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh Mô Tả</th>
                <th>Sản Phẩm</th>
                <th>Nhà Cung Cấp</th>
                <th>Số Lượng</th>
                <th>Thành Tiền</th>
                <th>Status</th>
                <th>Fix</th>
                <th>Mail</th>
              </tr>
            </thead>
            <tbody>
              {listProductWereAdded.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="body-container-img-description"
                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div className="modal-body-product-name">
                      {product.name}
                    </div>
                    <div className="modal-body-product-description">
                      {product.description}
                    </div>
                  </td>
                  <td>
                    <div style={{ position: "relative" }}>
                      {product.supplier}
                    </div>
                  </td>
                  <td>
                    <div className="Quantity">
                      <button
                        className="Quantity-button"
                        onClick={() => decrease(index)}
                      >
                        -
                      </button>
                      <input
                        value={listProductWereAdded[index].quantity}
                        className="Quantity-input"
                        onChange={(e) => handleInputQuantitty(index, e)}
                      />
                      <button
                        className="Quantity-button"
                        onClick={() => increase(index)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {(
                      product.price * listProductWereAdded[index].quantity
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                  <td>
                    <div
                      className={`product-status ${listProductWereAdded[index].status}`}
                      onClick={() => handleStatusClick(index)}
                      style={{ position: "relative", cursor: "pointer" }}
                    >
                      {product.status}
                      {dropdownOpenIndex === index && (
                        <div ref={dropdownRef} className="dropdown">
                          <div
                            className="dropdown-item"
                            onClick={() => handleStatusChange(index, "pending")}
                          >
                            Pending
                          </div>
                          <div
                            className="dropdown-item "
                            onClick={() =>
                              handleStatusChange(index, "deliveried")
                            }
                          >
                            Delivered
                          </div>
                          <div
                            className="dropdown-item "
                            onClick={() =>
                              handleStatusChange(index, "canceled")
                            }
                          >
                            Canceled
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={product.isChecked}
                      onChange={() => handleRemove(index)} // Call handler on change
                      id={`checkbox-${index}`}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={listProductWereAdded[index].email}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-tax">
          VAT TAX 10%:{" "}
          <span style={{ fontSize: 16, fontWeight: 300 }}>
            {(amountBill() * 0.1).toFixed(2)} VND
          </span>{" "}
        </div>
        <div className="order-tax">
          Tổng tiền:{" "}
          <span style={{ fontSize: 16, fontWeight: 300 }}>
            {(amountBill() * 1.1).toFixed(2)} VND
          </span>
        </div>
        <div className="complete-order">
          <button onClick={() => handleSubmit()}>Complete</button>
        </div>
      </div>
    </>
  );
};

export default Import;
