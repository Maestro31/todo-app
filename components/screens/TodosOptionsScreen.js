import { Body, Card, CardItem, Text as TextBase } from 'native-base';
import React, { Component } from 'react';
import { Button, Switch, Text, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../NavigationService';
import { hideCompletedTodos } from '../../actions/todoAction';
import { disconnectAccount } from '../../actions/userAction';
import Page from '../styled-components/Page';

class TodosOptionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideTodoCompleted: props.hideTodoCompleted
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      ...params,
      title: 'Options'
    };
  };

  onSubmit = () => {
    this.props.hideCompletedTodos(this.state.hideTodoCompleted);
    NavigationService.goBack();
  };

  onSubmitDisconnect() {
    this.props.disconnectAccount();
  }

  render() {
    return (
      <Page>
        <Card>
          <CardItem header>
            <TextBase>Options d'affichages</TextBase>
          </CardItem>
          <CardItem>
            <Body>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <Text>Masquer les tâches déjà effectuées</Text>
                <Switch
                  value={this.state.hideTodoCompleted}
                  onValueChange={value =>
                    this.setState({ hideTodoCompleted: value })
                  }
                />
              </View>
            </Body>
          </CardItem>
          <Button
            title="se déconnecter"
            onPress={() => this.onSubmitDisconnect()}
          />
        </Card>
        <Button
          title="Valider"
          color="#007aff"
          style={{ height: 50 }}
          onPress={() => this.onSubmit()}
        />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    hideTodoCompleted: state.todosReducer.hideCompletedTodos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideCompletedTodos: hideTodo => dispatch(hideCompletedTodos(hideTodo)),
    disconnectAccount: () => dispatch(disconnectAccount())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosOptionsScreen);
