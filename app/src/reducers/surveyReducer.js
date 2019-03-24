import {
  GET_ALL_SURVEYS_SUCCESS,
  GET_ALL_SURVEYS_ERROR,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_RESPONSES_SUCCESS
} from '../constants/actions-types';

export function surveyState(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SURVEYS_SUCCESS:
      return Object.assign({}, state, {
        surveys: action.data
      });

    case GET_ALL_SURVEYS_ERROR:
      return Object.assign({}, state, {
        error: action.data
      });

    case GET_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        survey: action.data
      });

    case GET_SURVEY_RESPONSES_SUCCESS:
      return Object.assign({}, state, {
        survey: action.data
      });

    default:
      return state;
  }
}