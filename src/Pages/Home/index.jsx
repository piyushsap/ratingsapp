import React from "react";

import { Query } from "react-apollo";
import { GET_ALL_RESTAURANTS } from "../../queries";
import {Spinner} from "../../Component";


class Home extends React.Component {
  state = {
    on: false
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes You <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_RESTAURANTS}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;
            console.log(data);
            const { on } = this.state;
            return (
              <div>
                  <p>Name</p>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Home;
