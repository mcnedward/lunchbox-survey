import {
  POST_SURVEY_REQUEST,
  POST_SURVEY_SUCCESS,
  POST_SURVEY_ERROR
} from "../../constants/actions-types";

export function postSurveyState(state = {}, action) {
  switch (action.type) {
    case POST_SURVEY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case POST_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        isSubmitted: true,
        isLoading: false,
        error: null
      });

    case POST_SURVEY_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.data
      });

    default:
      return state;
  }
}