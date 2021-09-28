import React from "react";

export default function SessionExpire() {
  return (
    <main className="main">
      <section className="section bg-gray  pt-5 pb-5 ">
        <div className="container-404 text-center mx-auto">
          <img
            className="img-fluid"
            src={require("../../../assets/images/404.svg").default}
            alt=""
            width={400}
          />
          <h3 className="mt-5 font-weight-bold">SESSION EXPIRED.</h3>
          <p className="mb-4">
            Sorry, the page you are looking for either does not exist or have
            been removed or name changed or is temporarily unavailable.
          </p>
          <Link to={"/home"} className="btn btn-primary">
            Home
          </Link>
        </div>
      </section>
      {/* END Section Posts */}
    </main>
  );
}
