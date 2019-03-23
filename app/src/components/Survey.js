import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Icon from '@material-ui/core/Icon';
import { withSnackbar } from 'notistack';

import { getSurveyById } from "../actions/surveyAction";
import Question from "./Question";

const styles = theme => ({
  card: {
    minWidth: 350
  },
  emptyStyle: {
    padding: theme.spacing.unit * 2
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  },
  steps: {
    maxWidth: 400,
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
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
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number("16")}>
            <Grid item>
              <Paper className={classes.paperStyle}>{contents}</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            Question #{survey.getCurrentIndex() + 1}
          </Typography>
          <Question question={question} />
        </CardContent>

        <MobileStepper
          variant="progress"
          steps={numberOfQuestions}
          position="static"
          activeStep={currentStep}
          className={classes.steps}
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
      </Card>
    );
  }

  buildCompleteCard() {
    const { classes, theme, survey } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            Thank you for completing the survey!
          </Typography>
          <Button component={Link} to="/" color="primary" size="small">
            Return to home
          </Button>
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
