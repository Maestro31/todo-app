import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchTodosFromList } from '../../actions/todoAction';
import {
  addTodoList,
  deleteTodoList,
  editTodoList,
  fetchAllTodoLists
} from '../../actions/todoListActions';
import Dialog from '../Dialog';
import SwipeTodoList from '../SwipeTodoList';
import AddButton from '../styled-components/AddButton';
import Page from '../styled-components/Page';
import { deleteAlert } from '../utils/alert';

class TodoListsScreen extends Component {
  state = {
    dialogVisible: false,
    listNameValue: '',
    editMode: false,
    selectedListId: null
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      ...params,
      title: 'Mes listes'
    };
  };

  componentWillMount() {
    this.props.fetchAllTodoLists();
  }

  onPressItem = (id: string) => {
    this.props.fetchTodosFromList(id);
  };

  onEditItem = (id: string, name: string) => {
    this.setState({
      dialogVisible: true,
      editMode: true,
      listNameValue: name,
      selectedListId: id
    });
  };

  onDeleteItem = (id: string) => {
    deleteAlert(() => {
      this.props.deleteTodoList(id);
    });
  };

  addButtonPress() {
    this.setState({ dialogVisible: true });
  }

  onDialogCancel() {
    this.setState({
      dialogVisible: false,
      listNameValue: '',
      editMode: false,
      selectedListId: null
    });
  }

  onDialogConfirm() {
    if (this.state.listNameValue === '') return;

    if (this.state.editMode) {
      this.props.editTodoList(
        this.state.selectedListId,
        this.state.listNameValue
      );
    } else {
      this.props.addTodoList(this.state.listNameValue);
    }

    this.setState({ dialogVisible: false, editMode: false, listNameValue: '' });
  }

  dialogContent = () => {
    return (
      <View>
        <TextInput
          autoFocus
          value={this.state.listNameValue}
          onChangeText={text => this.setState({ listNameValue: text })}
        />
      </View>
    );
  };

  render() {
    return (
      <Page>
        <SwipeTodoList
          dataSource={this.props.lists}
          onPressItem={this.onPressItem}
          onEditItem={this.onEditItem}
          onDeleteItem={this.onDeleteItem}
        />
        <Dialog
          title="Nom de la liste"
          confirmLabel={this.state.editMode ? 'Valider' : 'Ajouter'}
          visible={this.state.dialogVisible}
          onCancel={() => this.onDialogCancel()}
          onConfirm={() => this.onDialogConfirm()}
          content={this.dialogContent}
        />
        <AddButton
          onPress={() => {
            this.addButtonPress();
          }}>
          <Text style={{ color: '#FFF', fontSize: 25 }}>+</Text>
        </AddButton>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.todoListsReducer.lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllTodoLists: () => dispatch(fetchAllTodoLists()),
    fetchTodosFromList: id => dispatch(fetchTodosFromList(id)),
    addTodoList: name => dispatch(addTodoList(name)),
    editTodoList: (id, name) => dispatch(editTodoList(id, name)),
    deleteTodoList: id => dispatch(deleteTodoList(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListsScreen);
