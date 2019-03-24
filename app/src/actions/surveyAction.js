import {
  GET_ALL_SURVEYS_SUCCESS,
  GET_ALL_SURVEYS_ERROR,
  GET_SURVEY_SUCCESS,
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

export function getAllSurveys() {
  return async dispatch => {
    let action;
    try {
      const response = await axios.get('/api/surveys');
      
      action = {
        type: GET_ALL_SURVEYS_SUCCESS,
        data: []
      };
    } catch (error) {
      action = {
        type: GET_ALL_SURVEYS_ERROR,
        data: error.response.data
      };
    }

    dispatch(action);
  };
}

export function getSurveyById(id) {
  return async dispatch => {
    const surveys = await fetchSurveys();

    const survey = surveys.find(s => s.id === id);
    let action = {
      type: GET_SURVEY_SUCCESS,
      data: survey
    };

    dispatch(action);
  };
}

export function getSurveyResponses(id) {
  return async dispatch => {
    const surveys = await fetchSurveys();

    const survey = surveys.find(s => s.id === id);

    for (let question of survey.questions) {
      for (let i = 0; i < 8; i++) {
        let response;
        if (question.type === QuestionTypes.Text) {
          response = 'Some long response goes here. Hopefully this will never be too long that it is hard to read, but we will see. Here we go, here is your answer.'
        }
        else if (question.type === QuestionTypes.Choice) {
          let random = Math.floor(Math.random() * question.options.length);
          response = question.options[random];
        }
        else if (question.type === QuestionTypes.Bool) {
          response = i % 3 === 0;
        }

        question.responses.push(response);
      }
    }

    let action = {
      type: GET_SURVEY_RESPONSES_SUCCESS,
      data: survey
    };

    dispatch(action);
  };
}
