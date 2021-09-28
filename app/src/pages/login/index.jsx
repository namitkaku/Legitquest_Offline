import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { setAuth } from "../../redux/components/auth/authActions";
function index(props) {
  const {setUpCompleted,   history ,setAuth$,userData} = props;
  const alert = useAlert();

  useEffect(() => {
     if(userData?.id){
      history?.push(setUpCompleted ?  "/welcome" : '/setup');
     }
  }, [userData])
  //console.log("userData",userData);
  const onSubmit = async (e) => {
    e.preventDefault();
    //return history?.push("/setup");
    //console.log("electron", api); 
    const { corporate_id, password, email } = e.target;
     
    const res = await api.onLogin.verifyUser(
      corporate_id?.value,
      email?.value,
      password?.value
    );
    console.log("res", res);
    if (res instanceof Array) {
      const results = res[0];
      if (results?.id) {
        setAuth$(results)
        history?.push("/setup");
      }
    } else {
      setAuth$({})
      alert.show(res?.error);
    }
    // history?.push("/welcome");
  };
  return (
    <>
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
        </nav>{" "}
        {/* END Navbar */}
      </header>
      <div className="container-fluid">
        <div className="row min-vh-100 align-items-stretch bg-gray">
          <div className="col-lg-8 d-flex align-items-center py-6 m-auto mt-7">
            <div className="w-75 mx-auto overflow-hidden px-md-5 px-lg-3 position-relative">
              <main className="main login-main">
                <h2 className="mb-2 font-weight-bold">Login to your account</h2>

                <hr className="my-lg-4 my-xl-5" />
                <form className="login-form" onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Company Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="corporate_id"
                          name={"corporate_id"}
                          required
                          placeholder="Company Code"
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name={"email"}
                          required
                          placeholder="User Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          required
                          name={"password"}
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 mb-2">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-primary w-100">
                        Log In
                      </button>
                      {/* <Link
                    to={"/welcome"}
                    type="submit"
                    name="submit"
                    className="btn btn-primary w-100">
                        Log In
                    </Link>    */}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  setUpCompleted:   state.appState.setUpCompleted 
});
const mapDispatchToProps = {
  setAuth$: setAuth
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
