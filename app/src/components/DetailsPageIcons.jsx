import React from "react";

export default function DetailsPageIcons({ fileUrl }) {
  const downloadApi = api.downloadApi; //.sendNotification('My custom notification!');
  return (
    <div>
      <button 
        onClick={() => downloadApi?.downloadFileNow( 
          {
            url:fileUrl,
            properties: {}
        }
          )}
        type="button"
        className="btn btn-default py-0"
        data-toggle="modal"
        data-target=".report-problem-form">
        <i
          className="lni lni-download"
          data-toggle="tooltip"
          data-placement="left"
          title="Download file"
        />
      </button>
      {/* <button 
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
      </button> */}
    </div>
  );
}
