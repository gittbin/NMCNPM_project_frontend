import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React, { useState,useEffect } from "react";
function LayoutDefault(){
const [size,formSize]=useState(80)
const change=()=>{
  formSize((a)=>{if(a==80) return 96;else return 80});
}

  return(
    <>
      <Header size={size}/>
      <main>
        <Sidebar change={change}/>
        <div style={{width:`${size}%`,marginLeft:`${100-size}%`,marginTop:"84px"}}>
<Outlet className="main__content"/>
        </div>
        
      </main>
      {/* <footer>Footer</footer> */}
    </>
  )
}

export default LayoutDefault;