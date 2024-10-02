import "./Content.css";
import { useState } from "react";
import Sidebar from "../Sidebar/index";
import ProductCard from "../ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const objectTitle = [
  "C++",
  "java",
  "python",
  "golang",
  "typeScript",
  "tensorflow",
  "pandas",
  "numpy",
  "opencv",
  "pytorch",
  "django",
  "take",
  "my",
  "hand ",
  "spring",
  "hello",
  "hibernate",
  "jdbc",
  "devtools",
  "vdsvdvsdfvsef",
  "sdvfs",
];
const info = {};
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 34, 5, 46, 234, 6, 56];
function Content() {
  const [choose, setChoose] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);
  return (
    <div className="Content">
      <div className="grid__column10">
        <div className="grid__row">
          <div className="wraper">
            <div className="bor"></div>
            <div className="scrollContainer">
              <div className="Content_Catergory">
                {objectTitle.map((title, index) => {
                  return (
                    <a
                      href="#"
                      alt=""
                      key={index}
                      onClick={() => setChoose(index)}
                      onMouseOut={() => setHovered(undefined)}
                      onMouseOver={() => setHovered(index)}
                      className={
                        choose === index
                          ? "categoryBold"
                          : hovered === index
                          ? "categoryHovered"
                          : ""
                      }
                    >
                      {title}
                    </a>
                  );
                })}
              </div>
            </div>
            <button className="fixedButton"> Adding </button>
          </div>

          <div className="Content__filter">
            <SortBar />
          </div>
          <div className="ContentProduct grid__row">
            {a.map(() => (
              <ProductCard info={info} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// SortBar.js

const SortBar = () => {
  const [sortOption, setSortOption] = useState("Mới nhất");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  // Handle sorting option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="sort-container">
      <div className="sort-options">
        <span>Sắp xếp theo</span>
        <button
          className={sortOption === "Phổ biến" ? "active" : ""}
          onClick={() => handleSortChange("Phổ biến")}
        >
          Phổ biến
        </button>
        <button
          className={sortOption === "Mới nhất" ? "active" : ""}
          onClick={() => handleSortChange("Mới nhất")}
        >
          Mới nhất
        </button>
        <button
          className={sortOption === "Bán chạy" ? "active" : ""}
          onClick={() => handleSortChange("Bán chạy")}
        >
          Bán chạy
        </button>
        <div className="item__price" onClick={() => handleSortChange("Giá")}>
          <div className=""> Giá</div>
          <div className="arrow">
            <FontAwesomeIcon icon={faChevronDown} className="" />
            <ul class="select-input__list">
              <li class="select-input__item">
                <a href="./" class="select-input__link">
                  Giá: Thấp đến cao
                </a>
              </li>
              <li class="select-input__item">
                <a href="./" class="select-input__link">
                  Giá: Cao đến thấp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pagination">
        <span>{`${currentPage}/${totalPages}`}</span>
        <button
          className="page-button"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        <button
          className="page-button"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Content;
