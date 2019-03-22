import {
  SURVEYS_REQUEST,
  SURVEYS_SUCCESS
} from '../constants/actions-types';
import Survey from '../models/survey';

export function fetchSurveys() {
  return dispatch => {
    const mockData = [
      new Survey(1, 'First Survey', []),
      new Survey(2, 'Second Survey', []),
      new Survey(3, 'Third Survey', [])
    ];
    let action = {
      type: SURVEYS_SUCCESS,
      data: mockData
    };

    dispatch(action);
  }
}