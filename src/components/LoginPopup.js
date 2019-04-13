import React from 'react';
import { connect } from 'react-redux';
import { loginToWeb } from '../store/actions/loginActions';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        let provider;
        if (e.target.textContent === '使用 Facebook 登入') {
            provider = 'facebook';
        } else {
            provider = 'google';
        }
        this.props.login_reducer(provider);
    }

    render() {
        return (
            <div className="popup-overlay" style={{ display: this.props.loginState.login ? 'none' : 'flex' }}>
                <div className="popup-content">
                    <div className="modal">
                        <div className="header">
                            <img src='../../image/Logo.svg' />
                            馬上登入建立字卡學習
                        </div>

                        <div className="actions">
                            <button
                                className="button"
                                onClick={this.login}
                            >
                                <img src="../../image/facebook.svg" />
                                使用 Facebook 登入
                            </button>

                            <button
                                className="button"
                                onClick={this.login}
                            >
                                <img src="../../image/google.svg" />
                                使用 Google 登入
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.login.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login_reducer: (provider) => {
            dispatch(loginToWeb(provider));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);