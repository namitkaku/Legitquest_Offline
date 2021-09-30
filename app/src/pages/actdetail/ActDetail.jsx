import MainLayout from "Layout/MainLayout";
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const actdetail = ({ match }) => {

  let id = match.params.id;
  // var sections;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/act-detail/' + id).then(response => {
      // console.log(response);
      const allData = response.data.data[0];
      setData(allData);
      // sections = {_html:data.sections};
      // name = response.data.data[0]['name'];
      // console.log(data);
      // console.log(response.data.data[0]);
    })
  }, [])
  return (
    <MainLayout>
      {/* <p>This is Act Detail Component with id {match.params.id}</p> */}
      <section className="section judgment-section py-0 bg-gray">
        <div className="d-flex anim justify-content-between">
          <div className="sidebar bg-white p-0" id="idraf-premium">
            <ul className="list-unstyled mb-0">
              <li className="preminum-tag d-flex align-items-center justify-content-between px-3 py-4">
                <div className="d-flex align-items-center">
                  <i className="fas fa-gem"></i>
                  <span className="h4 font-weight-bold mx-2 mb-0">Sections</span>
                </div>
                <div className="updown-links d-flex">
                  <a className="d-block" href="#">
                    <i className="fa fa-chevron-up" aria-hidden="true"></i>
                  </a>
                  <a className="d-block" href="#">
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-fill judgment-main">
            <div className="judgement-topbar shadow-sm bg-white">
              <div className="idraf-toogle text-center border-bottom py-2 d-block d-md-none">
                <i className="fas fa-gem text-warning"></i> <span className="h4 font-weight-bold mx-2 mb-0">Open iDraf</span>
              </div>
              <div className="section-topbar">
                <div className="text-md-center d-flex mr-auto py-2 px-4 align-items-center">
                  <h5 className="d-inline font-weight-bold mb-0 mx-auto" id="secondaryTitle">{data.name}</h5>
                  <Link to='/act-list'><button type="button" className="btn btn-outline-dark  p-0 px-2 py-1 mr-2 text-nowrap d-flex">
                    <i className="mr-0 mr-md-1" data-toggle="tooltip" data-placement="left" title="" data-original-title="Download pdf"></i>
                    <small className="d-none d-md-block"> Back</small>
                  </button></Link>
                </div>
              </div>
            </div>
            <div className="px-0 mx-md-4  position-relative ">
              <div className="main-detail-content mt-4  mb-5">
                <p className="MsoNormal">{data.name}</p>
                  <p><span><strong>Preamble 1 -</strong> <strong>{data.name}</strong></span></p>
                    <center><p><strong>{data.name}</strong></p></center>
                     <p dangerouslySetInnerHTML={{__html:data.sections}}></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default actdetail;
