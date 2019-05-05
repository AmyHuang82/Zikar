import React from 'react';
import { connect } from 'react-redux';
import { loginToWeb, loginCheck, logout } from '../store/actions/loginActions';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDescription: false
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.showDesHandler = this.showDesHandler.bind(this);
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

    logout() {
        this.setState({ logoutState: true });
        this.props.logout();
    }

    showDesHandler() {
        this.setState({ showDescription: true });
    }

    componentDidMount() {
        this.props.loginCheck();
    }

    render() {
        return (
            <div className="popup-overlay" style={{ display: this.props.loginState.login ? 'none' : 'flex' }}>
                <div className="popup-overlay" style={{ display: this.state.showDescription ? 'none' : 'flex', backgroundColor: 'rgba(0,0,0,0)' }}>
                    <div className="popup-content">
                        <div className="modal">
                            <div className="header">
                                <img src='../../image/Logo.svg' />
                                馬上登入 / 註冊建立字卡學習
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

                                <button
                                    className="button"
                                    onClick={this.showDesHandler}
                                >
                                    <img src="../../image/user.svg" />
                                    使用 訪客身份 瀏覽
                            </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="deletecheck-popup" style={{ height: '397px', padding: 0, display: this.state.showDescription ? 'block' : 'none' }}>
                    <img src='/image/description.svg' />
                    <button className='cancel' onClick={this.login}>先逛逛</button>
                    <button className='confirm' onClick={this.logout}>登入 / 註冊</button>
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
        },
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);