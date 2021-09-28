import React,{useState} from "react";
const iconsStyles = {
  color: "#3646eb",
  cursor: "pointer",
};
export default function SnapShot({toggleModal, whichIsOpen,content}) {
     const [isOpen, setIsOpen] = useState(false)
    //console.log("content",content);
  return (
    <>
      <a onClick={()=>{
        toggleModal&& toggleModal("SNPS")
        /* setIsOpen(!isOpen) */
        } } style={iconsStyles} className={"popup-open snapshot-link mr-3"}>
        <small>
          <i className="fa fa-camera" aria-hidden="true" /> Snapshot
        </small>
      </a>

      <div  style={{backgroundColor:'#fff'}} className={whichIsOpen==="SNPS" /* isOpen */ ? "case-popup snapshot-popup shadow-sm active" :"case-popup snapshot-popup shadow-sm"}>
        <div className="header-popup d-flex align-items-center justify-content-between px-3 py-2">
          <span className="text-dark">
            <i className="fa fa-camera" aria-hidden="true" /> 
            <span className="h6 mb-0 font-weight-bold m-2">Snapshot</span> 
          </span>
          <a onClick={()=>{
            toggleModal&& toggleModal("")
            /* setIsOpen(!isOpen)  */}} className="popup-close">
            <i className="fa fa-times" aria-hidden="true" />
          </a>
        </div>
        <div className="popup-body p-3">
          <div className="snapshot">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
