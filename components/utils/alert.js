import { Alert } from 'react-native';

export function createAlert({ title, message, callback }) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Oui',
        onPress: () => {
          callback();
        }
      },
      {
        text: 'Non',
        onPress: () => {
          return;
        },
        style: 'cancel'
      }
    ],
    { cancelable: false }
  );
}

export function deleteAlert(callback) {
  createAlert({
    title: 'Alerte',
    message: 'Confirmer la suppression?',
    callback
  });
}
