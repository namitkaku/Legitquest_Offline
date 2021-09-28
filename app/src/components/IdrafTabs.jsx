import React, { useState,useEffect } from "react";
import { IDRAF_TABS } from "Utils/appConst";
import {IMAGE_BASE_URL, IDRAF_HIGELIGHT_COLORS, IDRAF_IDS_COUNT_FIND_UPTO } from "../utils/appConst";

export default function IdrafTabs({isDisabled, viewModel }) {
  const [tabsList, setTabsList] = useState([])
  const senitiseTheTabs = ()=>{
    const JudgmentTabs = viewModel?.JudgmentTabs?.split(";");
    const sentisedTabs=[]
     JudgmentTabs?.filter((item)=>    sentisedTabs.push (`IsFound${item?.replace(/^\s+|\s+$/gm,'')}`)  )
    setTabsList(  sentisedTabs)
  }
  useEffect(() => {
    senitiseTheTabs()
  }, [ viewModel?.JudgmentTabs])
  
  //console.log( {tabsList} );
  const [lastHigheLighted, setLastHigheLighted] = useState("");
  const scrollToElment = (id) => {
    
    const element = document?.getElementById(`selected${id}-1`);
    document
      ?.getElementById(`selected${id}-1`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    /* element.style.backgroundColor = IDRAF_HIGELIGHT_COLORS?.[id]   */
    higheLightToggle(id);
  };

  const higheLightToggle = (id) => { 
    painter(id)
    if(lastHigheLighted){
      painter(lastHigheLighted, false)
    }
    setLastHigheLighted(id); 
  };
  const painter = (caseId,paiting=true)=>{ 
    
    let counter =1; 
    while (counter < IDRAF_IDS_COUNT_FIND_UPTO && document?.getElementById( `selected${caseId}-${counter}`) ) {
      
      if(paiting){
        const elementNew =document?.getElementById( `selected${caseId}-${counter}`) 
        elementNew.style.backgroundColor = IDRAF_HIGELIGHT_COLORS?.[caseId];   
      }else{ 
        const element = document?.getElementById( `selected${caseId}-${counter}`) 
        element.style.backgroundColor = "transparent";        
      }
      counter++;
      
    }

  }
  return (
    <div className="sidebar bg-white p-0" id="idraf-premium" style={ isDisabled?  {pointerEvents: 'none',opacity: 0.3} : {}}>
      <ul className="list-unstyled mb-0">
        <li className="preminum-tag d-flex align-items-center justify-content-between px-3 py-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-gem" />
            <span className="h4 font-weight-bold mx-2 mb-0">iDraf</span>
          </div>
          <div className="updown-links d-flex">
            <a className="d-block" href="#">
              <i className="fa fa-chevron-up" aria-hidden="true" />
            </a>
            <a className="d-block" href="#">
              <i className="fa fa-chevron-down" aria-hidden="true" />
            </a>
          </div>
        </li>
        <hr className="mt-0" />
        {viewModel &&
          IDRAF_TABS?.map((item) => {

            const { key, label, img, id } = item;
            return tabsList.includes(key)  ? (
              <li key={key}>
                <a
                  disabled
                  className={
                    lastHigheLighted === id ? "idraf-link active" : "idraf-link"
                  }
                  style={{cursor: 'pointer'}}
                  data-toggle="modal"
                  onClick={() => scrollToElment(id)}>
                  <img src={ `${IMAGE_BASE_URL}${img}`} 
                  />
                  {label}
                </a>
              </li>
            ) : null;
          })}
        {/* <li>
            <a
              className="idraf-link active"
              data-toggle="modal"
              data-target="#alert-modal">
              <img
                src={require("../../assets/images/issue.svg").default}
                alt=""
              />
              Issue
            </a>
          </li>
          <li>
            <a href="#2" className="idraf-link">
              <img
                src={require("../../assets/images/reasoning.svg").default}
                alt=""
              />
              Reasoning
            </a>
          </li> */}
      </ul>
    </div>
  );
}
