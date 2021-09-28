import React, { useState } from "react";
import DownloadProgress from "./DownloadProgress";

export default function DownloadEs({ downloadStatus, onDownloadClick }) {
  const getButtonLabel = (key) => {
    switch (key) {
      case "DL_NOT_STARTED":
        return "Download";
      case "DL_COMPLETE":
        return "Download Complete";
      case "DL_START":
        return "Downlading...";
      default:
        break;
    }
  };
  const [downloading, setDownloading] = useState(false);
  return (
    <div className="modal-content">
      <div className="card-body text-center">
        <div className="icons">
          <i className="lni lni-download fa-3x"></i>
        </div>
        <div className="downloading-text mt-3">
          <h4>{downloading ? "Restoring Elastic Database..." : "Restore Elastic Database"} </h4>
          {/*  <span>
            Your downloading starts in <span className="countdown">10</span>
            seconds
          </span> */}
          {/*  <DownloadProgress /> */}
        </div>
        <p className="text-danger" style={{ fontSize: 8 }}>
          Do not close application while downloading database.
        </p>

        <div className="text-center mt-4">
          <button
            onClick={/* ()=> setDownloading(!downloading) */ onDownloadClick}
            className="btn btn-primary send px-3">
            {downloadStatus.status !="DL_START" && getButtonLabel(downloadStatus.status)}
            {downloadStatus.status ==="DL_START" &&<div className="spinner-border text-light" role="status">
               
            </div>}
          </button>
        </div>
      </div>
    </div>
  );
}
