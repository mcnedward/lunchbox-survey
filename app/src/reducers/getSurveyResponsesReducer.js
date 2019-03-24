import {
  GET_SURVEY_RESPONSES_REQUEST,
  GET_SURVEY_RESPONSES_SUCCESS,
  GET_SURVEY_RESPONSES_ERROR
} from "../constants/actions-types";

export function getSurveyResponsesState(state = {}, action) {
  switch (action.type) {
    case GET_SURVEY_RESPONSES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case GET_SURVEY_RESPONSES_SUCCESS:
      return Object.assign({}, state, {
        surveyResponses: action.data,
        isLoading: false
      });

    case GET_SURVEY_RESPONSES_ERROR:
      return Object.assign({}, state, {
        error: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}