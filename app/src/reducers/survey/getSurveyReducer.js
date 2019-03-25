import {
  GET_SURVEY_REQUEST,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR
} from "../../constants/actions-types";

export function getSurveyState(state = {}, action) {
  switch (action.type) {
    case GET_SURVEY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case GET_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        survey: action.data,
        isLoading: false,
        error: null
      });

    case GET_SURVEY_ERROR:
      return Object.assign({}, state, {
        error: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}