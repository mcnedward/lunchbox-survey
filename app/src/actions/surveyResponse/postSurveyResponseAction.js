import {
  POST_SURVEY_RESPONSE_REQUEST,
  POST_SURVEY_RESPONSE_SUCCESS,
  POST_SURVEY_RESPONSE_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from '../handleError'

export default function postSurveyResponse(survey) {
  return async dispatch => {
    dispatch({type: POST_SURVEY_RESPONSE_REQUEST});

    let action;
    try {
      await axios.post(`/api/surveyresponses`, survey);

      action = {
        type: POST_SURVEY_RESPONSE_SUCCESS,
        data: true
      };
    } catch (error) {
      action = handleError(error, POST_SURVEY_RESPONSE_ERROR);
    }

    dispatch(action);
  };
}
