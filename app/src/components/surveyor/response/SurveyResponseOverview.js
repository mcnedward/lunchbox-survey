import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextResponse from './TextResponse';
import ChoiceResponse from './ChoiceResponse';
import BoolResponse from './BoolResponse';
import { QuestionTypes } from '../../../models/question';

class SurveyResponseOverview extends React.Component {

  render() {
    let { survey, surveyResponses } = this.props;

    let questionMap = {};
    for (let i = 0; i < survey.questions.length; i++) {
      let question = survey.questions[i];
      questionMap[question._id] = {
        id: question._id,
        number: i + 1,
        type: question.type,
        question: question.question,
        options: question.options,
        answers: []
      };
    }

    for (let response of surveyResponses) {
      for (let answer of response.answers) {
        let questionId = answer.questionId;
        let question = questionMap[questionId];
        question.answers.push(answer.answer);
      }
    }

    let questions = Object.values(questionMap).sort((a, b) => a.number - b.number);

    return (
      <div>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Overview
        </Typography>
        {questions.map((question, index) => {
          if (question.type === QuestionTypes.Text) {
            return <TextResponse question={question} key={question.id} />
          } else if (question.type === QuestionTypes.Choice) {
            return <ChoiceResponse question={question} key={question.id} />
          } else if (question.type === QuestionTypes.Bool || question.type === QuestionTypes.YesNo) {
            return <BoolResponse question={question} key={question.id} />
          } else {
            return <div key={index}>Could not find the question...</div>
          }
        })}
      </div>
    )
  }
}

export default SurveyResponseOverview;
