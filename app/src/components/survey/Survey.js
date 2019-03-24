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
  emptyStyle: {
    padding: theme.spacing.unit * 2
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  }
});

class Survey extends React.Component {

  constructor(props) {
    super(props);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSurveyById(+id));
  }

  previousQuestion() {
    const { survey } = this.props;
    survey.previousQuestion();

    this.setState({ survey });
  }

  nextQuestion() {
    const { survey } = this.props;
    const question = survey.getCurrentQuestion();
    if (!question.isAnswered()) {
      this.props.enqueueSnackbar('Please answer the question before moving on.', { variant: 'error' });
      return;
    }

    survey.nextQuestion();
    this.setState({ survey });
  }

  submit() {
    const { survey } = this.props;
    const question = survey.getCurrentQuestion();
    if (!question.isAnswered()) {
      this.props.enqueueSnackbar('Please answer the question before submitting.', { variant: 'error' });
      return;
    }

    survey.submit();
    this.setState({ survey });
  }

  render() {
    const { classes, survey } = this.props;

    let contents;
    if (survey == null) {
      contents = (
        <div className={classes.emptyStyle}>Could not find the survey</div>
      );
    } else if (survey.isComplete) {
      contents = this.buildCompleteCard();
    } else {
      contents = this.buildCard();
    }

    return (
      <div>
        {contents}
        <Button component={Link} to="/" color="primary" size="small" className={classes.btnReturn}>
          Return to home
        </Button>
      </div>
    );
  }

  buildCard() {
    const { classes, theme, survey } = this.props;

    const currentStep = survey.getCurrentIndex();
    const numberOfQuestions = survey.numberOfQuestions;
    const question = survey.getCurrentQuestion();

    let submitButton = '';
    if (survey.getCurrentIndex() === survey.questions.length - 1) {
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
            Question #{survey.getCurrentIndex() + 1}
          </Typography>
          <Question question={question} />

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

  buildCompleteCard() {
    const { classes, survey } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            Thank you for completing the survey!
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: surveyState.survey
  };
}


const snackbarSurvey = withSnackbar(Survey);
const styledSurvey = withStyles(styles, { withTheme: true })(snackbarSurvey);
const connectedSurvey = connect(mapStateToProps)(styledSurvey);

export default withRouter(connectedSurvey);
