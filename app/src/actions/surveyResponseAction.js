import {
  RESPOND_SURVEY_REQUEST,
  RESPOND_SURVEY_SUCCESS,
  RESPOND_SURVEY_ERROR} from "../constants/actions-types";
import axios from 'axios';
import handleError from './handleError';

export function respondToSurvey(surveyResponse) {
  return async dispatch => {
    dispatch({ type: RESPOND_SURVEY_REQUEST });

    let action;
    try {
      console.log('success')
      action = {
        type: RESPOND_SURVEY_SUCCESS,
        data: true
      };
    } catch (error) {
      console.log('error')
      action = handleError(error, RESPOND_SURVEY_ERROR);
    }

    dispatch(action);
  };
}
