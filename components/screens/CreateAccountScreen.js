import { Card } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { createAccount } from '../../actions/userAction';
import Page from '../styled-components/Page';

class CreateAccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'maestro.31@laposte.net',
      password: 'moismois31',
      verifyPassword: 'moismois31'
    };
  }

  static navigationOptions = {
    header: null
  };

  onSubmit() {
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.verifyPassword === '' ||
      this.state.password != this.state.verifyPassword
    )
      return;

    this.props.createAccount(this.state.email, this.state.password);
  }

  render() {
    return (
      <Page>
        {this.props.isSigning ? (
          <ActivityIndicator size="large" color="#235088" />
        ) : (
          <Card>
            <TextInput
              value={this.state.email}
              onChangeText={value => this.setState({ email: value })}
              placeholder="email"
              keyboardType="email-address"
            />
            <TextInput
              value={this.state.password}
              onChangeText={value => this.setState({ password: value })}
              placeholder="mot de passe"
              secureTextEntry
            />
            <TextInput
              value={this.state.verifyPassword}
              onChangeText={value => this.setState({ verifyPassword: value })}
              placeholder="vérification du mot de passe"
              secureTextEntry
            />
            <Button title="se connecter" onPress={() => this.onSubmit()} />
            {this.props.errorMessage ? (
              <Text>{this.props.errorMessage}</Text>
            ) : null}
          </Card>
        )}
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    errorMessage: state.userReducer.errorMessage,
    isSigning: state.userReducer.isSigning
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createAccount: (email, password) => dispatch(createAccount(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateAccountScreen
);
