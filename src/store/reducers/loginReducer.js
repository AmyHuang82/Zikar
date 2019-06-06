import { LOGIN_TO_WEB, LOGOUT } from '../actions/loginActions';

const defaultState = {
  loginState: {
    login: false,
    user_name: '',
    user_id: '',
    user_photo: ''
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
          user_photo: action.user.photoURL ? action.user.photoURL : '/image/user.svg'
        }
      }

    case LOGOUT:
      return {
        ...state,
        loginState: {
          login: false,
          user_name: '',
          user_id: '',
          user_photo: ''
        }
      }

    default:
      return state
  }
}

export default loginReducer;