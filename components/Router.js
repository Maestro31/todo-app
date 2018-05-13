import { StackNavigator } from 'react-navigation';
import CreateAccountScreen from './screens/CreateAccountScreen';
import FirstScreen from './screens/FirstScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TodoListsScreen from './screens/TodoListsScreen';
import TodosOptionsScreen from './screens/TodosOptionsScreen';
import TodosScreen from './screens/TodosScreen';

export default StackNavigator(
  {
    First: { screen: FirstScreen },
    Home: { screen: HomeScreen },
    CreateAccount: { screen: CreateAccountScreen },
    Login: { screen: LoginScreen },
    TodoLists: { screen: TodoListsScreen },
    Todos: { screen: TodosScreen },
    TodosOptions: { screen: TodosOptionsScreen }
  },
  {
    // initialRouteName: 'TodosOptions'
    // initialRouteName: 'TodoLists'
    // initialRouteName: 'First'
  }
);
