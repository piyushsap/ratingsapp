import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import { Button, Input, Alert } from "../../Component";
import { ADD_RATING } from "../../queries";

const initialState = {
  rating: "",
  comments: "",
  username: "",
  restaurantid: ""
};

class Rating extends Component {
  state = { ...initialState };


  componentDidMount() {
    console.log(this.props)
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
    console.log(event,addRating)
    addRating().then(data => {
      console.log(data)
      this.clearState();
      //this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { rating, comments } = this.state;
    const isInvalid = !rating;
    return isInvalid;
  };

  render() {
    const { rating, comments, username, restaurantid } = this.state;
    return (
      <section>
        <section className="add-review">
          <h2>Add Review</h2>
          <Mutation
            mutation={ADD_RATING}
            variables={{ comments, rating, username, restaurantid }}
          >
            {(addRating, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, addRating)}
                >
                  <Input {...{ name: "rating", placeHolder: "Rating", id: "rating", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <textarea
                    name="comments"
                    placeholder="Share your review..."
                    onChange={this.handleChange}
                    value={comments}
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