import React, { Component } from "react";
import "./Login.css";

import { MDBBtn, MDBFormInline, MDBNavItem } from "mdbreact";
import { SERVER_URL } from "../../constants";
import Snackbar from "@material-ui/core/Snackbar";
import Register from "./Register";

var jwt = require("jwt-simple");
var secret = "SecretKey";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      password: "",
      role: "USER",
      isAuthenticated: false,
      register: false,
      open: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClose = event => {
    this.setState({ open: false });
  };

  register = event => {
    this.setState({ register: true });
  };

  login = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(SERVER_URL + "login", {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);

          var token = jwtToken.split(" ")[1];

          // TODO fix decode without verify the signature of the token https://www.npmjs.com/package/jwt-simple
          var decoded = jwt.decode(token, secret, true);

          console.log("role: " + decoded.scope);
          this.props.updateRole(decoded.scope);
          this.props.updateUsername(this.state.username);

          this.setState({ isAuthenticated: true });
          this.setState({
            modal: !this.state.modal
          });
        } else {
          this.setState({ open: true });
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    if (this.state.register === true) {
      return <Register />;
    } else {
      return (
        <MDBNavItem>
          <div>
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="card-header">
                  <h3>Sign In</h3>
                </div>
                <div className="card-body">
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="username"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>

                  <MDBBtn
                    color="primary"
                    className="float-right"
                    onClick={this.login}
                  >
                    Login
                  </MDBBtn>
                  <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={1500}
                    message="Check your username and password"
                  />
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center links">
                    <MDBFormInline>
                      Don't have an account?{" "}
                      <MDBBtn
                        color="danger"
                        className="float-right"
                        size="sm"
                        onClick={this.register}
                      >
                        Register
                      </MDBBtn>
                    </MDBFormInline>
                  </div>
                  <div className="d-flex justify-content-center" />
                </div>
              </div>
            </div>
          </div>
        </MDBNavItem>
      );
    }
  }
}

export default Login;
