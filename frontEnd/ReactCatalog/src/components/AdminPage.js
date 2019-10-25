import React from "react";
import {
  MDBNavItem,
  MDBEdgeHeader,
  MDBContainer,
  MDBIcon,
  MDBJumbotron
} from "mdbreact";
import "./HomePage.css";

import Users from "./users/Users";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    };
  }

  render() {
    return (
      <MDBNavItem>
        <div>
          <MDBEdgeHeader color="indigo darken-3" />

          <MDBContainer className="mt-5  ">
            <MDBJumbotron>
              <h2>
                <MDBIcon icon="user-tag" className="grey-text mr-2" />
                ADMIN PANEL
              </h2>
              <Users username={this.props.username} />
            </MDBJumbotron>
          </MDBContainer>
        </div>
      </MDBNavItem>
    );
  }
}

export default HomePage;
