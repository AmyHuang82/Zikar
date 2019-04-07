import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducer/reducers';

// Component
import Header from './components/Header';
import Background from './components/Background';
import LoginPopup from './components/LoginPopup';

// 建立 store，把 reducer 傳進去
let store = createStore(AppReducer);

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <LoginPopup />
                <Background />
            </Provider>
        );
    }
}

window.addEventListener('load', () => {
    ReactDOM.render(<Main />, document.getElementById('root'));
});