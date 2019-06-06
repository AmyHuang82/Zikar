import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import searchBarReducer from './searchBarReducer';
import collectionReducer from './collectionReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  mobileSearchBar: searchBarReducer,
  login: loginReducer,
  collection: collectionReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;