import { Card } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { connectAccount } from '../../actions/userAction';
import Page from '../styled-components/Page';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'test@test.fr',
      password: 'testtest'
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      ...params,
      title: 'Connexion'
    };
  };

  onSubmitConnect() {
    if (this.state.email === '' || this.state.password === '') return;

    this.props.connectAccount(this.state.email, this.state.password);
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
            <Button
              title="se connecter"
              onPress={() => this.onSubmitConnect()}
            />
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
    isSigning: state.userReducer.isSigning,
    errorMessage: state.userReducer.errorMessage,
    user: state.userReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectAccount: (email, pass) => dispatch(connectAccount(email, pass))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
