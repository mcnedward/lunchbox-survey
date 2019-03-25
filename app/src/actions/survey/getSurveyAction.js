import {
  GET_SURVEY_REQUEST,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from "../handleError";

export default function getSurvey(id) {
  return async dispatch => {
    dispatch({type: GET_SURVEY_REQUEST});

    let action;
    try {
      const response = await axios.get(`/api/surveys/${id}`);
      
      action = {
        type: GET_SURVEY_SUCCESS,
        data: response.data
      };
    } catch (error) {
      action = handleError(error, GET_SURVEY_ERROR);
    }

    dispatch(action);
  };
}

