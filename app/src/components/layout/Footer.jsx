import React from "react";

export default function Footer() {
  return (
    <footer className="footer background--dark pt-0"  >
      <div className="container">
        <div className="row">
          <div className="footer-content col-12 d-md-flex justify-content-between align-items-center my-5">
            <div className="footer__brand">
              <a className="footer-logo mb-0" href="index.html">
                <img
                  src={
                    require("../../../assets/images/lq-logo-dark.png").default
                  }
                  alt="legitquest"
                />
              </a>
            </div>
          
          </div> 
          {/* Footer Content */}
          
        </div>
      </div>
    </footer>
  );
}
