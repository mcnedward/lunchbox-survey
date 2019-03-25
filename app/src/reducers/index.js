import { combineReducers } from 'redux';
import { getSurveyState } from './survey/getSurveyReducer';
import { getSurveysState } from './survey/getSurveysReducer';
import { postSurveyState } from './survey/postSurveyReducer';
import { surveyResponseState } from './surveyResponseReducer';
import { getSurveyResponsesState } from './getSurveyResponsesReducer';

const rootReducer = combineReducers({
  getSurveyState,
  getSurveysState,
  postSurveyState,
  surveyResponseState,
  getSurveyResponsesState
})

export default rootReducer