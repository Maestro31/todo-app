export default class TodoSchema {
  static schema = {
    name: 'Todo',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      status: 'string'
    }
  };
}
