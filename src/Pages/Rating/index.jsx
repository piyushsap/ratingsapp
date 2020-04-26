import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter, Redirect } from "react-router-dom";

import { Button, Input, Alert } from "../../Component";
import { ADD_RATING } from "../../queries";

const initialState = {
  rating: "",
  comment: "",
  username: "",
  restaurantid: ""
};

class Rating extends Component {
  state = { ...initialState };


  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username,
      restaurantid: this.props.restaurant
    });
  }
  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRating) => {
    event.preventDefault();
    addRating().then(data => {
      this.clearState();
    });
  };

  validateForm = () => {
    const { rating, comment } = this.state;
    const isInvalid = !rating;
    return isInvalid;
  };

  render() {
    const { rating, comment, username, restaurantid } = this.state;
    return (
      <section>
        {this.props.session && this.props.session.getCurrentUser===null ?(
          <Redirect to="/" />
        ):null}
        <section className="add-review">
          <h2>Add Review</h2>
          <Mutation
            mutation={ADD_RATING}
            variables={{ comment, rating, username, restaurantid }}
          >
            {(addRating, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addRating)}
                >
                  <Input {...{ name: "rating", placeHolder: "Rating", id: "rating", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <textarea
                    name="comment"
                    placeholder="Share your review..."
                    onChange={this.handleChange}
                    value={comment}
                  />
                  <Button {...{ text: "Add Rating", disable: this.validateForm() }} />
                </form>
              );
            }}
          </Mutation>
        </section>
      </section>
    );
  }
}


export default withRouter(Rating);