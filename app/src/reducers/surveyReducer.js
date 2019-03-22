import {
  SURVEYS_REQUEST,
  SURVEYS_SUCCESS
} from '../constants/actions-types';
import Survey from '../models/survey';

export function surveyState(state = {}, action) {
  switch (action.type) {
    case SURVEYS_SUCCESS:
      return Object.assign({}, state, {
        surveys: action.data
      });
    default:
      return state;
  }
}