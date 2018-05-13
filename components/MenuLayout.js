import { Body, Left, ListItem } from 'native-base';
import React, { Component } from 'react';
import { DrawerLayoutAndroid, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';
import optionIcon from '../images/options-icon.png';

class MenuLayout extends Component {
  constructor(props) {
    super(props);
  }

  renderNavigationView = () => {
    return (
      <View>
        <ListItem
          icon
          onPress={() => {
            NavigationService.navigate('TodosOptions');
            this.refs['menu'].closeDrawer();
          }}>
          <Left>
            <Image source={optionIcon} style={{ width: 20, height: 20 }} />
          </Left>
          <Body>
            <Text>Préférences</Text>
          </Body>
        </ListItem>
      </View>
    );
  };

  render() {
    return (
      <DrawerLayoutAndroid
        ref={'menu'}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}
        drawerLockMode={
          this.props.isAuthenticated ? 'unlocked' : 'locked-closed'
        }
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLayout);
