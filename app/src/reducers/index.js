import { combineReducers } from 'redux';
import { surveyState } from './surveyReducer';
import { postSurveyState } from './postSurveyReducer';
import { surveyResponseState } from './surveyResponseReducer';
import { getSurveyResponsesState } from './getSurveyResponsesReducer';

const rootReducer = combineReducers({
  surveyState,
  postSurveyState,
  surveyResponseState,
  getSurveyResponsesState
})

export default rootReducer