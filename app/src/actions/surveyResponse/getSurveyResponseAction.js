import {
  GET_SURVEY_RESPONSE_REQUEST,
  GET_SURVEY_RESPONSE_SUCCESS,
  GET_SURVEY_RESPONSE_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from '../handleError';

export default function getSurveyResponse(id) {
  return async dispatch => {
    dispatch({ type: GET_SURVEY_RESPONSE_REQUEST });

    let action;
    try {
      const response = await axios.get(`/api/surveyresponses/${id}`)

      action = {
        type: GET_SURVEY_RESPONSE_SUCCESS,
        data: response.data
      };
    } catch (error) {
      action = handleError(error, GET_SURVEY_RESPONSE_ERROR);
    }

    dispatch(action);
  };
}