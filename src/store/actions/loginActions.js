export const LOGIN_TO_WEB = 'LOGIN_TO_WEB';
export function loginToWeb(provider) {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();

        if (provider === 'facebook') {
            provider = new firebase.auth.FacebookAuthProvider();
        } else {
            provider = new firebase.auth.GoogleAuthProvider();
        }

        firebase.auth().signInWithPopup(provider).then(function (result) {
            let user = result.user;
            dispatch({ type: LOGIN_TO_WEB, user });
        }).catch(function (error) {
            console.log(error);
        });
    }
}