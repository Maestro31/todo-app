export default class TodoListSchema {
  static schema = {
    name: 'TodoList',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      todos: { type: 'Todo[]' }
    }
  };
}
