import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../constants.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import "./Team.css";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBJumbotron,
  MDBFormInline
} from "mdbreact";
import CatalogList from "./CatalogList";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], open: false, message: "" };
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="container m-5 mx-auto p-2">
        <h2 className="m-2  ">
          <MDBIcon icon="window-restore" className="grey-text mr-2" />
          CATALOG
        </h2>

        {/* ///////////// */}
        <CatalogList role={this.props.role} username={this.props.username} />
        {/* ///////////// */}
      </div>
    );
  }
}

export default Team;
