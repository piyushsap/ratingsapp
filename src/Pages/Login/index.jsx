import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import { Button, Input, Alert } from "../../Component";
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: ""
};

class Login extends Component {
  
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async data => {
      localStorage.setItem('token',data.data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <section className="login">
        <section className="login-wrap">
          <h1>Login</h1>
          <Mutation
            mutation={SIGNIN_USER}
            variables={{ username, password }}
          >
            {(signinUser, { data, loading, error }) => {
              return (
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, signinUser)}
                >
                  <Input {...{ name: "username", placeHolder: "Username", id: "username", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Input {...{ name: "password", type: "password", placeHolder: "Password", id: "password", handleBlur: this.handleChange, handleChange: this.handleChange }} />
                  <Button {...{ text: "Login", disable:this.validateForm() }} />
                </form>
              );
            }}
          </Mutation>
        </section>
      </section>
    );
  }
}


export default withRouter(Login);