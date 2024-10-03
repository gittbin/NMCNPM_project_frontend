import "./Test.css";
import Content from "../../components/Content/index";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar";
function Test() {
  return (
    <div className="grid">
      <div className="grid__row">
        <div className="grid__column2">
          <Sidebar />
        </div>
        <div className="grid__column10">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Test;
