import React from "react";
import { togglePrintModal } from "../redux/components/app-state/appStateAction";
import PrintOptionsModal from "./PrintOptionsModal";
import { connect } from "react-redux";

function RightSidePanel({togglePrintModal$}) {
  return (
    <aside className="notes-section anim shadow d-flex">
      <div className="notes-controls bg-white">
        <ul className="nav nav-tabs flex-column h-100 pt-9">
          <li
            className="nav-item px-2 py-2"
            data-target="#alertpopup"
            data-toggle="modal"
            id="print">
            <button
              onClick={()=> togglePrintModal$(true)}
              type="button"
              className="nav-link border-0 p-0"
              data-toggle="tooltip"
              data-placement="right"
              data-original-title="Print Judgment">
              <img
                src="https://www.legitquest.com/images/printer.svg"
                alt=""
                width={16}
              />
            </button>
             
          </li>
        </ul>
      </div>
    </aside>
  );
}


const mapStateToProps = (state) => ({ 
  ...state
 });
const mapDispatchToProps = { 
  togglePrintModal$:togglePrintModal
};
export default connect(mapStateToProps, mapDispatchToProps)(RightSidePanel);
  