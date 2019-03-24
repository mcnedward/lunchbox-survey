import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Icon from '@material-ui/core/Icon';
import { withSnackbar } from 'notistack';

import { getSurveyById } from "../../actions/surveyAction";
import Question from "./Question";

const styles = theme => ({
  surveyContents: {
    padding: theme.spacing.unit * 2
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class SurveyCard extends React.Component {

  constructor(props) {
    super(props);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.submit = this.submit.bind(this);

    const { survey } = props;

    this.state = {
      answeredQuestions: [],
      unansweredQuestions: [],
      currentQuestion: survey.questions[0],
      currentStep: 0,
      numberOfQuestions: survey.questions.length
    }
  }

  previousQuestion() {
    const { survey } = this.props;
    let { answeredQuestions, currentQuestion, currentStep } = this.state;

    answeredQuestions.pop();
    currentQuestion = survey.questions[--currentStep];

    this.setState({ answeredQuestions, currentQuestion, currentStep });
  }

  nextQuestion() {
    const { survey } = this.props;
    let { answeredQuestions, currentQuestion, currentStep } = this.state;

    if (currentQuestion.answer == null || currentQuestion.answer === '') {
      this.props.enqueueSnackbar('Please answer the question before moving on.', { variant: 'error' });
      return;
    }

    answeredQuestions.push(currentQuestion);          // Add to answered list
    currentQuestion = survey.questions[++currentStep];

    this.setState({ answeredQuestions, currentQuestion, currentStep });
  }

  submit() {
    const { survey } = this.props;
    let { answeredQuestions, currentQuestion } = this.state;

    if (currentQuestion.answer == null || currentQuestion.answer === '') {
      this.props.enqueueSnackbar('Please answer the question before submitting.', { variant: 'error' });
      return;
    }

    // POST

  }

  render() {
    const { classes, theme, survey } = this.props;
    const { currentQuestion, currentStep, numberOfQuestions } = this.state;

    let submitButton = '';
    if (currentStep === numberOfQuestions - 1) {
      submitButton = (
        <div className={classes.submit}>
          <Button fullWidth variant="contained" color="primary" onClick={this.submit}>
            Submit <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div className={classes.surveyContents}>
          <Typography color="primary" variant="h4" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Question #{currentStep + 1}
          </Typography>
          <Question question={currentQuestion} />

        </div>

        <MobileStepper
          variant="progress"
          steps={numberOfQuestions}
          position="static"
          activeStep={currentStep}
          nextButton={
            <Button size="small" onClick={this.nextQuestion} disabled={currentStep === numberOfQuestions - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.previousQuestion} disabled={currentStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
        {submitButton}
      </div>
    );
  }
}


const snackbarSurvey = withSnackbar(SurveyCard);
const styledSurvey = withStyles(styles, { withTheme: true })(snackbarSurvey);

export default styledSurvey;
