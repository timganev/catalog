import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SERVER_URL } from "../constants.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { MDBBtn, MDBIcon, MDBFormInline } from "mdbreact";
import Snackbar from "@material-ui/core/Snackbar";

import NewPlayList from "./NewPlaylist";
class CatalogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      role: this.props.role,
      products: [],
      open: false,
      message: "",
      duration: 0
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts = async () => {
    this.setState({
      products: []
    });

    const token = sessionStorage.getItem("jwt");
    await fetch(SERVER_URL + "api/products", {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          products: responseData._embedded.products
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

  // Delete product
  onDelClick = link => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "DELETE",
      headers: { Authorization: token }
    })
      .then(res => {
        this.setState({ open: true, message: "Deleted" });
        this.fetchProducts();
      })
      .catch(err => {
        this.setState({ open: true, message: "Error when deleting" });
        console.error(err);
      });
  };

  // Add new product from child
  addProduct(product) {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(product)
    })
      .then(res => this.fetchProducts())
      .catch(err => console.error(err));
  }

  // Update Product
  updateProduct(product, link) {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(product)
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
          const data = [...this.state.products];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ products: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.products[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        Cell: this.renderEditable
      },
      {
        Header: "Price",
        filterable: false,
        accessor: "price",
        width: 78,
        Cell: this.renderEditable
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: this.renderEditable
      },
      {
        Header: "Created by",
        accessor: "username",
        width: 110
      },
      {
        Header: "Image URL",
        accessor: "image",
        filterable: false,
        Cell: this.renderEditable
      },

      {
        Header: "Image",
        accessor: "image",
        sortable: false,
        filterable: false,
        width: 78,
        Cell: ({ value }) => (
          <div>
            <img alt="" src={value} width="60" height="60" />
          </div>
        )
      },

      {
        Header: "Save",
        id: "savebutton",
        sortable: false,
        filterable: false,
        width: 80,
        accessor: "_links.self.href",
        Cell: ({ value, row }) =>
          this.props.role === "ADMIN" ? (
            <MDBBtn
              color="primary"
              size="sm"
              onClick={() => {
                this.updateProduct(row, value);
              }}
            >
              <MDBIcon icon="marker" size="2x" className="white-text" />
            </MDBBtn>
          ) : (
            <div />
          )
      },
      {
        Header: "Delete",
        id: "delbutton",
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) =>
          this.props.role === "ADMIN" ? (
            <MDBBtn
              color="danger"
              size="sm"
              onClick={() => {
                this.confirmDelete(value);
              }}
            >
              <MDBIcon icon="trash" size="2x" className="white-text" />
            </MDBBtn>
          ) : (
            <div />
          )
      }
    ];

    const NewPlayListlink =
      this.props.role !== "ADMIN" ? (
        <div />
      ) : (
        <NewPlayList
          className="align-middle"
          username={this.props.username}
          addProduct={this.addProduct}
          fetchProducts={this.fetchProducts}
        />
      );

    return (
      <div className="App">
        <MDBFormInline>{NewPlayListlink}</MDBFormInline>

        <ReactTable
          data={this.state.products}
          columns={columns}
          filterable={true}
          defaultFilterMethod={this.customFilter}
          pageSize={5}
          noDataText={
            <div className="spinner-border fast text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          defaultSorted={[
            {
              id: "avgrank",
              desc: true
            }
          ]}
          showPaginationBottom
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

export default CatalogList;
