import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../NavigationService';
import { disconnectAccount } from '../../actions/userAction';
import Page from '../styled-components/Page';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  onSubmitDisconnect() {
    this.props.disconnectAccount();
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      NavigationService.goLogin();
    }
  }

  render() {
    return (
      <Page>
        <Text>Home</Text>
        <Button
          title="se déconnecter"
          onPress={() => this.onSubmitDisconnect()}
        />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disconnectAccount: () => dispatch(disconnectAccount())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
