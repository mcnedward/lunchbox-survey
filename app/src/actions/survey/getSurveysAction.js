import {
  GET_SURVEYS_REQUEST,
  GET_SURVEYS_SUCCESS,
  GET_SURVEYS_ERROR
} from "../../constants/actions-types";
import axios from 'axios';
import handleError from "../handleError";

export default function getSurveys() {
  return async dispatch => {
    dispatch({ type: GET_SURVEYS_REQUEST });

    let action;
    try {
      const response = await axios.get(`/api/surveys`);
      
      action = {
        type: GET_SURVEYS_SUCCESS,
        data: response.data
      };
    } catch (error) {
      action = handleError(error, GET_SURVEYS_ERROR);
    }

    dispatch(action);
  };
}
