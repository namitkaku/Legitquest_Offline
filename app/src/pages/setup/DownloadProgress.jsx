import React from "react";

export default function DownloadProgress({ currentProgress }) {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${currentProgress ? currentProgress :0}%`}}
        aria-valuenow={currentProgress}
        aria-valuemin="0"
        aria-valuemax="100">
        {currentProgress}%
      </div>
    </div>
  );
}
