import {
  GET_SURVEYS_REQUEST,
  GET_SURVEYS_SUCCESS,
  GET_SURVEYS_ERROR
} from "../../constants/actions-types";

export function getSurveysState(state = {}, action) {
  switch (action.type) {
    case GET_SURVEYS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_SURVEYS_SUCCESS:
      return Object.assign({}, state, {
        surveys: action.data,
        isLoading: false,
        error: null
      });

    case GET_SURVEYS_ERROR:
      return Object.assign({}, state, {
        error: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}