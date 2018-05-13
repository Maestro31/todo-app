import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import NavigationService from '../NavigationService';
import { default as db, default as firestore } from '../models/firestore';
import {
  USER_SIGNING,
  USER_SIGNING_ABORT,
  USER_SIGNING_FAILED,
  USER_SIGNING_SUCCESS,
  USER_DISCONNECT
} from './constants';

const codes = {
  'auth/email-already-in-use': 'Ce mail est déjà lié à un compte',
  'auth/invalid-email': 'Mail invalide',
  'auth/user-disabled': 'Votre compte a été désactivé',
  'auth/user-not-found': 'Aucun compte ne correspond à ce mail',
  'auth/wrong-password': 'Mot de passe incorrect'
};

export function connectAccount(email: string, password: string) {
  return async dispatch => {
    dispatch({ type: USER_SIGNING });
    try {
      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password);

      db.addUser(credential.user);
    } catch (e) {
      if (e.code) {
        dispatch({ type: USER_SIGNING_FAILED, error: codes[e.code] });
      }
    }
  };
}

export function createAccount(email: string, password: string) {
  return dispatch => {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(credential => {
        console.warn(credential);
      })
      .catch(e => {
        console.warn(e);

        if (e.code) {
          dispatch({
            type: USER_SIGNING_FAILED,
            error: codes[e.code]
          });
        }
      });
  };
}

export function signinWithFacebook() {
  return async dispatch => {
    dispatch({ type: USER_SIGNING });

    try {
      const result = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email'
      ]);

      if (result.isCancelled) {
        dispatch({ type: USER_SIGNING_ABORT });
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.error("impossible d'obtenir le jeton d'accès");
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      firestore.addUser(currentUser.user);
      dispatch({ type: USER_SIGNING_SUCCESS });
    } catch (e) {
      dispatch({ type: USER_SIGNING_FAILED });
      console.error(e);
    }
  };
}

export function signinWithGoogle() {
  return async dispatch => {
    dispatch({ type: USER_SIGNING });

    try {
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      dispatch({ type: USER_SIGNING_SUCCESS });
    } catch (e) {
      dispatch({ type: USER_SIGNING_FAILED });
      console.error(e);
    }
  };
}

export function disconnectAccount() {
  return async dispatch => {
    try {
      await firebase.auth().signOut();

      NavigationService.goFirstScreen();
    } catch (e) {
      console.error(e);
    }
  };
}

export function authStateChange(user) {
  return dispatch => {
    if (user) {
      dispatch({ type: USER_SIGNING_SUCCESS });
      NavigationService.goTodoLists();
    } else {
      dispatch({type: USER_DISCONNECT});
      NavigationService.goFirstScreen();
    }
  };
}
