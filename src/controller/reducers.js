import { combineReducers } from 'redux';
import { SEARCH_BAR_TOGGLE } from './actions';

// 設定預設 state
const defaultState = {
    mobileSearchBarOpen: false
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

const App = combineReducers({
    searchBarOpen_reducer
});

export default App;