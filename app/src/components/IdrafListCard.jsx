import React from "react";
const aStyle ={
  color: '#3646eb',
    cursor: 'pointer'
}
export default function IdrafListCard({onClick, item }) { 

  const {
    CaseId,
    EncryptedId,
    Petitioner,
    Responder,
    slugTitle,
    LinkText,
    CourtName,
    CourtId,
    CaseNo,
    DateOfJudgment,
    Judgment,
    OrderByDateTime,
    OcrStatus,
    
  } = item;
  return (
    <>
      <div className="block d-md-flex align-items-center">
        <div className="flex-fill">
          <h4 className="font-weight-bold"> 
            <a style={aStyle} onClick={()=>onClick&&onClick(item) }>
             {LinkText}
            </a>
          </h4>
          <small className="d-block mb-3">
            {CourtName} | {DateOfJudgment} | 
            <span>
               {CaseNo} |
            </span>
            {OcrStatus  &&
            <span style={{color:'red',  fontWeight:'bold'}}>{` ${OcrStatus}`}</span>}
          </small>
          <div>
            <p className="mb-1">
              {Judgment}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
}
