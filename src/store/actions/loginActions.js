export const LOGIN_TO_WEB = 'LOGIN_TO_WEB';

export function loginToWeb(user) {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: LOGIN_TO_WEB, user });
    }
}