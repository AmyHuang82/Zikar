import { ADD_NEW_COLLECTION } from '../actions/collectionActions';

const defaultState = {
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

        default:
            return state;
    }
}

export default collectionReducer;