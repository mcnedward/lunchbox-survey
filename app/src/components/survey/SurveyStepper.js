import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import { withSnackbar } from 'notistack';
import Question from "./Question";
import { respondToSurvey } from '../../actions/surveyResponseAction';

const styles = theme => ({
  surveyContents: {
    padding: theme.spacing.unit * 2
  },
  submit: {
    textAlign: 'center',
    margin: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  spinner: {
    marginTop: theme.spacing.unit
  }
});

class SurveyStepper extends React.Component {

  constructor(props) {
    super(props);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.submit = this.submit.bind(this);

    const { survey } = props;

    this.state = {
      answers: [],
      currentQuestion: survey.questions[0],
      currentStep: 0,
      numberOfQuestions: survey.questions.length
    }
  }

  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  previousQuestion() {
    const { survey } = this.props;
    let { answers, currentQuestion, currentStep } = this.state;

    answers.pop();
    currentQuestion = survey.questions[--currentStep];

    this.setState({ answers, currentQuestion, currentStep });
  }

  nextQuestion() {
    const { survey } = this.props;
    let { answers, currentQuestion, currentStep } = this.state;

    if (currentQuestion.answer == null || currentQuestion.answer === '') {
      this.props.enqueueSnackbar('Please answer the question before moving on.', { variant: 'error' });
      return;
    }

    let answer = {
      questionId: currentQuestion._id,
      answer: currentQuestion.answer
    }
    answers.push(answer);          // Add to answered list
    currentQuestion = survey.questions[++currentStep];
    currentQuestion.answer = '';

    this.setState({ answers, currentQuestion, currentStep });
  }

  submit() {
    const { dispatch, survey } = this.props;
    let { answers, currentQuestion } = this.state;

    if (currentQuestion.answer == null || currentQuestion.answer === '') {
      this.props.enqueueSnackbar('Please answer the question before submitting.', { variant: 'error' });
      return;
    }
    if (answers.length !== survey.questions.length) {
      // Validation to ensure question is only added once when hitting submit
      // In case error response on submit or something else like that
      let answer = {
        questionId: currentQuestion._id,
        answer: currentQuestion.answer
      }
      answers.push(answer);
    }

    // POST
    const surveyResponse = {
      surveyId: survey._id,
      name: survey.name,
      answers
    }
    dispatch(respondToSurvey(surveyResponse));
  }

  render() {
    const { classes, theme, survey, isLoading } = this.props;
    const { currentQuestion, currentStep, numberOfQuestions } = this.state;

    let submitButton = '';
    if (currentStep === numberOfQuestions - 1) {
      submitButton = (
        <div className={classes.submit}>
          <Button fullWidth variant="contained" color="primary" onClick={this.submit} disabled={isLoading}>
            Submit <Icon className={classes.rightIcon}>send</Icon>
          </Button>
          {isLoading ? <CircularProgress className={classes.spinner} /> : ''}
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

function mapStateToProps(state, ownProps) {
  const { surveyResponseState } = state;

  return {
    isLoading: surveyResponseState.isLoading,
    error: surveyResponseState.error
  };
}

const snackbarComp = withSnackbar(SurveyStepper);
const styledComp = withStyles(styles, { withTheme: true })(snackbarComp);
const connectedComp = connect(mapStateToProps)(styledComp);

export default connectedComp;