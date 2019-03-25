import {
  POST_SURVEY_REQUEST,
  POST_SURVEY_SUCCESS,
  POST_SURVEY_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from '../handleError'

export default function postSurvey(survey) {
  return async dispatch => {
    dispatch({type: POST_SURVEY_REQUEST});

    let action;
    try {
      await axios.post(`/api/surveys`, survey);

      action = {
        type: POST_SURVEY_SUCCESS,
        data: true
      };
    } catch (error) {
      action = handleError(error, POST_SURVEY_ERROR);
    }

    dispatch(action);
  };
}
