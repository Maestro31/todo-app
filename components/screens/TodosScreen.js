import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../NavigationService';
import {
  addTodoOnList,
  changeStatusForTodo,
  deleteTodo,
  editTodo
} from '../../actions/todoAction';
import { deleteTodoList } from '../../actions/todoListActions';
import menuIcon from '../../images/menu-icon.png';
import deleteIcon from '../../images/trash-icon.png';
import Dialog from '../Dialog';
import SwipeTodo from '../SwipeTodo';
import AddButton from '../styled-components/AddButton';
import Page from '../styled-components/Page';
import { deleteAlert } from '../utils/alert';

class TodosScreen extends Component {
  state = {
    dialogVisible: false,
    todoNameValue: '',
    editMode: false,
    selectedTodoId: null
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      ...params,
      title: params.title,
      headerRight: (
        <View
          style={{
            marginRight: 5,
            flexDirection: 'row'
          }}>
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={() => {
              deleteAlert(() => {
                params.deleteTodoList(params.todoListId);
                NavigationService.goBack();
              });
            }}>
            <Image source={deleteIcon} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('TodosOptions', {});
            }}>
            <Image source={menuIcon} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      deleteTodoList: this.props.deleteTodoList,
      todoListId: this.props.todoList.id
    });
  }

  onPressItem = (id: string, status: string) => {
    status = status == 'completed' ? '' : 'completed';
    this.props.changeStatusForTodo(id, status, this.props.todoList.id);
  };

  onEditItem = (id: string, name: string) => {
    this.setState({
      dialogVisible: true,
      editMode: true,
      todoNameValue: name,
      selectedTodoId: id
    });
  };

  onDeleteItem = (id: string) => {
    this.props.deleteTodo(id, this.props.todoList.id);
  };

  addButtonPress() {
    this.setState({ dialogVisible: true });
  }

  onDialogCancel() {
    this.setState({ dialogVisible: false, todoNameValue: '' });
  }

  onDialogConfirm() {
    if (this.state.todoNameValue === '') return;

    if (this.state.editMode) {
      this.props.editTodo(
        this.state.selectedTodoId,
        this.state.todoNameValue,
        this.props.todoList.id
      );
    } else {
      this.props.addTodoOnList(
        this.props.todoList.id,
        this.state.todoNameValue
      );
    }

    this.setState({ dialogVisible: false, editMode: false, todoNameValue: '' });
  }

  dialogContent = () => {
    return (
      <View>
        <TextInput
          autoFocus
          value={this.state.todoNameValue}
          onChangeText={text => this.setState({ todoNameValue: text })}
        />
      </View>
    );
  };

  render() {
    return (
      <Page>
        <SwipeTodo
          dataSource={this.props.todos}
          onPressItem={this.onPressItem}
          onEditItem={this.onEditItem}
          onDeleteItem={this.onDeleteItem}
        />
        <Dialog
          title="Nom de la tâche"
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
    todoList: state.todosReducer.todoList,
    todos: state.todosReducer.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatusForTodo: (id, status, listId) =>
      dispatch(changeStatusForTodo(id, status, listId)),
    addTodoOnList: (listId, name) => dispatch(addTodoOnList(listId, name)),
    deleteTodoList: id => dispatch(deleteTodoList(id)),
    editTodo: (id, name, listId) => dispatch(editTodo(id, name, listId)),
    deleteTodo: (id, listId) => dispatch(deleteTodo(id, listId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosScreen);
