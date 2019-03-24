import {
  GET_ALL_SURVEYS_SUCCESS,
  GET_ALL_SURVEYS_ERROR,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_ERROR,
  GET_SURVEY_RESPONSES_SUCCESS
} from "../constants/actions-types";
import Survey from "../models/survey";
import { Question, QuestionTypes } from "../models/question";
import axios from 'axios';

function createSurvey(id, name) {
  let questions = [];
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      questions.push(new Question(i + 1, QuestionTypes.Text, 'Tell me more'));
    } else if (i < 4) {
      questions.push(new Question(i + 1, QuestionTypes.Choice, 'Pick one', ['Blue', 'Red', 'Green']));
    } else {
      questions.push(new Question(i + 1, QuestionTypes.Bool, 'Yes or No?'));
    }
  }
  return new Survey(id, name, questions);
}

async function fetchSurveys() {
  const mockData = [
    createSurvey(1, "First Survey"),
    createSurvey(2, "Second Survey"),
    createSurvey(3, "Third Survey")
  ];
  return new Promise((resolve, reject) => resolve(mockData));
}

function errorAction(errorData, type) {
  let error;
  if (errorData.response) {
    error = errorData.response.data;
  } else {
    error = errorData.message || 'Something went terribly wrong.'
  }
  return { type, data: error };
}

export function getAllSurveys() {
  return async dispatch => {
    let action;
    try {
      const response = await axios.get('/api/surveys');

      let surveys = response.data.map(d => new Survey(d));
      
      action = {
        type: GET_ALL_SURVEYS_SUCCESS,
        data: surveys
      };
    } catch (error) {
      action = errorAction(error, GET_ALL_SURVEYS_ERROR);
    }

    dispatch(action);
  };
}

export function getSurveyById(id) {
  return async dispatch => {
    let action;
    try {
      const response = await axios.get(`/api/surveys/${id}`);

      let survey;
      if (response.data != null) {
        survey = new Survey(response.data);
      }
      
      action = {
        type: GET_SURVEY_SUCCESS,
        data: survey
      };
    } catch (error) {
      action = errorAction(error, GET_SURVEY_ERROR);
    }

    dispatch(action);
  };
}
