import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { REPORT_A_PROBLEM } from "../utils/appConst";
import { EditorState } from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

Modal.setAppElement("#target");

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
export default function ReportProblemModal() {
  const [showPrintOptionModal, setShowPrintOptionModal] = useState();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const _editor = useRef();
  function openModal() {
    setShowPrintOptionModal(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setShowPrintOptionModal(false);
  }
const onSubmit=(e)=>{
    e.preventDefault()
  /*   console.log('====================================');
    console.log("e",e);
    console.log('===================================='); */
}
  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="btn btn-default py-0"
        data-toggle="modal"
        data-target=".report-problem-form">
        <i
          className="lni  lni-emoji-sad"
          data-toggle="tooltip"
          data-placement="left"
          title="Report a problem"
        />
      </button>
      <Modal
        isOpen={showPrintOptionModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id="courtprintmodal">
        <form onSubmit={onSubmit}>
          <div
            className="modal-header bg-gray"
            style={{ visibility: "visible" }}>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">
              Report a problem
            </h5>
            <button
              type="button"
              onClick={closeModal}
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body" style={{ width: 500 }}>
            <div className="prblem-area form-group">
              <label className="container">
                Select All Type
                <input
                  type="checkbox"
                  defaultValue
                  name="problem_area"
                  id="selectall"
                />
                <span className="checkmark" />
              </label>
              <br />
              <div id={"checkboxlist"} style={{ marginBottom: 20 }}>
                {REPORT_A_PROBLEM?.map((item, key) => {
                  const { value, name } = item;
                  return (
                    <label key={key} className="container">
                      {value}
                      <input type="checkbox" defaultValue={value} name={name} />
                      <span className="checkmark" />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="className='editor'">
              <Editor
                ref={_editor}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder="Write something!"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
                onClick={closeModal}
              type="button"
              className="btn btn-secondary btn-sm"
              data-dismiss="modal">
              Close
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Send
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
