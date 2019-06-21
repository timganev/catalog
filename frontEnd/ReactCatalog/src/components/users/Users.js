import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../../constants.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import { MDBBtn, MDBIcon } from "mdbreact";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], open: false, message: "" };
  }

  componentDidMount() {
    this.fetchLists();
  }

  // Fetch all users
  fetchLists = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/users", {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          users: responseData._embedded.users
        });
      })
      .catch(err => console.error(err));
  };

  customFilter = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null && typeof row[id] === "string") {
      return row[id] !== undefined
        ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
        : true;
    }
  };

  confirmDelete = link => {
    confirmAlert({
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.onDelClick(link)
        },
        {
          label: "No"
        }
      ]
    });
  };

  // Delete user
  onDelClick = link => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "DELETE",
      headers: { Authorization: token }
    })
      .then(res => {
        this.setState({ open: true, message: "Deleted" });
        this.fetchLists();
      })
      .catch(err => {
        this.setState({ open: true, message: "Error when deleting" });
        console.error(err);
      });
  };

  // Add new user
  addPlaylist(playlist) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(playlist)
    })
      .then(res => this.fetchLists())
      .catch(err => console.error(err));
  }

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  // Update user
  updatePlaylist(user, link) {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(user)
    })
      .then(res => this.setState({ open: true, message: "Changes saved" }))
      .catch(err =>
        this.setState({ open: true, message: "Error when saving" })
      );
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.users];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ users: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.users[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        Header: "Username",
        accessor: "username"
      },

      {
        Header: "Role",
        accessor: "role",
        filterable: false,
        width: 100,
        Cell: this.renderEditable
      },
      {
        Header: "Save",
        id: "savebutton",
        sortable: false,
        filterable: false,
        width: 80,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <MDBBtn
            color="primary"
            size="sm"
            onClick={() => {
              this.updatePlaylist(row, value);
            }}
          >
            <MDBIcon icon="marker" size="2x" className="white-text" />
          </MDBBtn>
        )
      },
      {
        Header: "Delete",
        id: "delbutton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value }) => (
          <MDBBtn
            color="danger"
            size="sm"
            onClick={() => {
              this.confirmDelete(value);
            }}
          >
            <MDBIcon icon="trash" size="2x" className="white-text" />
          </MDBBtn>
        )
      }
    ];

    return (
      <div className="App">
        <Grid container>
          <Grid item />
          <Grid item style={{ padding: 20 }} />
        </Grid>

        <ReactTable
          data={this.state.users}
          columns={columns}
          filterable={true}
          defaultFilterMethod={this.customFilter}
          pageSize={5}
          showPaginationBottom
          noDataText={
            <div class="spinner-border fast text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          }
        />
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={1500}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default Users;
