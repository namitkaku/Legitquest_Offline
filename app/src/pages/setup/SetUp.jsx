import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReduxWrapper from "../../utils/ReduxWrapper";
import DownloadDb from "./DownloadDb";

function SetUp({ markSetupDone$, setUpCompleted, history,match }) {
   //console.log(match.params.reSetup);
  useEffect(() => {
    if (setUpCompleted && !match.params.reSetup) history?.push("/welcome");
  }, [setUpCompleted]);
  const [filePath, setFilePath] = useState();
  const [stdError, setStdError] = useState();
  //console.log({search_head});
  const [downloadStatus, setDownloadStatus] = useState({
    status: "DL_NOT_STARTED",
  });
  const [downloadStatus_Elastic, setDownloadStatus_Elastic] = useState({
    status: "DL_NOT_STARTED",
  });
  const [importInProgress, setImportInProgress] = useState(false);
  //console.log(" api.setUpApi", downloadStatus);
  useEffect(() => {
    //  onLoad()
  }, []);
  const onLoad = () => {
    //const dddd= await api.setUpApi.hasMySqlInsalled('admin','admin123')
    const dddd = api.setUpApi.readByQuery((err, results) => {
      console.log("err", err);
      console.log("results", results);
    });

    console.warn("dddd", dddd);
  };
  const onDownloadComplete = (e, info) => {
    const { path } = info;
    //console.log("Download save at",path);
    setDownloadStatus({ status: "DL_COMPLETE", path });
  };
  const onDoneImprt = (e, result) => {
    setImportInProgress(false);
    const { status, message, error, dumpQuery } = result;
    console.log({ result });
    if (status) {
      //console.log("Done importing");
      markSetupDone$();
      history?.push("/welcome");
      //dispatch action to redux to tell this that the setup complted, no need to show this page again
      //just redirect to Welcome screenn
    } else {
      //console.log("Error Importing ",message);
      setStdError(`${dumpQuery} </br> ${JSON.stringify(error)}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dbpass = e.target.db_password.value;
    const dbUserName = e.target.db_user_name.value;
    const dbName = e.target.db_name.value;

    setImportInProgress(true);
    const result = api?.setUpApi.runImport(
      {
        filePath,
        dbUserName,
        dbpass,
        dbName,
      },
      onDoneImprt
    );
  };
  const onDownloadClick = () => {
    setDownloadStatus({ status: "DL_START" });

    const url = "https://amusoftech.com/DOG_API/jay_pee_properties.sql";
    api?.downloadApi.downloadFileNow(
      {
        url: url,
        properties: {},
      },
      onDownloadComplete
    );
  };

  const onElasticDownloadClick = async (e) => {
    e.preventDefault();
    //setDownloadStatus_Elastic({ status: "DL_START" });

    api?.downloadApi.browserSqlDump(
      {
        properties: {},
      },
      dumpToDbOnSuccess
    );

    /*  const db =getDataBase() 
    searchForTypeHead("sdsa") */
    //console.log(db);

    /* search_head?.map((item) => { 
      const {  _index,   _id,  _source: { name, type }   } = item

      db.put({ index:_index, _id,name, type })
        .then(function (response) {
          console.log({ response });
        })
        .catch(function (err) {
          console.log(err);
        });
    }); */
    /* db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      console.log( );
       
    }).catch(function (err) {
      console.log(err);
    });

    db.createIndex({
      index: {
        fields: ['name','type']
      }
    }).then(function (result) {
      console.log({result});
    }).catch(function (err) {
      console.log(err);
    }); */

    /*  db.find({
      selector: {name: 'sk. md. rafique'},
      fields: ['_id', 'name'],
      sort: ['_id']
    }).then(function (result) {
       console.log({result});
    }).catch(function (err) {
      console.log(err);
    });
 */

    /* db.search({
      query: 'ram',
      fields: ['name','type'],
      include_docs: true
    }).then(function (res) {
       console.log({res});
    }).catch(function (err) {
      // handle error
    });
 */
    // allDocCount()
    //loadDataFromFile()
    // allDocCount()
  };

  const dumpToDbOnSuccess = (e, info) => {
    const { path } = info;
    setFilePath(path);
    setDownloadStatus({ status: "DL_COMPLETE", path });
  };

  return (
    <div>
      <header className="header ">
        <nav className="navbar navbar-expand-lg mt-4">
          <div className="container position-relative justify-content-center">
            <a className="navbar-brand" href="index.html">
              <img
                src={require("../../../assets/images/lq-logo.png").default}
                alt="legitquest"
              />
            </a>
          </div>
        </nav>
        {/* END Navbar */}
      </header>
      <div className="container-fluid">
        <div className="row min-vh-100 align-items-stretch bg-gray">
          <div className="col-lg-8 d-flex align-items-center py-6 m-auto mt-7">
            <div className="w-75 mx-auto overflow-hidden px-md-5 px-lg-3 position-relative">
              <main className="main login-main">
                <h2 className="mb-2 font-weight-bold text-center">
                  SetUp Process
                </h2>

                <form className="login-form" onSubmit={onSubmit}>
                  <div className="row">
                    {/*  <div className="col-sm-12">
                      <DownloadEs
                        downloadStatus={downloadStatus_Elastic}
                        onDownloadClick={onElasticDownloadClick}
                      />
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Path Repo</label>
                        <input
                          type="text"
                          className="form-control"
                          id="path_repo"
                          name={"path_repo"}
                          required
                          defaultValue="/Users/amusoftech/Documents/esbackup"
                          placeholder="/Users/amusoftech/Documents/esbackup"
                        />
                      </div>
                    </div> */}

                    <div className="col-sm-12 mt-3">
                      <DownloadDb
                        downloadStatus={downloadStatus}
                        onDownloadClick={onElasticDownloadClick}
                        filePath={filePath}
                      />
                    </div>

                    {stdError && (
                      <div className="col-sm-12 mt-3">
                        <h4
                          className={"p-3"}
                          style={{ color: "#fff", backgroundColor: "black" }}>
                          {" "}
                          {stdError}.
                        </h4>
                      </div>
                    )}

                    <hr className="my-lg-4 my-xl-5" />

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Database Host</label>
                        <input
                          type="text"
                          className="form-control"
                          id="host_name"
                          name={"host_name"}
                          required
                          defaultValue="localhost"
                          placeholder="localhost"
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Database</label>
                        <input
                          type="text"
                          className="form-control"
                          id="db_name"
                          name={"db_name"}
                          required
                          placeholder="lq_offline"
                          defaultValue="lq_offline"
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Database Username</label>
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          id="db_user_name"
                          name={"db_user_name"}
                          required
                          placeholder="admin"
                          defaultValue="admin"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Database Password</label>
                        <input
                          type="db_password"
                          className="form-control"
                          disabled
                          id="db_password"
                          name={"db_password"}
                          placeholder="admin123"
                          defaultValue="admin123"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <button
                        disabled={downloadStatus.status != "DL_COMPLETE"}
                        type="submit"
                        name="submit"
                        className={`btn btn-${
                          downloadStatus.status != "DL_COMPLETE"
                            ? "secondary"
                            : "primary"
                        } w-100`}>
                        Start Set Up
                        {importInProgress && (
                          <div
                            className="spinner-border text-light"
                            role="status"></div>
                        )}
                      </button>

                      {/* <Link
                    to={"/welcome"}
                    type="submit"
                    name="submit"
                    className="btn btn-primary w-100">
                        Log In
                    </Link>    */}
                    </div>

                    <div className="col-sm-12 mb-2"> 
                      <Link
                        to={"/search"}
                        type="submit"
                        name="submit"
                        //className="btn btn-primary w-100"
                        >
                        Skip
                      </Link>
                    </div>
                  </div>
                </form>
              </main>
              <footer className="mt-4 text-center">
                <small>©2019 - Legitquest. All rights reserved.</small>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReduxWrapper(SetUp);
