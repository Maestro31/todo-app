import { Button as ButtonBase, Icon, Text as TextBase } from 'native-base';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../NavigationService';
import { signinWithFacebook, signinWithGoogle } from '../../actions/userAction';
import Page from '../styled-components/Page';

class FirstScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  onSubmitCreate() {
    NavigationService.navigate('CreateAccount');
  }

  onSubmitConnexion() {
    NavigationService.navigate('Login');
  }

  signinWithFacebook = () => {
    this.props.signinWithFacebook();
  };

  signinWithGoogle = () => {
    this.props.signinWithGoogle();
  };

  render() {
    return (
      <Page style={{ justifyContent: 'space-between' }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 50 }}>Todo App</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View style={{ marginTop: 10 }}>
            <ButtonBase iconLeft danger onPress={() => this.signinWithGoogle()}>
              <Icon name="logo-google" />
              <TextBase>Se connecter avec Google</TextBase>
            </ButtonBase>
          </View>
          <View style={{ marginTop: 10 }}>
            <ButtonBase iconLeft onPress={() => this.signinWithFacebook()}>
              <Icon name="logo-facebook" />
              <TextBase>Se connecter avec Facebook</TextBase>
            </ButtonBase>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 20
          }}>
          <Button
            title="Créer un compte"
            onPress={() => this.onSubmitCreate()}
          />
          <Text
            onPress={() => this.onSubmitConnexion()}
            style={{ textAlign: 'center', marginTop: 10 }}>
            J'ai un compte existant
          </Text>
        </View>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    signinWithFacebook: () => dispatch(signinWithFacebook()),
    signinWithGoogle: () => dispatch(signinWithGoogle())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
