import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import searchBarReducer from './searchBarReducer';

const rootReducer = combineReducers({
    mobileSearchBar: searchBarReducer,
    login: loginReducer
});

export default rootReducer;