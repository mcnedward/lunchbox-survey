import {
  POST_SURVEY_RESPONSE_REQUEST,
  POST_SURVEY_RESPONSE_SUCCESS,
  POST_SURVEY_RESPONSE_ERROR
} from "../../constants/actions-types";

export function postSurveyResponseState(state = {}, action) {
  switch (action.type) {
    case POST_SURVEY_RESPONSE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case POST_SURVEY_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        isSubmitted: true,
        isLoading: false,
        error: null
      });

    case POST_SURVEY_RESPONSE_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.data
      });

    default:
      return state;
  }
}