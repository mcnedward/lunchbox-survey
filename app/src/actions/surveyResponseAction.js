import {
  RESPOND_SURVEY_REQUEST,
  RESPOND_SURVEY_SUCCESS,
  RESPOND_SURVEY_ERROR
} from "../constants/actions-types";
import axios from 'axios';
import handleError from './handleError';

export function respondToSurvey(surveyResponse) {
  return async dispatch => {
    dispatch({ type: RESPOND_SURVEY_REQUEST });

    let action;
    try {
      const response = await axios.post('/api/surveys', surveyResponse);
      console.log(response)
      
      action = {
        type: RESPOND_SURVEY_SUCCESS,
        data: true
      };
    } catch (error) {
      action = handleError(error, RESPOND_SURVEY_ERROR);
    }

    dispatch(action);
  };
}
