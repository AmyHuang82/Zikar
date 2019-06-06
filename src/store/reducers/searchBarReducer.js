import { SEARCH_BAR_TOGGLE } from '../actions/searchBarActions';

const defaultState = {
  mobileSearchBarOpen: false
}

function searchBarReducer(state = defaultState, action) {
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

export default searchBarReducer;