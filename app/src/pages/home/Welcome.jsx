import React from "react";
import MainLayout from "Layout/MainLayout";
import { titleCase } from "../../utils/common";
import { testimonialText } from "../../utils/appConst";
//import { electron } from 'process';
const BASEURL = "../../../assets/";

export default function Welcome(props) {
  const { history } = props;
  const downloadApi = api.downloadApi; //.sendNotification('My custom notification!');
  //console.log("api",api);
  return (
    <MainLayout history={history}>
      {/* <button onClick={()=>downloadApi?.downloadFileNow("http://www.africau.edu/images/default/sample.pdf")} className="btn btn-info">Download now</button> */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <section
              className="section-hero main-banner py-0   pl-7 position-relative"
              style={{
                backgroundImage: `url(${
                  require(`../../../assets/images/banner2-bg.jpg`).default
                } )`,
              }}>
              <div className="row ">
                <div className="col-md-6 my-4 d-flex align-items-center">
                  <div>
                    <span className="h3 text-primary mb-1">
                      If you need it we have it
                    </span>
                    <h1 className="mb-3 font-weight-bold text-white">
                      Largest Structured Legal Database
                    </h1>
                    <div className="separator bg-primary mb-4" />
                    <p className="lead mb-4  text-white opacity-07">
                      1.2 million judgments, Acts, Treaties, Debates, Bills, Law
                      commission reports and much more.{" "}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src={
                      require("../../../assets/images/banner2-screen.png")
                        .default
                    }
                    alt=""
                    className="banner-screenshot"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/*  <section className=" py-5 bg-gray">
          <div className="container">
            <div className="cta-block__wrapper  col mt-0">
              <div className="cta-block gradient-brand-color py-5">
                <div className="row">
                  <div className="col-10 offset-1 d-md-flex justify-content-between align-items-center">
                    <div className="cta__contet color--white text-center" style={{width:'100%'}}>
                      <h2 className="color--white"> {titleCase("Punjab and Haryana High court latest judgements")} </h2>
                      
                    </div>
                     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      {/* <section className="section main-quote-section bg-white">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2 col-lg-12 offset-lg-0 text-center">
                <span className="rating text-warning d-block mb-4">
                  <i className="fas fa-star" data-aos="flip-left" />
                  <i className="fas fa-star" data-aos="flip-left" />
                  <i className="fas fa-star" data-aos="flip-left" />
                  <i className="fas fa-star" data-aos="flip-left" />
                  <i className="fas fa-star" data-aos="flip-left" />
                </span>
                <h2 className="section__title mb-4" data-aos="fade-up" data-aos-offset={100}>World’s First 1-click judgment evaluation system</h2>
              </div>
              <div className="main-features__list col-md-12 text-center" data-aos="fade-up" data-aos-offset={100}>
                <p className="text-dark mt-2">"Legitquest’s <span className="mark"> iDRAF is the best thing I ever used</span> for my research"</p>
                <div className="separator bg-primary d-inline-block my-4" />
                <h4 className="font-weight-bold text-uppercase">Jhone Doe </h4>
                <span>Solo practiotiner</span>
              </div>
            </div>
          </div>
        </section>  END Section Main Feature */}
      <section className="section section-block-feature bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="section__title mb-6 font-weight-bold">
                Efficient. Relevant. Intuitive
              </h1>
            </div>
          </div>
          <div className="mb-8">
            <div className="row">
              <div className="col-md-5 ml-auto order-md-2 text-center text-md-left pl-0 pl-md-5 feature-content">
                <div className="icon icon--rounded bg-primary mb-4">
                  <img
                    src={
                      require("../../../assets/images/icn_fluxo_stacks.svg")
                        .default
                    }
                    alt="Feature Icon"
                    className="feature-icon"
                  />
                </div>
                <h2 className="mt-2 mb-4">
                  Intuitive search engine to save time
                </h2>
                <p className="mb-5">
                  Utilize the intuitive design of LQ’s Search bar, to get all
                  the Search options in one place, at the click of a button
                </p>
                {/* <a   className="text-link link--right-icon text-uppercase">Lean more <i className="link__icon fa fa-chevron-right" /></a> */}
              </div>
              <div
                className="col-md-7 order-md-1 mt-5 mb-mt-0 feature-img"
                data-aos="fade-right">
                <div className="px-3">
                  <img
                    src={
                      require("../../../assets/images/searchbar.png").default
                    }
                    alt="Feature"
                    className="img-fluid mx-auto d-block"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="row">
              <div className="col-md-5 mr-auto  text-center text-md-left pr-0 pr-md-5 feature-content">
                <div className="icon icon--rounded bg-primary mb-4">
                  <img
                    src={
                      require("../../../assets/images/icn_fluxo_chart.svg")
                        .default
                    }
                    alt="Feature Icon"
                    className="feature-icon"
                  />
                </div>
                <h2 className="mt-2 mb-4">
                  Research efficiency which comes with 1-click
                </h2>
                <p className="mb-5">
                  Our 1-click judgment insight system- iDRAF has helped
                  thousands f lawyers save precious time by gaining useful
                  insights quickly.
                </p>
                {/* <a   className="text-link link--right-icon text-uppercase">Lean more <i className="link__icon fa fa-chevron-right" /></a> */}
              </div>
              <div
                className="col-md-7 mt-5 mb-mt-0 feature-img"
                data-aos="fade-left">
                <div className="px-3">
                  <img
                    src={require("../../../assets/images/idraf.png").default}
                    alt="Feature"
                    className="img-fluid mx-auto d-block"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-0">
            <div className="row">
              <div
                className="col-md-7 order-md-1 mt-5 mt-md-0 feature-img"
                data-aos="fade-right">
                <div className="px-3">
                  <img
                    src={
                      require("../../../assets/images/search-results.png")
                        .default
                    }
                    alt="Feature"
                    className="img-fluid mx-auto d-block"
                  />
                </div>
              </div>
              <div className="col-md-5 ml-auto order-md-2 text-center text-md-left pl-0 pl-md-5 feature-content">
                <div className="icon icon--rounded bg-primary mb-4">
                  <img
                    src={
                      require("../../../assets/images/icn_fluxo_users.svg")
                        .default
                    }
                    alt="Feature Icon"
                    className="feature-icon"
                  />
                </div>
                <h2 className="mt-2 mb-4">
                  Results which are relevant to your keyword search
                </h2>
                <p className="mb-5">
                  At LegitQuest research we are constantly refining our search
                  algorithm by use of latest in AI and Machine learning to
                  provide most relevant search results
                </p>
                {/* <a   className="text-link link--right-icon text-uppercase">Lean more <i className="link__icon fa fa-chevron-right" /></a> */}
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* END Section Block Feature */}
      <div className="sections__wrapper">
        <section className="section section-posts bg-white news-section">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center">
            <h2 className="section__title mb-5 font-weight-bold">
              Most comprehensive, accurate and current database
            </h2>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4 p-3 d-flex flex-column">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-primary">
                    <a className="h4 mb-0 card-title d-block font-weight-bold text-white">
                      Supreme Court
                    </a>
                    <div className="separator bg-white d-inline-block my-2" />
                    <p className="card-text">
                      All Supreme Court judgments from 1050 onwards till
                      yesterday
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
              <div className="col-md-4 p-3 d-flex flex-column">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-dark">
                    <a className="h4 mb-0 card-title d-block  font-weight-bold text-white">
                      High Courts
                    </a>
                    <div className="separator bg-primary d-inline-block my-2" />
                    <p className="card-text">
                      All the High courts of India covered by our database.
                      Judgments updated everyday
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
              <div className="col-md-4  p-3 d-flex flex-column">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-primary">
                    <a className="h4 mb-0 card-title d-block  font-weight-bold text-white">
                      Tribunals
                    </a>
                    <div className="separator bg-white d-inline-block my-2" />
                    <p className="card-text">
                      All tribunals of India covered on a regular basis. Weekly
                      update of tribunal database with new judgments
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
              <div className="col-md-4  p-3 d-flex flex-column ">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-dark">
                    <a className="h4 mb-0 card-title d-block  font-weight-bold text-white">
                      Acts
                    </a>
                    <div className="separator bg-primary d-inline-block my-2" />
                    <p className="card-text">
                      All central and state Bare acts available on our plaform
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
              <div className="col-md-4  p-3 d-flex flex-column">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-primary">
                    <a className="h4 mb-0 card-title d-block font-weight-bold text-white">
                      Orders
                    </a>
                    <div className="separator bg-white d-inline-block my-2" />
                    <p className="card-text">
                      All central and state Bare acts available on our platform
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
              <div className="col-md-4  p-3 d-flex flex-column">
                <div
                  className="post card p-0 border-0 shadow-sm flex-fill"
                  data-aos="fade-up">
                  <div className="card-body bg-dark">
                    <a className="h4 mb-0 card-title d-block font-weight-bold text-white">
                      Articles
                    </a>
                    <div className="separator bg-primary d-inline-block my-2" />
                    <p className="card-text">
                      Through the Publish offering, latest articles and opinions
                      related to legal research are available for secondary
                      source research
                    </p>
                  </div>
                </div>{" "}
                {/* Card for a Post/Artile */}
              </div>
            </div>{" "}
            {/* inner nested row */}
          </div>
        </section>{" "}
        {/* END Section Posts */}
      </div>
      <section className="section section-video bg-dark">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
              <div className="video-demo-block">
                <div className="feature-img rounded overflow-hidden position-relative mb-3">
                  <a
                    data-fancybox
                    href="https://www.youtube.com/watch?v=oik6qiQNrXg"
                    className="video-link d-block">
                    <img
                      src={
                        require("../../../assets/images/video-isearch.jpg")
                          .default
                      }
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="feature-name">
                  <h4 className="feature-tittle font-weight-bold text-white">
                    iSearch
                  </h4>
                  <span className="feature-tittle subtittle">
                    Not all legal search engines are created equal - Information
                    retrieval made easy
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
              <div className="video-demo-block">
                <div className="feature-img rounded overflow-hidden position-relative  mb-3">
                  <a
                    data-fancybox
                    href="https://www.youtube.com/embed/WqWaGMT1T0A"
                    className="video-link d-block">
                    <img
                      src={
                        require("../../../assets/images/video-igraphics.jpg")
                          .default
                      }
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="feature-name">
                  <h4 className="feature-tittle font-weight-bold text-white">
                    iGraphics
                  </h4>
                  <span className="feature-tittle subtittle">
                    A picture is intelligence made visible
                  </span>
                </div>
                {/*  <div className="read-more-link">
                    <a  >Learn More</a>
                  </div> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-lg-0 mb-4">
              <div className="video-demo-block">
                <div className="feature-img rounded  overflow-hidden position-relative  mb-3">
                  <a
                    data-fancybox
                    href="https://www.youtube.com/embed/KQXOAMTZLqY"
                    className="video-link d-block">
                    <img
                      src={
                        require("../../../assets/images/video-idraf.jpg")
                          .default
                      }
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="feature-name">
                  <h4 className="feature-tittle font-weight-bold text-white">
                    iDRAF
                  </h4>
                  <span className="feature-tittle subtittle">
                    Deliver beyond expectations
                  </span>
                </div>
                {/* <div className="read-more-link">
                    <a  >Learn More</a>
                  </div> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <div className="video-demo-block">
                <div className="feature-img rounded border-dark overflow-hidden position-relative  mb-3">
                  <a
                    data-fancybox
                    href="https://www.youtube.com/embed/KQXOAMTZLqY"
                    className="video-link d-block">
                    <img
                      src={
                        require("../../../assets/images/video-complete.jpg")
                          .default
                      }
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="feature-name">
                  <h4 className="feature-tittle font-weight-bold text-white">
                    Complete Demo
                  </h4>
                  <span className="feature-tittle subtittle">
                    Deliver beyond expectations
                  </span>
                </div>
                {/* <div className="read-more-link">
                    <a  >Learn More</a>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-testimonials bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-5 text-center text-md-left">
              <div className="icon icon--rounded bg-primary mb-4">
                <img
                  src={
                    require("../../../assets/images/icn_fluxo_quote.svg")
                      .default
                  }
                  alt="Feature Icon"
                  className="feature-icon"
                />
              </div>
              <h2 className="mt-2 mb-5 mb-md-0 font-weight-bold">
                Over 200 firms and Universities are using Legitquest to power
                their legal research
              </h2>
            </div>
            <div className="col-md-6 ml-auto">
              {testimonialText?.map((item, key) => {
                const { name, descr, auth } = item;
                return (
                  <div key={key} className="testimony__card p-3" data-aos="fade-left">
                    <blockquote className="blockquote">
                      <p className="mb-2"> {descr}</p>
                      <footer className="blockquote-footer d-flex align-items-center">
                        <div className="testimony__info d-inline-block">
                          <span className="info-name d-block">{name}</span>
                          <span className="info-company d-block">{auth}</span>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                );
              })}

               {/* <div className="testimony__card p-3" data-aos="fade-left">
                  <blockquote className="blockquote">
                    <p className="mb-2">"Duis placerat felis diam, ut tincidunt dui maximus quis. Etiam hendrerit felis tellus, <span className="mark">at congue nisi tincidunt vel. Morbi justo lectus, aliquet et mattis eget, dictum ut dui. Mauris rutrum dapibus ante ac consectetur.</span> "</p>
                    <footer className="blockquote-footer d-flex align-items-center">
                      <div className="testimony__info d-inline-block">
                        <span className="info-name d-block">Carl Anderson</span>
                        <span className="info-company d-block">CEO, Some Company</span>
                      </div>
                    </footer>
                  </blockquote>
                </div>
                <div className="testimony__card p-3" data-aos="fade-left">
                  <blockquote className="blockquote ">
                    <p className="mb-2">"<span className="mark">Sed sodales laoreet est dignissim dignissim. </span>Mauris fermentum eget turpis ac lacinia."</p>
                    <footer className="blockquote-footer d-flex align-items-center">
                      <div className="testimony__info d-inline-block">
                        <span className="info-name d-block">Amanda Turner</span>
                        <span className="info-company d-block">CEO, Some Company</span>
                      </div>
                    </footer>
                  </blockquote>
                </div> */}
            </div>
          </div>
        </div>
      </section>{" "}
      {/* END Section Testimonials */}
      <section className="section section-subscribe">
        <figure className="figure pattern-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="1306px"
            height="225px">
            <path
              fillRule="evenodd"
              fill="rgb(35, 23, 123)"
              d="M-0.011,9.318 L8.682,6.988 L11.011,15.682 L2.318,18.011 L-0.011,9.318 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(35, 23, 123)"
              d="M607.694,164.319 L612.680,161.693 L615.306,166.680 L610.320,169.305 L607.694,164.319 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(93, 203, 250)"
              d="M667.343,205.646 L679.152,213.179 L671.620,224.988 L659.810,217.456 L667.343,205.646 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(93, 203, 250)"
              d="M915.839,-0.008 L924.997,5.833 L919.156,14.991 L909.998,9.150 L915.839,-0.008 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(35, 23, 123)"
              d="M989.000,93.000 C993.418,93.000 997.000,96.582 997.000,101.000 C997.000,105.418 993.418,109.000 989.000,109.000 C984.582,109.000 981.000,105.418 981.000,101.000 C981.000,96.582 984.582,93.000 989.000,93.000 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(35, 23, 123)"
              d="M1165.000,8.000 C1167.761,8.000 1170.000,10.238 1170.000,13.000 C1170.000,15.761 1167.761,18.000 1165.000,18.000 C1162.239,18.000 1160.000,15.761 1160.000,13.000 C1160.000,10.238 1162.239,8.000 1165.000,8.000 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(93, 203, 250)"
              d="M1303.500,118.000 C1304.881,118.000 1306.000,119.119 1306.000,120.500 C1306.000,121.880 1304.881,123.000 1303.500,123.000 C1302.119,123.000 1301.000,121.880 1301.000,120.500 C1301.000,119.119 1302.119,118.000 1303.500,118.000 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(93, 203, 250)"
              d="M61.000,112.000 C62.657,112.000 64.000,113.343 64.000,115.000 C64.000,116.657 62.657,118.000 61.000,118.000 C59.343,118.000 58.000,116.657 58.000,115.000 C58.000,113.343 59.343,112.000 61.000,112.000 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(74, 92, 246)"
              d="M265.500,-0.000 C271.299,-0.000 276.000,4.701 276.000,10.500 C276.000,16.299 271.299,21.000 265.500,21.000 C259.701,21.000 255.000,16.299 255.000,10.500 C255.000,4.701 259.701,-0.000 265.500,-0.000 Z"
            />
            <path
              fillRule="evenodd"
              fill="rgb(35, 23, 123)"
              d="M185.500,131.000 C187.985,131.000 190.000,133.015 190.000,135.500 C190.000,137.985 187.985,140.000 185.500,140.000 C183.015,140.000 181.000,137.985 181.000,135.500 C181.000,133.015 183.015,131.000 185.500,131.000 Z"
            />
          </svg>
        </figure>{" "}
        {/* Pattern SVG Background */}
        <div className="container">
          <div className="row row-grid justify-content-center">
            <div className="col-md-8 col-lg-7 col-xl-6 text-center">
              <h2 className="section__title mb-4" data-aos="fade-up">
                Start Using Legitquest Now
              </h2>
              <p data-aos="fade-up">Try Legitquest and see the difference</p>
              <form
                className="subscribe-form form-inline mt-5"
                data-aos="fade-up">
                <div className="input-group mr-sm-3 mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email address"
                  />
                </div>
               {/*  <button
                  type="submit"
                  className="btn btn-primary btn--has-shadow mb-2">
                  Get Started Now
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* END Section Subscribe */}
    </MainLayout>
  );
}
