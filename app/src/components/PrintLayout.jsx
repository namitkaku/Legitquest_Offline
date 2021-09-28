import React from "react";

export default function PrintLayout() {
  return (
    <div className="row">
      <div className="col-sm-6 text-center">
        <h6 className="font-weight-bold mb-3">In One Column</h6>
        {/* <input type="text" id="jtitle"> */}
        <a id="c1" className="print-item d-block position-relative">
          <figure className="p-4 bg-white mb-4 rounded ">
            <img
              src="https://www.legitquest.com/images/onecolumn.png"
              alt=""
              className="d-block w-100  shadow-sm"
            />
            <figcaption>
              <span
                style={{ cursor: "pointer" }} 
                className="mb-2">
                <i className="lni lni-printer" />
              </span>
            </figcaption>
          </figure>
        </a>
      </div>
      <div className="col-sm-6 text-center">
        <h6 className="font-weight-bold mb-3">In Two Column</h6>
        <a id="c2" className="print-item d-block position-relative">
          <figure className="p-4 bg-white mb-4 rounded shadow-sm ">
            <img
              src="https://www.legitquest.com/images/twocolumn.png"
              alt=""
              className="d-block w-100"
            />
            <figcaption>
              <span
                style={{ cursor: "pointer" }}
                target="_blank"
                //onclick="printjudgment2();"
                className="mb-2">
                <i className="lni lni-printer" />
              </span>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>
  );
}
