import { Button, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Image, ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import editIcon from '../images/edit-icon.png';
import trashIcon from '../images/trash-icon.png';

const DeactivatableText = styled.Text`
  text-decoration: ${props => (props.disable ? 'line-through' : 'none')};
  color: ${props => (props.disable ? '#999' : '#666')};
`;

class SwipeTodo extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <List
        dataSource={this.ds.cloneWithRows(this.props.dataSource)}
        renderRow={data => {
          const completed = data.status == 'completed';
          return this.props.hideTodosCompleted && completed ? null : (
            <ListItem
              onPress={() => this.props.onPressItem(data.id, data.status)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: 5
                }}>
                <DeactivatableText disable={completed}>
                  {data.name}
                </DeactivatableText>
                {completed ? <Text>✅</Text> : null}
              </View>
            </ListItem>
          );
        }}
        renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            onPress={() => {
              rowMap[`${secId}${rowId}`].props.closeRow();
              this.props.onEditItem(data.id, data.name);
            }}>
            <Image source={editIcon} style={{ width: 30, height: 30 }} />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={() => {
              rowMap[`${secId}${rowId}`].props.closeRow();
              this.props.onDeleteItem(data.id);
            }}>
            <Image source={trashIcon} style={{ width: 30, height: 30 }} />
          </Button>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    hideTodosCompleted: state.todosReducer.hideCompletedTodos
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeTodo);
