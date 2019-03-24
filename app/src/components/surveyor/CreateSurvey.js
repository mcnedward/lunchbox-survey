import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import CreateQuestion from './CreateQuestion'
import Survey from "../../models/survey";
import { Question } from "../../models/question";

const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  },
  bottomButtons: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateSurvey extends React.Component {

  constructor(props) {
    super(props);

    let question1 = new Question(1);
    this.state = {
      survey: new Survey(1, '', [question1])
    }

    this.addQuestion = this.addQuestion.bind(this);
    this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
    this.createSurvey = this.createSurvey.bind(this);
  }

  addQuestion() {
    const { survey } = this.state;
    survey.addQuestion();
    this.setState({ survey });
  }

  onDeleteQuestion(question) {
    const { survey } = this.state;

    if (survey.questions.length === 1) {
      this.props.enqueueSnackbar('You need at least one question.', { variant: 'warning' });
      return;
    }
    survey.removeQuestion(question);
    this.setState({ survey });
  }

  createSurvey() {

  }

  render() {
    const { classes } = this.props;
    const { survey } = this.state;

    return (
      <Grid container justify="center">
        <Grid item>
          <Typography color="primary" variant="h4">
            Create New Survey
                </Typography>

          <TextField
            id="surveyTitle"
            label="Survey Title"
            helperText="Enter a title for your survey"
            fullWidth
            margin="normal"
          />

          {survey.questions.map((question, index) => (
            <CreateQuestion question={question} key={index} number={index + 1} onDeleteQuestion={this.onDeleteQuestion} />
          ))}

          <Button size="small" onClick={this.addQuestion}>
            Add question
          </Button>
          <Grid container justify="space-between" spacing={24} className={classes.bottomButtons}>
            <Grid item>
              <Button component={Link} to="/surveyor" color="primary" size="small">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" variant="contained" color="primary" onClick={this.createSurvey}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
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


const snackbarSurvey = withSnackbar(CreateSurvey);
const styledSurvey = withStyles(styles, { withTheme: true })(snackbarSurvey);
const connectedSurvey = connect(mapStateToProps)(styledSurvey);

export default withRouter(connectedSurvey);
