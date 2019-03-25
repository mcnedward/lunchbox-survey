import {
  GET_SURVEY_RESPONSES_REQUEST,
  GET_SURVEY_RESPONSES_SUCCESS,
  GET_SURVEY_RESPONSES_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from '../handleError';

/**
 * Gets all the SurveyResonses with a Survey id
 * @param {*} id The id of the survey
 */
export default function getSurveyResponses(id) {
  return async dispatch => {
    dispatch({ type: GET_SURVEY_RESPONSES_REQUEST });

    let action;
    try {
      const response = await axios.get(`/api/surveyresponses/${id}`)

      action = {
        type: GET_SURVEY_RESPONSES_SUCCESS,
        data: response.data
      };
    } catch (error) {
      action = handleError(error, GET_SURVEY_RESPONSES_ERROR);
    }

    dispatch(action);
  };
}