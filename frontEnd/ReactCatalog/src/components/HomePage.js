import React from "react";
import { MDBEdgeHeader, MDBContainer, MDBIcon, MDBJumbotron } from "mdbreact";
import "./HomePage.css";

import CatalogList from "./CatalogList";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username
    };
  }

  render() {
    return (
      <div>
        <MDBEdgeHeader color="indigo darken-3" />

        <MDBContainer className="mt-5  ">
          <MDBJumbotron>
            <h2>
              <MDBIcon icon="window-restore" className="grey-text mr-2" />
              CATALOG
            </h2>
            <CatalogList
              role={this.props.role}
              username={this.props.username}
            />
          </MDBJumbotron>
        </MDBContainer>
      </div>
    );
  }
}

export default HomePage;
