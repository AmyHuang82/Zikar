import { LOGIN_TO_WEB } from '../actions/loginActions';

const defaultState = {
    loginState: {
        // login: false,
        // user_name: '',
        // user_id: '',
        // user_photo: ''
        login: true,
        user_name: 'Amy Huang',
        user_id: "62aZObMlvFX35VJ8t8Vg1BfLedi1",
        user_photo: "https://graph.facebook.com/2213110725441835/picture"
    }
}

function loginReducer(state = defaultState, action) {
    switch (action.type) {

        case LOGIN_TO_WEB:
            return {
                ...state,
                loginState: {
                    login: true,
                    user_name: action.user.displayName,
                    user_id: action.user.uid,
                    user_photo: action.user.photoURL
                }
            }

        default:
            return state
    }
}

export default loginReducer;