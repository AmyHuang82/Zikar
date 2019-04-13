import { ADD_NEW_COLLECTION, ALREADY_HAD_COLLECTION, GET_COLLECTION, UPDATE_COLLECTION, DELETE_COLLECTION } from '../actions/collectionActions';

const defaultState = {
    collectionEmpty: true,
    getCollection: false,
    collection: {
        user_id: '',
        author: '',
        title: '',
        timestamp: '',
        important: false,
        public: true,
        word_lan: '',
        definition_lan: ''
    }
}

function collectionReducer(state = defaultState, action) {
    switch (action.type) {

        case ADD_NEW_COLLECTION:
            console.log(action.collection);
            return state;

        case UPDATE_COLLECTION:
            console.log(action.collection);
            return state;

        case DELETE_COLLECTION:
            console.log('delete collection successful');
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