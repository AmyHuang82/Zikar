import React from 'react';
import { connect } from 'react-redux';
import { loginToWeb, loginCheck } from '../store/actions/loginActions';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        let provider;
        if (e.target.textContent === '使用 Facebook 登入') {
            provider = 'facebook';
        } else if (e.target.textContent === '使用 Google 登入') {
            provider = 'google';
        } else {
            provider = '';
        }
        this.props.login_reducer(provider);
    }

    componentDidMount() {
        this.props.loginCheck();
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

                            {/* <button
                                className="button"
                                onClick={this.login}
                            >
                                <img src="../../image/user.svg" />
                                使用訪客模式登入
                            </button> */}
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
        },
        loginCheck: () => {
            dispatch(loginCheck());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);