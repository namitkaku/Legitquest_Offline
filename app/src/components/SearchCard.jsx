import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import SnapShotComp from './SnapShot'
import { titleCase } from "Utils/common";
import { OTHER_IMAGE_BASE_URL } from "../utils/appConst";
import { removeTags } from "../utils/common";
import SearchWithInCase from "./SearchWithInCase";
//import HtmlParser from "react-html-parser";
const iconsStyles = {
  color: "#3646eb",
  cursor: "pointer",
};
export default function SearchCard({
  Judges,
  CourtName,
  DateOfJudgment,
  LinkText,
  HighlightedText,
  EncryptedId,
  CaseId,
  OtherStatusImgUrl,
  SnapShot,
  PartyName,
  secondrayMaterial
}) {
  //console.log("SnapShot",SnapShot);
  const [showJudge, setShowJudge] = useState(false);
  const [whichModalToOpen, setWhichModalToOpen] = useState('')
  const formatString = (str) => {
    var desired = str?.replace(/[^\w\s]/gi, "");
    return desired?.replace(/\s/g, "-");
  };
  const _renderJudgesList = () => {
    return (
      <div className="popup-body p-3">
        <div className="judges-list">
          {/* Judges.split(";")?.map((name, key) => {
            return (
              <span
                key={key}
                className="badge badge-pill py-1 px-3 font-weight-normal m-2">
                {removeTags(name)}
              </span>
            );
          }) */}
          <span className=" font-weight-normal" style={{fontSize:12}}>  
          {ReactHtmlParser(Judges)}</span>
        </div>
      </div>
    );
  };
  const _renderJudge = () => {
    return (
      <a
        style={iconsStyles}
        onClick={() => { setWhichModalToOpen("JUS")
          setShowJudge(!showJudge)}}
        className="popup-open judges-link mr-3 ">
        <small>
          <i className="fas fa-user-tie" /> Judges
        </small>
      </a>
    );
  };

  //console.log("LinkText)}/${EncryptedId",encodeURIComponent(`/case-detail/${formatString(LinkText)}/${EncryptedId}`));
  return (
    <div className="col-md-12 mb-4">
      <div className="post card  p-0 border-0 bg-transparent">
        <div className="card-body p-0">
          {/*case-detail*/}
          <Link 
            to={`/case-detail/${formatString(
              PartyName /* LinkText */
            )}/${EncryptedId}`}
            className="h4 card-title d-block mb-0 text-primary">
            <u> {titleCase(LinkText)} </u>
            <img
              id="presecriptive"
              src={`${OTHER_IMAGE_BASE_URL}${OtherStatusImgUrl}`}
              className="ml-2"
              alt=""
              height="22px"
            />
          </Link>

          {CourtName&&DateOfJudgment&&<p className="card-text text-success mb-1">
            {`${CourtName} | ${DateOfJudgment}`}
          </p>}
          <p className="mb-1 detailed-text" style={{fontSize:15}}>
            {ReactHtmlParser(HighlightedText ? HighlightedText : LinkText)}
          </p>
         {!secondrayMaterial && <div className="search-action">  
          {/* <SearchWithInCase toggleModal={(target)=> setWhichModalToOpen(target)} whichIsOpen={whichModalToOpen} caseId={EncryptedId} />  */}
            {_renderJudge()} 
            {SnapShot !=null&& SnapShot !='null' && (
                <SnapShotComp    toggleModal={(target)=> setWhichModalToOpen(target)} whichIsOpen={whichModalToOpen}  content={SnapShot} /> 
              )}  
            <div className="popup-container">
            
              { whichModalToOpen==="JUS" &&  (
                <div className="case-popup bg-white judges-popup shadow-sm active">
                  <div className="header-popup d-flex align-items-center justify-content-between px-3 py-2">
                    <span className="text-dark ">
                      <i className="fa fa-users" aria-hidden="true" />
                      <span className="h6 mb-0 font-weight-bold">Judges</span>
                    </span>
                    <a
                      style={iconsStyles}
                      onClick={() => {
                        setWhichModalToOpen("") 
                      }
                      }
                      className="popup-close">
                      <i className="fa fa-times" aria-hidden="true" />
                    </a>
                  </div>
                  {_renderJudgesList()}
                </div>
              )} 
            </div> 
          </div>}
        </div>
        <div className="card-footer pb-4 bg-dark d-none"></div>
      </div>
      {/* Card for a Post/Artile */}
    </div>
  );
}
