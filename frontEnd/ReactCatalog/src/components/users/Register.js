import React, { Component } from "react";
import "./Login.css";

import { MDBBtn, MDBFormInline } from "mdbreact";
import { SERVER_URL } from "../../constants";
import Snackbar from "@material-ui/core/Snackbar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      password: "",
      isAuthenticated: false,
      login: false,
      message: "",
      open: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  login = event => {
    window.location.reload();
  };

  register = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(SERVER_URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.status == 200) {
          this.setState({ open: true, message: "successful registration" });
          console.log(res.status + "successful registration!!!");
          this.login();
        } else {
          this.setState({
            open: true,
            message: "failed, try another username"
          });
          console.log(res.status + "registration failed!!!");
        }

        console.log(res.status);
      })
      .catch(err => console.error(err));
  };

  // Fetch all users
  fetchUserRole(username) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/users", {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(responseData => {
        var users = responseData._embedded.users;

        for (let i = 0; i < users.length; i++) {
          if (username === users[i].username) {
            console.log(users[i].username);
            console.log(users[i].role);
            this.props.updateRole(users[i].role);
          }
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form>
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
                color="danger"
                className="float-right"
                onClick={this.register}
              >
                Register
              </MDBBtn>
              <Snackbar
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={1500}
                message={this.state.message}
              />
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              <MDBFormInline>
                I have an account
                <MDBBtn
                  color="primary"
                  className="float-right"
                  size="sm"
                  onClick={this.login}
                >
                  Login
                </MDBBtn>
              </MDBFormInline>
            </div>
            <div className="d-flex justify-content-center" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
