import {
  GET_ALL_SURVEYS_SUCCESS,
  GET_SURVEY_SUCCESS
} from '../constants/actions-types';
import Survey from '../models/survey';

async function fetchSurveys() {
  const mockData = [
    new Survey(1, 'First Survey', []),
    new Survey(2, 'Second Survey', []),
    new Survey(3, 'Third Survey', [])
  ];
  return new Promise((resolve, reject) => resolve(mockData));
}

export function getAllSurveys() {
  return async dispatch => {
    const mockData = await fetchSurveys();

    let action = {
      type: GET_ALL_SURVEYS_SUCCESS,
      data: mockData
    };

    dispatch(action);
  }
}

export function getSurveyById(id) {
  return async dispatch => {
    const surveys = await fetchSurveys();

    const survey = surveys.find(s => s.id === id);
    let action = {
      type: GET_SURVEY_SUCCESS,
      data: survey
    }

    dispatch(action);
  }
}