import React from 'react'

class LoginPopup extends React.Component {
    loginFacebook(e) {
        var provider = new firebase.auth.FacebookAuthProvider();

        // 登入方法都一樣(redux可以寫一種function)google還有提供redirect的方法
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    loginGoogle(e) {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <div className="modal">
                        <div className="header">
                            <img src='../../image/Logo.svg' />
                            馬上登入建立字卡學習
                        </div>

                        <div className="actions">
                            <button
                                className="button"
                                onClick={this.loginFacebook.bind(this)}
                            >
                                <img src="../../image/facebook.svg" />
                                使用 Facebook 登入
                            </button>

                            <button
                                className="button"
                                onClick={this.loginGoogle.bind(this)}
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

export default LoginPopup;