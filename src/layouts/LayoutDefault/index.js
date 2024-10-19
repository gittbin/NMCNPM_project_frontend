import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function LayoutDefault(){
  return(
    <>
      <Header />
      <div className="insert_space">

      </div>
      <main>
        <Sidebar />
        <div style={{width:"80%",marginLeft:"20%"}}>
<Outlet className="main__content"/>
        </div>
        
      </main>
      {/* <footer>Footer</footer> */}
    </>
  )
}

export default LayoutDefault;