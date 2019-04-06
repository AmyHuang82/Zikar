import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// Component
import Header from './components/Header';
import Background from './components/Background';
import LoginPopup from './components/LoginPopup';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <LoginPopup />
                <Background />
            </div>
        );
    }
}

window.addEventListener('load', () => {
    ReactDOM.render(<Main />, document.getElementById('root'));
});