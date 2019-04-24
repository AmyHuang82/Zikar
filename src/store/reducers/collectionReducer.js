import { ADD_NEW_COLLECTION, ALREADY_HAD_COLLECTION, GET_COLLECTION, UPDATE_COLLECTION, RESET_SUBMIT_STATUS, DELETE_COLLECTION } from '../actions/collectionActions';

const defaultState = {
    collectionEmpty: true,
    getCollection: false,
    collection: {},
    submitStatus: ''
}

function collectionReducer(state = defaultState, action) {
    switch (action.type) {

        case ADD_NEW_COLLECTION:
            return {
                ...state,
                submitStatus: action.typeStr
            }

        case UPDATE_COLLECTION:
            return {
                ...state,
                submitStatus: action.typeStr
            }

        case RESET_SUBMIT_STATUS:
            return {
                ...state,
                submitStatus: ''
            }

        case DELETE_COLLECTION:
            // console.log('delete collection successful');
            return state;

        case ALREADY_HAD_COLLECTION:
            return {
                ...state,
                collectionEmpty: action.status
            }

        case GET_COLLECTION:
            return {
                ...state,
                getCollection: true
            }

        default:
            return state;
    }
}

export default collectionReducer;