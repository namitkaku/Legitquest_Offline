import React from "react";
import {styleAnchor} from '../utils/appConst'
import { Link } from "react-router-dom";
export default function ProfileDropDown({userData,onClearAuth,history}) {

    const onLogout = ()=>{
      onClearAuth&&onClearAuth({})
        history?.push("/")
    }
  return (
    <div className="ml-auto d-none d-lg-block" id="navbarsExampleDefault">
      <ul className="navbar-nav">
        <li className="nav-item nav--has-sub-menu" data-toggle="hover">
          <a
            className="nav-link d-flex align-items-center"
            
            data-toggle="dropdown">
            <img
              src="https://login.legitquest.com/user.png?1623741302"
              className="rounded-circle mr-1"
              width={25}
              alt=" Mamta Kashyap "
            />
           {userData?.username&& <span id="firstname">
              <strong> {userData?.username}</strong>
            </span>}
          </a>
          <ul className="nav-sub-menu dropdown-menu rounded-lg shadow dropdown-menu-right">
          <li className="nav-item">
              
          <Link
                        to={"/setup/1"}
                        type="submit"
                        name="submit"
                        className="nav-link"
                        >
                        Set up
                      </Link>


            </li>


            <li className="nav-item">
              <a href="http://www.legitquest.com/profile" className="nav-link">
                Profile
              </a>
            </li>
             
            <li className="nav-item" >
              <a  style={{...styleAnchor, color:'#000'}} onClick={onLogout} className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
