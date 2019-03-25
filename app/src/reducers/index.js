import { combineReducers } from 'redux';
import { getSurveyState } from './survey/getSurveyReducer';
import { getSurveysState } from './survey/getSurveysReducer';
import { postSurveyState } from './survey/postSurveyReducer';
import { getSurveyResponsesState } from './surveyResponse/getSurveyResponsesReducer';
import { postSurveyResponseState } from './surveyResponse/postSurveyResponseReducer';

const rootReducer = combineReducers({
  getSurveyState,
  getSurveysState,
  postSurveyState,
  getSurveyResponsesState,
  postSurveyResponseState
})

export default rootReducer