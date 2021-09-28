import React,{useState} from "react";
import Header from "./Header";
 
import "../../../assets/css/vendor/bootstrap.min.css";
import "../../../assets/css/vendor/fontawesome-all.min.css"; 
/* import "../../../assets/css/vendor/jquery.tree-multiselect.css";
import "../../../assets/css/vendor/daterangepicker.css";
import "../../../assets/css/vendor/owl.carousel.min.css";*/
import "../../../assets/css/vendor/owl.theme.default.min.css";
import "../../../assets/css/vendor/driver.min.css";
import "../../../assets/css/main.css";
import "../../../assets//css/style.css";
import "../../../assets/css/responsive.css";
import "../../../assets/css/searchbar.css";
import "../../../assets/css/index-v2.css";   
import "../../../assets/css/fontawesome.min.css"; 
//import "../../../assets/css/LineIcons.css";
import LineIcon from 'react-lineicons';
/* import PrintOptionsModal from '../PrintOptionsModal' */


import TopNav from "./TopNav"; 
import Footer from "./Footer";  

export default function MainLayout({history, children }) {
  const [show, setShow] = useState(false)
  
  return (
    <>
       
      <Header />
      <TopNav  history={history}/> 
        {/* <PrintOptionsModal /> */}
       <main className="main" style={{ minHeight: '100vh' }}>
       {children}
      </main>
      <Footer />
     
    </>
  );
}
