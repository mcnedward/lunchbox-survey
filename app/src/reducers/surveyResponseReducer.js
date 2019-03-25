import {
  RESPOND_SURVEY_REQUEST,
  RESPOND_SURVEY_SUCCESS,
  RESPOND_SURVEY_ERROR
} from "../constants/actions-types";

export function surveyResponseState(state = {}, action) {
  switch (action.type) {
    case RESPOND_SURVEY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case RESPOND_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        isSubmitted: true,
        isLoading: false,
        error: null
      });

    case RESPOND_SURVEY_ERROR:
      return Object.assign({}, state, {
        error: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}