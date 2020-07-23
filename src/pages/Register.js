import React from 'react';
import { Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';

import registerMutation from '../graphql/register.js'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    name: ''
  };

  onSubmit = async () => {

    const { username, email, password, name } = this.state;
    console.log(this.state)
    const response = await this.props.mutate({
      variables: { username, email, password, name },
    });
    this.props.history.push('/login')
    console.log(response);
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      username, email, password, name
    } = this.state;


    return (
      <div style={{ marginTop:"100px" }}>
        <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field>
            <Input name="name" onChange={this.onChange} value={name} placeholder="Full Name" fluid />
          </Form.Field>
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
            <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
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

export default graphql(registerMutation)(Register);