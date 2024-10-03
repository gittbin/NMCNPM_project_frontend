import "./Test.css";
import Content from "../../components/Content/index";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar";
function Test() {
  return (
    <div className="grid">
      <div className="cushion"></div>
      <Header />
      <div className="division">
        <div className="grid__column2 posiSide">
          <Sidebar />
        </div>
        <div className="grid__column10 posiContent">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Test;
