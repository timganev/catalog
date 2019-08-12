import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import Login from "./components/users/Login";
import Team from "./components/Team";
import "./App.css";
class App extends Component {
  state = {
    collapseID: "",
    username: null,
    role: "USER"
  };

  //update username
  updateUsername(value) {
    this.setState({ username: value });
  }
  updateRole(value) {
    this.setState({ role: value });
  }

  logout = event => {
    this.setState({ username: null, role: "USER" });
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  render() {
    const login =
      this.state.username == null ? (
        <MDBNavItem>
          <Login
            updateRole={this.updateRole.bind(this)}
            updateUsername={this.updateUsername.bind(this)}
          />
        </MDBNavItem>
      ) : (
        <div />
      );

    const logoutlink =
      this.state.username == null ? (
        <div />
      ) : (
        <MDBNavItem>
          <MDBBtn color="danger" size="sm" onClick={this.logout}>
            Logout
          </MDBBtn>
        </MDBNavItem>
      );

    const home =
      this.state.username == null ? (
        <div />
      ) : (
        <HomePage role={this.state.role} username={this.state.username} />
      );

    const admin =
      this.state.role == "ADMIN" ? (
        <MDBNavItem>
          <AdminPage />
        </MDBNavItem>
      ) : (
        <div />
      );

    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar
            color="elegant-color"
            dark
            expand="md"
            fixed="top"
            scrolling
          >
            <MDBNavbarBrand href="/">
              Product Catalog {"          "}
              <Logo style={{ height: "2.5rem", width: "2.5rem" }} />
              Wellcome {this.state.username}
            </MDBNavbarBrand>

            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>{logoutlink}</MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            {login}
            {home}
            {admin}

            <Team />
          </main>
          <MDBFooter m-5 color="elegant-color">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/timganev/productcatalog"
                target="_blank"
              >
                {" "}
                Product Catalog App - GitHub{" "}
                <MDBIcon
                  fab
                  icon="github"
                  className="grey-text mr-2"
                  size="2x"
                />
              </a>
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
