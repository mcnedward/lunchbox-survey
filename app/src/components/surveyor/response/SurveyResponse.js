import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withSnackbar } from 'notistack';
import TextResponse from './TextResponse';
import ChoiceResponse from './ChoiceResponse';
import BoolResponse from './BoolResponse';
import { QuestionTypes } from '../../../models/question';
import getSurveyResponses from '../../../actions/surveyResponse/getSurveyResponsesAction';
import getSurvey from '../../../actions/survey/getSurveyAction';

const styles = theme => ({
  header: {
    marginBottom: theme.spacing.unit * 2
  },
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  }
})

class SurveyResponse extends React.Component {

  componentDidMount() {
    const { dispatch, id } = this.props;
    // Get the survey and all of the responses associated with it
    dispatch(getSurvey(id));
    dispatch(getSurveyResponses(id));
  }
  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    let { classes, isLoadingSurvey, isLoadingSurveyResponses, survey, surveyResponses } = this.props;

    let btnReturn = (
      <Button component={Link} to="/surveyor" color="primary" size="small" className={classes.btnReturn}>
        Back
      </Button>
    );

    if (isLoadingSurvey || isLoadingSurveyResponses) {
      return (
        <div>
          <Typography color="primary" variant="h4" gutterBottom>
            Loading survey responses
          </Typography>
          {btnReturn}
        </div>
      );
    }

    let name = (
      <Typography color="primary" variant="h4" gutterBottom>
        {survey.name}
      </Typography>
    )

    if (surveyResponses == null || surveyResponses.length === 0) {
      return (
        <div>
          {name}
          <Typography color="primary" variant="h4" className={classes.header}>
            Could not find any responses
          </Typography>
          {btnReturn}
        </div>
      );
    }

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
        {name}
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
        {btnReturn}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { getSurveyState, getSurveyResponsesState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: getSurveyState.survey,
    isLoadingSurvey: getSurveyState.isLoading == null ? true : getSurveyState.isLoading,
    surveyResponses: getSurveyResponsesState.surveyResponses,
    isLoadingSurveyResponses: getSurveyResponsesState.isLoading == null ? true : getSurveyResponsesState.isLoading,
    error: getSurveyResponsesState.error
  };
}

const snackbarComp = withSnackbar(SurveyResponse);
const styledComp = withStyles(styles, { withTheme: true })(snackbarComp);
const connectedComp = connect(mapStateToProps)(styledComp);

export default connectedComp;
