import {
  GET_SURVEY_RESPONSE_REQUEST,
  GET_SURVEY_RESPONSE_SUCCESS,
  GET_SURVEY_RESPONSE_ERROR
} from "../../constants/actions-types";

export function getSurveyResponseState(state = {}, action) {
  switch (action.type) {
    case GET_SURVEY_RESPONSE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_SURVEY_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        surveyResponse: action.data,
        isLoading: false,
        error: null
      });

    case GET_SURVEY_RESPONSE_ERROR:
      return Object.assign({}, state, {
        error: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}