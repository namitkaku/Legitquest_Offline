import React, { useState } from "react";
import DownloadProgress from "./DownloadProgress";

export default function DownloadDb({filePath, downloadStatus, onDownloadClick }) {
  const getButtonLabel = (key) => {
    switch (key) {
      case "DL_NOT_STARTED":
        return "Browse";
      case "DL_COMPLETE":
        return "Browse Complete";
      case "DL_START":
        return "Verifying...";
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
          <h4>{downloading ? "Restoring Database..." : "Restore Database"} </h4>
          {/*  <span>
            Your downloading starts in <span className="countdown">10</span>
            seconds
          </span> */}
          {/*  <DownloadProgress /> */}
        </div>
        

        <div className="text-center mt-4">
          <button
            onClick={/* ()=> setDownloading(!downloading) */ onDownloadClick}
            className="btn btn-primary send px-3">
            {downloadStatus.status !="DL_START" && getButtonLabel(downloadStatus.status)}
            {downloadStatus.status ==="DL_START" &&<div className="spinner-border text-light" role="status">
               
            </div>}
          </button>
        </div>

       {filePath&& <p className="text-danger" style={{ fontSize:12 }}>
          {`File Path : ${filePath}`}
        </p>
        }
      </div>
    </div>
  );
}
