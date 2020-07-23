import React from 'react';
import { Form, Button, Input, Container, Header, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo';

import loginMutation from '../graphql/login.js'

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: false,
    eString: "",
    success:false,
    redirect: false
  };

  onSubmit = async () => {

    try {
      const { username, password } = this.state;
      this.setState({
        error: false,
        eString: ""
      })
      const response = await this.props.mutate({
        variables: { username, password },
      });
      console.log(response)
      localStorage.setItem("token", response.data.login.accessToken)
      localStorage.setItem("refreshToken", response.data.login.refreshToken)
      localStorage.setItem("uid", response.data.login.user.id)
      this.setState({
        success:true,
        redirect:true
      })
      console.log(response);
    } catch (e) {
      var error = (e.toString())
      var eString;

      if (error === "Error: GraphQL error: could not find user") {
        eString = ("Couldn't find user")
      }
      else if (error === "Error: GraphQL error: bad password") {
        eString = ("Bad password")
      }

      this.setState({
        error: true,
        eString
      })

      console.log(error)
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      username, password
    } = this.state;

    if (this.state.redirect) {
      return <Redirect to="/dashboard" />
    }else{
      return (
        <div style={{ marginTop: "100px" }}>
          {
            this.state.error ? (
              <Message negative>
                <Message.Header>There was an error with your login</Message.Header>
              </Message>
            ) : null
          }
          {
            this.state.success ? (
              <Message
                success
                header='Your login was successful'
                content='You may now go to your homepage'
              />
            ) : null
          }
          <Container text>
            <Header as="h2">Login</Header>
            <Form>
              <Form.Field>
                <Input
                  name="username"
                  onChange={this.onChange}
                  value={username}
                  placeholder="Username"
                  fluid
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  onChange={this.onChange}
                  value={password}
                  type="password"
                  placeholder="Password"
                  fluid
                />
              </Form.Field>
              <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
          </Container>
        </div>
      );
    }
  }
}

export default graphql(loginMutation)(Login);