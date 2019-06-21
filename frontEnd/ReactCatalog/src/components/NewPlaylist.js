import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline
} from "mdbreact";
import "react-confirm-alert/src/react-confirm-alert.css";

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: this.props.username,
      name: "",
      price: "",
      description: "",
      open: false,
      message: "",
      image:
        "https://banner2.kisspng.com/20180604/pol/kisspng-react-javascript-angularjs-ionic-atom-5b154be6709500.6532453515281223424611.jpg",
      value: 50,
      data: []
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // Save and close modal form
  handleSubmit = event => {
    event.preventDefault();

    var newPlaylist = {
      username: this.props.username,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image
    };
    this.props.addProduct(newPlaylist);
    this.setState({ name: "", price: "", description: "" });
    this.toggle();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <MDBContainer>
        <MDBBtn color="primary" size="sm" onClick={this.toggle}>
          New Product
        </MDBBtn>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered
          backdrop={false}
        >
          <MDBModalHeader toggle={this.toggle}>
            New Product {this.props.username}
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              className="w-100"
              label="Name"
              outline
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <MDBInput
              className="w-100"
              type="number"
              min={0}
              label="Price"
              outline
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />

            <MDBInput
              className="w-100"
              label="Description"
              outline
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />

            <MDBFormInline>
              <MDBInput
                className="w-60"
                label="Image URL"
                outline
                name="image"
                onChange={this.handleChange}
                value={this.state.image}
              />

              <img src={this.state.image} height="55" />
            </MDBFormInline>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.handleSubmit}>
              Save
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;
