import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { togglePrintModal } from "../redux/components/app-state/appStateAction";
import PrintLayout from "./PrintLayout";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
  overlay:{
    zIndex: 999,
    position:"absolute"
  }
};
Modal.setAppElement("#target");

function PrintOptionsModal({ScUrl, togglePrintModal$, showPrintOptionModal }) {
  let subtitle;
  const [showLayoutOptions, setShowLayoutOptions] = useState(false)

  function openModal() {
    togglePrintModal$(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    togglePrintModal$(false);
  }

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}

      <Modal
        isOpen={showPrintOptionModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        //className="modal-dialog modal-dialog-centered"
        id="courtprintmodal">
        <div className="modal-header ">
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">
            Print Option
          </h5>
          <button
          onClick={closeModal}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close" 
            >

            <span aria-hidden="true">×</span>
          </button>
        </div>
        {ScUrl && !showLayoutOptions ? <div className="row" style={{ padding: 20 }}>
          <div className="col-sm-6 text-center"> 
            <figcaption>
              <input type="hidden" id="judgementID" defaultValue="10AE0" />
              <input
                type="hidden"
                id="jname"
                defaultValue="public-service-commissionuttaranchal-v-mamta-bisht"
              />
              <span>
                <a 
                  href={ScUrl}   
                  name={"download-button"}
                  style={{ cursor: "pointer" }} 
                 >
                  <i className="fa fa-print" /> Download From Court Website
                </a>
              </span>
            </figcaption>
          </div>
          <div className="col-sm-6 text-center">
            <figcaption>
              <span>
                <a style={{ color: '#3646eb',cursor: 'pointer'}} onClick={()=> setShowLayoutOptions(true)} data-toggle="modal" data-dismiss="modal">
                  <i className="fa fa-print" aria-hidden="true" />
                  Print from LegitQuest
                </a>
              </span>
            </figcaption>
          </div>
        </div>
      :
      <PrintLayout />  
      }
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  showPrintOptionModal: state.appState.showPrintOptionModal,
});
const mapDispatchToProps = {
  togglePrintModal$: togglePrintModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintOptionsModal);
