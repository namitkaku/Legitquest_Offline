import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link ,useLocation} from "react-router-dom";
import SearchField from "Components/SearchField";
import {
  toggleTopFilter,
  toggleLeftMenu,
} from "../../redux/components/app-state/appStateAction";
import TopFilter from "../TopFilter";
import {
  getResultForSelectedText,
  queryToSearch,
} from "../../redux/components/search/searchActions";
import JournalList from "../JournalList";
import { goToHomePage } from "../../utils/common";
import ProfileDropDown from "../ProfileDropDown";
import { setAuth } from "../../redux/components/auth/authActions";
import {
  confi
} from "../../utils/appConfig";

/* import Alert from 'electron-alert'
let alert = new Alert();

let swalOptions = {
	title: "Are you sure you want to delete?",
	text: "You won't be able to revert this!",
	type: "warning",
	showCancelButton: true
}; */
function TopNav(props) {
  const {
    searchType,
    leftMenuOpen,
    toggleLeftMenu$,
    queryToSearch,
    getResultForSelectedText$,
    queryToSearch$,
    filterList,
    sortBy,
    history,
    setAuth$,
    userData,
    secondrayMaterial,
  } = props;
  //console.log("history",history);
  const {showSearchFiltersOnTop,
    showSearchFieldOnTop,
    showBackOnTopNav} =confi
  const _form = useRef();
  const [isModalOpen, setIsModalOpen] = useState();
  const location = useLocation();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onJournalsListClick = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { section, typehead } = e.target;
    let QUERY = `${typehead.value}`;
    if (QUERY?.length >= 3) {
      queryToSearch$(QUERY);
      if (section) {
        QUERY = `${QUERY} ${encodeURIComponent("+")} ${section.value}`;
      }
      getResultForSelectedText$({
        secondrayMaterial,
        query: QUERY,
        searchType,
        filterList,
        sortBy,
      });
      /* if(history.location?.pathname ==="/welcome"){
        history.push("/home")
      } */
      goToHomePage(history);
    }
  };
  return (
    <header className="header shadow">
      <nav className="navbar navbar-expand-lg  bg-white position-static navbar-sm ">
        <div className="container-fluid position-relative px-2 px-md-4 py-1">
          {/* <a
            onClick={() => toggleLeftMenu$(true)}
            className="nav-link menu-icon px-2 py-1   mr-md-4 d-block"
            href="#">
            <span
              className={leftMenuOpen ? "hamburger is-active" : "hamburger "}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </span>
          </a>  */}
          <Link
            to={"/search"}
            className="navbar-brand mr-0 mr-md-4 py-2 py-md-3">
            <img
              src={require("../../../assets/images/lq-logo.png").default}
              alt="legitquest"
            />
          </Link>
          <div className="search-filed-box lq-search bg-white  d-flex align-items-center search-bar-sm   flex-fill mb-2 mb-md-0">
           {showBackOnTopNav&&   location.pathname==="/home" && <Link to={"/search"} className="btn btn-primary ml-3">
              <span className="fa fa-long-arrow-alt-left mr-2"></span>
              Back
            </Link>}

            {showSearchFieldOnTop && (
              <form ref={_form} style={{ width: "100%" }} onSubmit={onSubmit}>
                <div className="position-relative flex-fill search-controls-containers">
                  <div
                    id="free-text-box"
                    className="search-field flex-fill show">
                    <SearchField
                      history={history}
                      placeholder="Search by title, case number, issue, ..."
                      renderInput={({
                        inputRef,
                        referenceElementRef,
                        ...inputProps
                      }) => (
                        <input
                          id="basics"
                          className="form-control search-input"
                          name={"typehead"}
                          {...inputProps}
                          ref={(input) => {
                            inputRef(input);
                            referenceElementRef(input);
                          }}
                        />
                      )}
                    />

                    {searchType === "act-section" && (
                      <input
                        name={"section"}
                        style={{ maxWidth: "30%" }}
                        placeholder="Section"
                        className={"form-control ml-2"}
                      />
                    )}
                    {searchType === "citation" && (
                      <a
                        onClick={onJournalsListClick}
                        href="http://www.legitquest.com/journal"
                        target="_blank"
                        className="journals-list">
                        Journals List
                      </a>
                    )}
                  </div>

                  <div className="search-btn">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#4d5bed",
                      }}>
                      <i className="fa fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {showSearchFiltersOnTop && <TopFilter />}
          </div>
          <ProfileDropDown
            userData={userData}
            history={history}
            onClearAuth={setAuth$}
          />
          {/* <div className="ml-auto d-none d-lg-block" id="navbarsExampleDefault">
            <ul className="navbar-nav">
              <li className="nav-item nav-item--btn">
                <a
                  href="#"
                  className="btn btn-outline-primary btn-sm btn--has-shadow mt-3 mt-lg-0">
                  LQ Publish
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
      {/* END Navbar */}
      <JournalList modalIsOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}

const mapStateToProps = (state) => ({
  leftMenuOpen: state.appState.leftMenuOpen,
  queryToSearch: state.search.queryToSearch,
  searchType: state.appState.searchType,
  sortBy: state.appState.sortBy,
  filterList: state.search.filterList,
  userData: state.auth.userData,
  secondrayMaterial: state.secMat.secondrayMaterial,
});
const mapDispatchToProps = {
  toggleLeftMenu$: toggleLeftMenu,
  getResultForSelectedText$: getResultForSelectedText,
  queryToSearch$: queryToSearch,
  setAuth$: setAuth,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
