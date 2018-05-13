import Realm from 'realm';
import TodoListSchema from './TodoListSchema';
import TodoSchema from './TodoSchema';

export default function realm() {
  return Realm.open({ schema: [TodoListSchema, TodoSchema] });
}

export function execRealm(callback: func) {
  realm().then(realm => {
    callback(realm);
  });
}

export function writeRealm(callback: func) {
  realm().then(realm => {
    realm.write(() => callback(realm));
  });
}
