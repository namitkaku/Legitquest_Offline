import React from "react";
import { connect } from "react-redux";
import { toggleLeftMenu } from "../../redux/components/app-state/appStateAction";
 
function Header(props) {
  const {isLoading,leftMenuOpen,toggleLeftMenu$}=props
   
  return (
    <>
      <nav className="sidebar-menu shadow" style={{left: leftMenuOpen ? 0 : -300}} >
        <div className="sidebar-menu-header d-flex justify-content-between align-items-center px-3 py-4">
          <h4 className="text-white mb-0">Menu</h4>
          <a onClick={()=>toggleLeftMenu$(false)} href="#" className="close">
            <svg
              width="15px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
              //style="enable-background:new 0 0 512.001 512.001;"
              xmlSpace="preserve">
              <g>
                <g>
                  <path
                    fill="white"
                    d="M294.111,256.001L504.109,46.003c10.523-10.524,10.523-27.586,0-38.109c-10.524-10.524-27.587-10.524-38.11,0L256,217.892    L46.002,7.894c-10.524-10.524-27.586-10.524-38.109,0s-10.524,27.586,0,38.109l209.998,209.998L7.893,465.999    c-10.524,10.524-10.524,27.586,0,38.109c10.524,10.524,27.586,10.523,38.109,0L256,294.11l209.997,209.998    c10.524,10.524,27.587,10.523,38.11,0c10.523-10.524,10.523-27.586,0-38.109L294.111,256.001z"></path>
                </g>
              </g>
            </svg>
          </a>
        </div>

        <div className="slimScroll pb-5">
          <ul className="sidebar-nav">
            <li className="nav-item active">
              <a className="nav-link py-3" href="./index.html">
                Home
              </a>
            </li>
            <li className="nav-item nav--has-sub-menu ">
              <a className="nav-link py-3" href="#">
                Company
              </a>
              <ul className="dropdown-menu position-static py-3">
                <li className="nav-item">
                  <a href="./about.html" className="nav-link py-3">
                    About Legitquest
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./team.html" className="nav-link py-3">
                    Our Team
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./careers.html" className="nav-link py-3">
                    Career
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./contact.html" className="nav-link  py-2">
                    Contact US
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item nav--has-sub-menu">
              <a className="nav-link py-3" href="#">
                Products
              </a>

              <ul className="dropdown-menu position-static py-3">
                <li className="nav-item">
                  <a href="./research-request.html" className="nav-link py-3">
                    Research
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link py-3">
                    Publish
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link py-3">
                    Top Judgement
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item nav--has-sub-menu">
              <a className="nav-link py-3" href="#">
                Services
              </a>

              <ul className="dropdown-menu  position-static py-3">
                <li className="nav-item">
                  <a href="./translator-typist.html" className="nav-link py-3">
                    Typing
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./translator-typist.html" className="nav-link py-3">
                    Translation
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link py-3">
                    Filling
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link py-3" href="./pricing.html">
                Pricing{" "}
              </a>
            </li>
          </ul>
          <hr className="my-0 mb-4" />
          <ul className="navbar-nav ml-auto align-items-lg-center">
            <li className="nav-item px-3 d-flex align-items-center flex-fill">
              <a
                className="nav-link text-primary py-0 mr-3"
                href="./login.html">
                Sign In
              </a>
              <a
                href="./pricing.html"
                className="btn btn-primary btn-sm btn--has-shadow mt-3 mt-lg-0 ml-auto">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* isLoading && <div className="menu-overlay d-flex flex-row justify-content-center align-items-center" style={{display:  isLoading ? "block"  : "none"}}  >
      <div className="d-flex justify-content-center mt-5 ">
          <img
             style= {{width:70,height:70} }
              src={"https://www.legitquest.com/lq/lq-spin.gif"}
              alt="legitquest"
            />
          </div> 
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  leftMenuOpen: state.appState.leftMenuOpen,
  isLoading: state.appState.isLoading,
  
});
const mapDispatchToProps = {
  toggleLeftMenu$:toggleLeftMenu
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
