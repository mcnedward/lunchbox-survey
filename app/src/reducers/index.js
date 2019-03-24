import { combineReducers } from 'redux';
import { surveyState } from './surveyReducer';
import { surveyResponseState } from './surveyResponseReducer';
import { getSurveyResponsesState } from './getSurveyResponsesReducer';

const rootReducer = combineReducers({
  surveyState,
  surveyResponseState,
  getSurveyResponsesState
})

export default rootReducer