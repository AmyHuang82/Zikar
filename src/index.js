// React
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

// firebase
import firebase from './firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

// Component
import Header from './components/Header';
import Background from './components/Background';
import LoginPopup from './components/LoginPopup';
import Dashboard from './components/Dashboard';
import CollectionDetail from './components/collection/CollectionDetail';
import MakingCollection from './components/collection/MakingCollection';

// 建立 store，把 reducer 傳進去
let store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase)
    ));

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <LoginPopup />
                    <Background />
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Collection/:id" exact component={CollectionDetail} />
                    <Route path="/MakingCards" exact component={MakingCollection} />
                </Router>
            </Provider>
        );
    }
}

window.addEventListener('load', () => {
    ReactDOM.render(<Main />, document.getElementById('root'));
});