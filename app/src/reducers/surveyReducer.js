import {
  GET_ALL_SURVEYS_SUCCESS,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_RESPONSES_SUCCESS
} from '../constants/actions-types';
import Survey from '../models/survey';

export function surveyState(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SURVEYS_SUCCESS:
      return Object.assign({}, state, {
        surveys: action.data
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