import React, { useEffect, useState } from "react";
import {
  CASE_DETAIL,
  CITATION_CASE_DETAILS,
  GET_CASE_DETAIL_WITH_LOCAL,
  IDEAF_CASE_DETAILS,
} from "../../api/ApiList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactHtmlParser from "react-html-parser";
import "react-tabs/style/react-tabs.css";
import { IDRAF_TABS } from "Utils/appConst";
import IdrafTabs from "../../components/IdrafTabs";
import ChartComp from "../../components/ChartComp";
import IdrafListCard from "../../components/IdrafListCard";
import RightSidePanel from "../../components/RightSidePanel";
import PrintOptionsModal from "../../components/PrintOptionsModal";
import ReportProblemModal from "../../components/ReportProblemModal";
import { formatString, scrollToElment, toTitleCase } from "../../utils/common";
import { connect } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../redux/components/app-state/appStateAction";
import DetailsPageIcons from "../../components/DetailsPageIcons";
 


const fixPos = {
  position: "fixed",
  width: "100%",
  background: "#fff",
};
const tabsList = [
  { label: "Judgement", sCase: "Judgement" },
  { label: "Future Reference", sCase: "FutureReference" },
  { label: "Cited in", sCase: "Cited" },
  { label: "Advocates", sCase: "Advocates" },
  { label: "Bench", sCase: "Bench" },
  { label: "Eq Citations", sCase: "Citation" },
];
function CaseDetail(props) {
  const {
    history,
    match: {
      params: { casetext, cased },
    },
    startLoading$,
    stopLoading$,
    isLoading,
    selectedState,selectedYear
  } = props;

  const [casedata, setcasedata] = useState();
  const [idrafData, setIdrafData] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedTabIndexForFutRef, setSelectedTabIndexForFutRef] = useState(0);
  const [citationData, setCitationData] = useState([]);
  const goBack = () => {
    history?.goBack();
  };
  useEffect(() => {
    readData();
    if (casetext && cased) {
      startLoading$();
    }
  }, [casetext, cased]);
  useEffect(() => {
    casedata?.viewModel?.EncryptedId && readCitationData();
  }, [casedata?.viewModel?.EncryptedId]);
  const readData = async () => {
    /* const respo = await fetch(`${CASE_DETAIL}${casetext}/${cased}`).then(
      (respo) => respo.json()
    ); */
     
    const body={
      selectedState, 
      selectedYear,
      casetext,
      encryptionId:cased 
    }
    const options ={
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached 
      headers: {
        'Content-Type': 'application/json' 
      },
      redirect: 'follow',  
       
      body: JSON.stringify(body)  
    }


   
    let respo = await fetch(
      `${GET_CASE_DETAIL_WITH_LOCAL}`,options
    );
    respo = await respo.json();
    setcasedata(respo);
    stopLoading$();
    scrollToElment(document, "top_section");
  };

  const readIdrafData = async (param) => {
    startLoading$();

    setSelectedTabIndex(1);
  /*   const respo = await fetch(
      `${IDEAF_CASE_DETAILS}?caseId=${casedata?.viewModel?.EncryptedId}&status=${param}`
    ).then((respo) => respo.json());
    setIdrafData(respo?.ocrdatalist); */
    stopLoading$();
  };

  const readCitationData = async (param = "Cases Cited In") => {
    const respo = await fetch( 
      `${CITATION_CASE_DETAILS}?caseId=${casedata?.viewModel?.EncryptedId}&status=${param}`
    ).then((respo) => respo.json());
    setCitationData(respo?.ocrdatalist);
  };

  //console.log("citationData",citationData);
  const renderVs = (viewModel) => {
    const {
      Petitioner,
      Respondent,
      CaseNo,
      Status,
      DateOfJudgement,
      CourtName,
    } = viewModel;
    console.log("DateOfJudgement ====>", DateOfJudgement);
    return (
      <div className="judgment-detail-header text-center">
        <h2 className="mb-3 font-weight-bold">
          {Petitioner}
          <br />
          v.
          <br />
          {Respondent}
        </h2>
        {CourtName && (
          <h4 className="mb-4 font-semibold">({toTitleCase(CourtName)})</h4>
        )}

        <p className="mb-4 font-semibold mb-2" style={{ marginBottom: 20 }}>
          {`${CaseNo ? CaseNo : ''} | ${DateOfJudgement}`}
        </p>

        {/*  <h4>
          {Status && (
            <span className="badge badge-warning d-inline-block py-2 px-2 ">
              Status - {Status}
            </span>
          )}
        </h4> */}

        {casedata?.viewModel?.OcrDtoList?.length > 0 && (
          <div className={"mt-4  mb-4"}>
            <ChartComp
              onColumnTap={(params) => readIdrafData(params)}
              OcrDtoList={casedata?.viewModel?.OcrDtoList}
            />
          </div>
        )}
        <hr />
      </div>
    );
  };
  const onCitedInClick = (item) => {
    const { EncryptedId, slugTitle } = item;
    setSelectedTabIndex(0);
    setSelectedTabIndexForFutRef(0);

    history?.push(`/case-detail/${formatString(slugTitle)}/${EncryptedId}`);
  };
  const _renderCitationIn = () => {
    //  console.log("casedata?.viewModel?.CitedDtoList",casedata?.viewModel?.CitedDtoList);
    return (
      <>
        {casedata?.viewModel?.CitedDtoList?.length > 0 && (
          <ChartComp
            //onColumnTap={(params) => readIdrafData(params)}
            OcrDtoList={casedata?.viewModel?.CitedDtoList}
          />
        )}
        <div style={{ marginTop: 20 }}>
          <Tabs
            //}
            onSelect={(index) => setSelectedTabIndexForFutRef(index)}>
            <TabList
              className={"nav nav-tabs posts__categories-list m-auto flex-row"}
              style={{ justifyContent: "flex-start" }}>
              {Object.keys(citationData)?.map((item, key) => {
                return (
                  <Tab key={key} className="post-category nav-item  ">
                    <a
                      className={
                        selectedTabIndexForFutRef == key
                          ? "active judgement-tab"
                          : " judgement-tab"
                      }>
                      {item}
                    </a>
                  </Tab>
                );
              })}
            </TabList>
            {Object.keys(citationData)?.map((item, key) => {
              return (
                <TabPanel key={key} style={{ marginTop: 20 }}>
                  {citationData?.[item]?.map((item, key) => {
                    return (
                      <IdrafListCard
                        onClick={onCitedInClick}
                        key={key}
                        item={item}
                      />
                    );
                  })}
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </>
    );
  };
  const _renderFutRef = () => {
    return (
      <>
        {casedata?.viewModel?.OcrDtoList?.length > 0 && (
          <ChartComp
            onColumnTap={(params) => readIdrafData(params)}
            OcrDtoList={casedata?.viewModel?.OcrDtoList}
          />
        )}
        <div style={{ marginTop: 20 }}>
          <Tabs
            selectedIndex={selectedTabIndexForFutRef}
            onSelect={(index) => setSelectedTabIndexForFutRef(index)}>
            <TabList
              className={"nav nav-tabs posts__categories-list m-auto flex-row "}
              style={{ justifyContent: "flex-start" }}>
              {Object.keys(idrafData)?.map((item, key) => {
                return (
                  <Tab key={key} className="post-category nav-item  ">
                    <a
                      className={
                        selectedTabIndexForFutRef == key
                          ? "active judgement-tab"
                          : " judgement-tab"
                      }>
                      {item}
                    </a>
                  </Tab>
                );
              })}
            </TabList>
            {Object.keys(idrafData)?.map((item, key) => {
              return (
                <TabPanel key={key}>
                  {idrafData?.[item]?.map((item, key) => {
                    return (
                      <div className={"mt-3"}> 
                        <IdrafListCard
                          onClick={onCitedInClick}
                          key={key}
                          item={item}
                        />
                      </div>
                    );
                  })}
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </>
    );
  };

  const Badge = ({ title }) => {
    return (
      <h4 className="d-inline-block m-2">
        <span className="badge badge-pill badge-secondary px-4 py-3 font-semibold">
          {title}
        </span>
      </h4>
    );
  };
  const _renderBench = (html) => {
    const arrayList = html.split("<BR />");
    let tmpEle = [];
    arrayList?.map((item) => {
      if (item?.trim()?.length > 1) {
        tmpEle.push(item);
      }
    });
    return tmpEle?.map((item, key) => {
      return <Badge title={item} key={key} />;
    });
  };

  const _renderBenchList = (label = "Advocates List", html) => {
    return (
      <div
        id="advocate"
        className="flex-fill pt-4 mt-2 tab-pane fade active show"
        role="tabpanel">
        <h3 className=" text-center font-weight-bold">{label}</h3>
        <div className="text-center">
          <div className="separator bg-primary d-inline-block mt-1 mb-5" />
        </div>
        <div className="text-center">
        <h4 class="d-inline-block"><span class=" px-4 py-3 font-semibold">
           {   ReactHtmlParser(html)}</span></h4>
          
          </div>
      </div>
    );
  };

  const _renderAdvocates = (label = "Advocates List", html) => {
    return (
      <div
        id="advocate"
        className="flex-fill pt-4 mt-2 tab-pane fade active show"
        role="tabpanel">
        <h3 className=" text-center font-weight-bold">{label}</h3>
        <div className="text-center">
          <div className="separator bg-primary d-inline-block mt-1 mb-5" />
        </div>
        <div className="text-center">{ReactHtmlParser(html)}</div>
      </div>
    );
  };
  return (
    <> 
      <section
        className="section judgment-section py-0 bg-gray"
        id="top_section">
        <PrintOptionsModal ScUrl={casedata?.viewModel?.ScUrl} />
        {/* <ReportProblemModal /> */}
        <div className="d-flex anim justify-content-between">
          <IdrafTabs isDisabled={selectedTabIndex !=0} viewModel={casedata?.viewModel} /> 
          <div className="flex-fill judgment-main" style={{ minHeight: 1600 }}>
            <div className="judgement-topbar shadow-sm bg-white">
              <div className="idraf-toogle text-center border-bottom py-2 d-block d-md-none">
                <i className="fas fa-gem text-warning" />{" "}
                <span className="h4 font-weight-bold mx-2 mb-0">
                  Open iDraf
                </span>
              </div>
              <div id="tab_container" style={{
                fontSize: '1.04rem',
                fontWeight: 300,
                lineHeight: '2.2rem',
                fontFamily: 'Gelasio',
              }}>
                <div className="container-fluid d-flex align-items-center mt-2 mb-1 sticky_heder p-2"> 
                  <div className="back-to-result">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={goBack}
                      className="d-block rounded py-1 px-1 font-semibold">
                      <i className="fas fa-angle-left mr-2" /> <span>Back</span>{" "}
                      <span className="d-none d-lg-inline-block">
                        to Results
                      </span>
                    </a>
                  </div>
                  <div className="text-md-center mx-auto">
                    {casedata?.viewModel?.Petitioner && (
                      <h5 className="d-inline font-weight-bold mb-0">
                        {`${casedata?.viewModel?.Petitioner} v. ${casedata?.viewModel?.Respondent}`}
                      </h5>
                    )}
                  </div>
                  {/* casedata?.viewModel?.ScUrl && (
                    <DetailsPageIcons fileUrl={casedata?.viewModel?.ScUrl} />
                  ) */}
                </div>
                {casedata && (
                  <Tabs
                    selectedIndex={selectedTabIndex}
                    onSelect={(index) => setSelectedTabIndex(index)}>
                    <TabList
                      className={
                        "nav nav-tabs posts__categories-list m-auto flex-row"
                      }
                      style={{
                        position: 'sticky',
                        zIndex: 1,
                        top: 30,
                        backgroundColor: '#fff'
                      }}
                      >
                      {tabsList.map((item, key) => {
                        const { label } = item;
                        return (
                          <Tab
                            key={key}
                            selectedClassName={"active"}
                            className="post-category nav-item  ">
                            <a
                              className={
                                selectedTabIndex == key
                                  ? "active judgement-tab"
                                  : " judgement-tab"
                              }>
                              {label}
                            </a>
                          </Tab>
                        );
                      })}
                    </TabList>
                    {tabsList.map((item, key) => {
                      const { label, sCase } = item;
                      return ( 
                        <TabPanel
                          key={key}
                          style={{ backgroundColor: "#f1f5fa" }}>
                          <div className="judgement_ mx-auto flex-fill pt-4 mt-2 tab-pane fade show active mb-4 ">
                            {sCase === "Judgement" && 
                              renderVs(casedata?.viewModel)}

                            {[ "Judgement"].includes(sCase) &&
                              <div>{ReactHtmlParser(`${casedata?.viewModel?.[sCase]}`)}
                               
                              </div>} 

                            {casedata?.viewModel?.[sCase]&& sCase  === "Bench" &&
                              _renderBenchList(
                                "Bench List",
                                casedata?.viewModel?.[sCase]
                              )}
                            {casedata?.viewModel?.[sCase]&& sCase  === "Citation" && 
                              _renderAdvocates(
                                "Eq Citation",
                                casedata?.viewModel?.[sCase]
                              )}

                            {casedata?.viewModel?.[sCase]&& sCase  === "Advocates" &&
                              _renderAdvocates(
                                "Advocates List",
                                casedata?.viewModel?.[sCase]
                              )}   
                            {
                            /// casedata?.viewModel?.CitedDtoList?.length is temprary, 
                            sCase === "Cited" && casedata?.viewModel?.CitedDtoList?.length > 0 &&  _renderCitationIn() } 
                            {sCase === "FutureReference" &&
                              casedata?.viewModel?.OcrDtoList?.length > 0 &&
                              _renderFutRef()}
                          </div>
                        </TabPanel>
                      );
                    })}
                  </Tabs>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <RightSidePanel /> */}

      <footer
        className="footer background--dark p-0 text-center "
        style={{ position: "absolute", width: "100%" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-copyright-column d-md-flex justify-content-center align-items-center py-3">
                <div className="copyright">
                  <p>
                    ©2020 - LQ Global Services Private Limited. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.appState.isLoading,
  selectedState: state.appState.selectedState,
  selectedYear: state.appState.selectedYear
   
});
const mapDispatchToProps = {
  startLoading$: startLoading,
  stopLoading$: stopLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(CaseDetail);
