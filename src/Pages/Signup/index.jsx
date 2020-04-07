import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import { Button, Input, Alert } from "../../Component";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <section className="login">
        <section className="login-wrap">
          <h1>Sign up</h1>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ username, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, signupUser)}
                >
                  <Input {...{ name: "username", placeHolder: "Username", id: "username", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Input {...{ name: "email", placeHolder: "Email Address", id: "email", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Input {...{ name: "password", type: "password", placeHolder: "Password", id: "password", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Input {...{ name: "passwordConfirmation", type: "password", placeHolder: "Confirm Password", id: "passwordConfirmation", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Button {...{ text: "Register", disable: this.validateForm() }} />
                </form>
              );
            }}
          </Mutation>
        </section>
      </section>
    );
  }
}


export default withRouter(Signup);