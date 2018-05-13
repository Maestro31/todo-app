import { Button, List, ListItem } from 'native-base';
import React, { Component } from 'react';
import { Image, ListView, Text } from 'react-native';
import editIcon from '../images/edit-icon.png';
import trashIcon from '../images/trash-icon.png';

export default class SwipeTodoList extends Component {
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
        renderRow={data => (
          <ListItem onPress={() => this.props.onPressItem(data.id)}>
            <Text> {data.name} </Text>
          </ListItem>
        )}
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
