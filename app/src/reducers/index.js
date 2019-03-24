import { combineReducers } from 'redux';
import { surveyState } from './surveyReducer';
import { surveyResponseState } from './surveyResponseReducer';

const rootReducer = combineReducers({
  surveyState,
  surveyResponseState
})

export default rootReducer