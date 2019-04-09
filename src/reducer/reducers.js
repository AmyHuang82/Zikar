import { combineReducers } from 'redux';
import { SEARCH_BAR_TOGGLE, LOGIN_TO_WEB } from './actions';

// 設定預設 state
const defaultState = {
    mobileSearchBarOpen: false,
    loginState: {
        login: false,
        user_id: '',
        user_photo: ''
    }
}

function searchBarOpen_reducer(state = defaultState, action) {
    switch (action.type) {

        case SEARCH_BAR_TOGGLE:
            return {
                ...state,
                mobileSearchBarOpen: !state.mobileSearchBarOpen
            }

        default:
            return state
    }
}

function login_reducer(state = defaultState, action) {
    switch (action.type) {

        case LOGIN_TO_WEB:

            return {
                ...state,
                loginState: {
                    login: true,
                    user_id: action.user.uid,
                    user_photo: action.user.photoURL
                }
            }

        default:
            return state
    }
}

const App = combineReducers({
    searchBarOpen_reducer,
    login_reducer
});

export default App;