import React from 'react';
import { connect } from 'react-redux';
import { loginToWeb } from '../reducer/actions';

class LoginPopup extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        let provider;
        if (e.target.textContent === '使用 Facebook 登入') {
            provider = new firebase.auth.FacebookAuthProvider();
        } else {
            provider = new firebase.auth.GoogleAuthProvider();
        }

        firebase.auth().signInWithPopup(provider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user;
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        // 登入狀態改變成功，呼叫dispatch改變loginState
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.login_reducer(user.uid);
            }
        });
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
        loginState: state.login_reducer.loginState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login_reducer: (user_id) => {
            dispatch(loginToWeb(user_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);